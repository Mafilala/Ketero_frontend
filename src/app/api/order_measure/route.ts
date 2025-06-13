import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = `https://ketero-db.onrender.com/order-measure`;

export async function POST(req: NextRequest) {
  try {
    const measures = await req.json();
    if (!Array.isArray(measures) || measures.length === 0) {
      return NextResponse.json(
        { error: "Measures array is required" },
        { status: 400 }
      );
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(measures),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      return NextResponse.json(
        { error: errorData.message || "Failed to create order measures" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Measures created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order measure creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
