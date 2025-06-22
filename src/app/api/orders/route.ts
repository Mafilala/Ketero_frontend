// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/order`;

export async function POST(req: NextRequest) {
  try {
    const { client_id, clothing_type_id, order_note, due_date } = await req.json();
    console.log(client_id, clothing_type_id, due_date) 
    // Validate required fields
    if (!client_id || !clothing_type_id || !due_date) {
      return NextResponse.json(
        { error: "client_id, clothing_type_id, and due_date are required" },
        { status: 400 }
      );
    }

    // Prepare the request body for the Go backend
    const requestBody = {
      client_id: parseInt(client_id),
      clothing_type_id: parseInt(clothing_type_id),
      order_note: order_note || null, // Optional field
      due_date: new Date(due_date).toISOString(),
      status_id: 1,
    };

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      return NextResponse.json(
        { error: errorData.message || "Failed to create order" },
        { status: response.status }
      );
    }

    const newOrder = await response.json();
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    const limit = req.nextUrl.searchParams.get('limit');
    const offset = req.nextUrl.searchParams.get('offset');
    const status = req.nextUrl.searchParams.get('status');

    if (id) {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return NextResponse.json(data);
    }

    const params: Record<string, string> = {};
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    if (status) params.status = status;

    const { data } = await axios.get(BASE_URL, { params });
    return NextResponse.json(data);
  } catch  {
       return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to delete order" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
