import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/order-detail`;

export async function POST(req: NextRequest) {
  try {
    const { order_id, style, fabric, color } = await req.json();

    if (!order_id || style === undefined || fabric === undefined || color === undefined) {
      return NextResponse.json(
        { error: "order_id, style, fabric, and color are required" },
        { status: 400 }
      );
    }

    const { data } = await axios.post(BASE_URL, {
      order_id: parseInt(order_id),
      style: parseInt(style),
      fabric: parseInt(fabric),
      color: parseInt(color),
    });

    return NextResponse.json(data, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error:  "Failed to create order detail" },
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

    const { data } = await axios.get(`${BASE_URL}/${order_id}`);
    return NextResponse.json(data);
  } catch  {
    return NextResponse.json(
      { error:  "Order detail not found" },
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

    const { data } = await axios.put(`${BASE_URL}/${order_id}`, {
      style: parseInt(style),
      fabric: parseInt(fabric),
      color: parseInt(color),
    });

    return NextResponse.json(data);
  } catch  {
    return NextResponse.json(
      { error:  "Failed to update order detail" },
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

    const { data } = await axios.delete(`${BASE_URL}/${order_id}`);
    return NextResponse.json(data);
  } catch  {
    return NextResponse.json(
      { error:  "Failed to delete order detail" },
      { status:  500 }
    );
  }
}

