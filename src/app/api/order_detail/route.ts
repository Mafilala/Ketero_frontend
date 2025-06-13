import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = `https://ketero-db.onrender.com/order-detail`;

export async function POST(req: NextRequest) {
  try {
    const { order_id, style, fabric, color } = await req.json();
    
    // Validate required fields
    if (!order_id || style === undefined || fabric === undefined || color === undefined) {
      return NextResponse.json(
        { error: "order_id, style, fabric, and color are required" },
        { status: 400 }
      );
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: parseInt(order_id),
        style: parseInt(style),
        fabric: parseInt(fabric),
        color: parseInt(color)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to create order detail" },
        { status: response.status }
      );
    }

    const newOrderDetail = await response.json();
    return NextResponse.json(newOrderDetail, { status: 201 });
  } catch (error) {
    console.error("Order detail creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const order_id = req.nextUrl.searchParams.get('order_id');
    
    if (!order_id) {
      return NextResponse.json(
        { error: "order_id parameter is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/${order_id}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Order detail not found" },
        { status: 404 }
      );
    }

    const orderDetail = await response.json();
    return NextResponse.json(orderDetail);
  } catch (error) {
    console.error("Order detail fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const order_id = req.nextUrl.searchParams.get('order_id');
    const { style, fabric, color } = await req.json();
    
    if (!order_id) {
      return NextResponse.json(
        { error: "order_id parameter is required" },
        { status: 400 }
      );
    }
    
    if (style === undefined || fabric === undefined || color === undefined) {
      return NextResponse.json(
        { error: "style, fabric, and color are required for update" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/${order_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        style: parseInt(style),
        fabric: parseInt(fabric),
        color: parseInt(color)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to update order detail" },
        { status: response.status }
      );
    }

    const updatedOrderDetail = await response.json();
    return NextResponse.json(updatedOrderDetail);
  } catch (error) {
    console.error("Order detail update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const order_id = req.nextUrl.searchParams.get('order_id');
    
    if (!order_id) {
      return NextResponse.json(
        { error: "order_id parameter is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/${order_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to delete order detail" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Order detail deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order detail deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
