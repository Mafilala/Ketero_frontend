import { NextRequest, NextResponse } from 'next/server';
const BaseUrl = "https://ketero-db.onrender.com"
import axios from "axios";


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse>{
  try {
    const {id: orderId} = await params;
    const { status_id } = await req.json();

    if (!orderId || !status_id) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const { data } = await axios.patch(
      `${BaseUrl}/order/${orderId}`,
      { status_id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      { message: "Status updated successfully", data },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      {
        error:  "Internal server error",
      },
      { status:  500 }
    );
  }
}
