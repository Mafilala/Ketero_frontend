import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/clothingType`;

export async function GET() {
  try {
    const { data } = await axios.get(BASE_URL);
    return NextResponse.json(data);
  } catch  {
    return NextResponse.json(
      { error:  'Server error' },
      { status:  500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const { data } = await axios.post(BASE_URL, { name });
    return NextResponse.json(data, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error:  'Server error' },
      { status:  500 }
    );
  }
}

