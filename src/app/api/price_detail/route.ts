import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/price-detail`;

export async function POST(req: NextRequest) {
  try {
    const { order_id, price, paid } = await req.json();

    if (!order_id || price === undefined || paid === undefined) {
      return NextResponse.json(
        { error: "order_id, price, and paid are required" },
        { status: 400 }
      );
    }

    const response = await axios.post(BASE_URL, {
      order_id: parseInt(order_id),
      price: parseFloat(price),
      paid: parseFloat(paid)
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error:  "Failed to create price detail" },
      { status:  500 }
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

    const response = await axios.get(`${BASE_URL}/${order_id}`);

    return NextResponse.json(response.data);
  } catch  {
    return NextResponse.json(
      { error:  "Price detail not found" },
      { status:  500 }
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

    const response = await axios.put(`${BASE_URL}/${order_id}`, {
      price: parseFloat(price),
      paid: parseFloat(paid)
    });

    return NextResponse.json(response.data);
  } catch  {
    return NextResponse.json(
      { error:  "Failed to update price detail" },
      { status:  500 }
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

    await axios.delete(`${BASE_URL}/${order_id}`);

    return NextResponse.json(
      { message: "Price detail deleted successfully" },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      { error:  "Failed to delete price detail" },
      { status:  500 }
    );
  }
}

