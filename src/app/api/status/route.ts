import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const url =process.env.BACKEND_URL || "";

export async function GET() {
  try {
    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch  {
    return NextResponse.json(
      { error:  'Failed to fetch statuses' },
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

    const res = await axios.delete(`${url}/${id}`);
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

    if (!name || !id) {
      return NextResponse.json({ error: "Name and id required" }, { status: 400 });
    }

    const res = await axios.put(`${url}/${id}`, { name });
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

    const res = await axios.post(url, { name });
    return NextResponse.json(res.data, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error:  "Backend error" },
      { status:  500 }
    );
  }
}

