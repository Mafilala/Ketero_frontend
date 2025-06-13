import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = `https://ketero-db.onrender.com/price-detail`;

export async function POST(req: NextRequest) {
  try {
    const { order_id, price, paid } = await req.json();
    
    // Validate required fields
    if (!order_id || price === undefined || paid === undefined) {
      return NextResponse.json(
        { error: "order_id, price, and paid are required" },
        { status: 400 }
      );
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: parseInt(order_id),
        price: parseFloat(price),
        paid: parseFloat(paid)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to create price detail" },
        { status: response.status }
      );
    }

    const newPriceDetail = await response.json();
    return NextResponse.json(newPriceDetail, { status: 201 });
  } catch (error) {
    console.error("Price detail creation error:", error);
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
        { error: "Price detail not found" },
        { status: 404 }
      );
    }

    const priceDetail = await response.json();
    return NextResponse.json(priceDetail);
  } catch (error) {
    console.error("Price detail fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const order_id = req.nextUrl.searchParams.get('order_id');
    const { price, paid } = await req.json();
    
    if (!order_id) {
      return NextResponse.json(
        { error: "order_id parameter is required" },
        { status: 400 }
      );
    }
    
    if (price === undefined || paid === undefined) {
      return NextResponse.json(
        { error: "price and paid are required for update" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/${order_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: parseFloat(price),
        paid: parseFloat(paid)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to update price detail" },
        { status: response.status }
      );
    }

    const updatedPriceDetail = await response.json();
    return NextResponse.json(updatedPriceDetail);
  } catch (error) {
    console.error("Price detail update error:", error);
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
        { error: errorData.message || "Failed to delete price detail" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Price detail deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Price detail deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
