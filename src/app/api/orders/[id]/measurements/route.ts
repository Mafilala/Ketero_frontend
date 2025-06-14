import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
const BASE_URL = `https://ketero-db.onrender.com/order-measure`;


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse>{
  try {
   const { id } = await params; 
    const { data } = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(data);
  } catch  {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse>{
  try {
    const reqObj = await req.json();
    const {id: orderId} = await params;

    if (!orderId || !reqObj) {
      console.log("missing fields", orderId);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data } = await axios.put(
      `${BASE_URL}/${orderId}/`,
      reqObj,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(
      { message: "Measurements updated successfully", data },
      { status: 200 }
    );
  } catch {
      return NextResponse.json(
      {
        error:  "Internal server error",
      },
      { status:  500 }
    );
  }
}
