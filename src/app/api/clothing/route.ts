import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;
const BaseUrl = `${backendUrl}/clothing`;


export async function GET() {
  try {
    const res = await axios.get(BaseUrl);
    return NextResponse.json(res.data);
  } catch  {
    return NextResponse.json(
      { error:  'Failed to fetch clothings' },
      { status:  500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const res = await axios.delete(`https://ketero-db.onrender.com/${id}`);
    return NextResponse.json(res.data);
  } catch  {
    return NextResponse.json(
      { error:  "Backend error" },
      { status:  500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name } = await req.json();

    if (!id || !name) {
      return NextResponse.json({ error: "Name and id required" }, { status: 400 });
    }

    const res = await axios.put(`${BaseUrl}/${id}`, { name });
    return NextResponse.json(res.data, { status: 200 });
  } catch  {
    return NextResponse.json(
      { error:  "Backend error" },
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

    const res = await axios.post(BaseUrl, { name });
    return NextResponse.json(res.data, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error:  "Backend error" },
      { status:  500 }
    );
  }
}

