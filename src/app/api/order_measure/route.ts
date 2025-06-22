import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;

const BASE_URL = `${backendUrl}/order-measure`;

export async function POST(req: NextRequest) {
  try {
    const measures = await req.json();

    if (!Array.isArray(measures) || measures.length === 0) {
      return NextResponse.json(
        { error: "Measures array is required" },
        { status: 400 }
      );
    }

    await axios.post(BASE_URL, measures, {
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json(
      { message: "Measures created successfully" },
      { status: 201 }
    );
  } catch  {
    return NextResponse.json(
      {
        error:  "Failed to create order measures",
      },
      {
        status:  500,
      }
    );
  }
}

