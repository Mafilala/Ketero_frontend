import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;

const url = `${backendUrl}/measure`;

export async function GET() {
  try {
    const { data } = await axios.get(url);
    return NextResponse.json(data);
  } catch  {
    return NextResponse.json(
      { error:  'Server error' },
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

    const { data } = await axios.delete(`${url}/${id}`);
    return NextResponse.json(data);
  } catch  {
    return NextResponse.json(
      { error:  'Internal server error' },
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

    const { data } = await axios.put(`${url}/${id}`, { name });
    return NextResponse.json(data, { status: 200 });
  } catch  {
    return NextResponse.json(
      { error:  'Internal server error' },
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

    const { data } = await axios.post(url, { name });
    return NextResponse.json(data, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error:  'Internal server error' },
      { status:  500 }
    );
  }
}

