import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/client`;

export async function POST(req: NextRequest) {
  try {
    const { full_name, phone_number } = await req.json();

    if (!full_name || !phone_number) {
      return NextResponse.json(
        { error: "full_name and phone_number are required" },
        { status: 400 }
      );
    }

    const { data: newClient } = await axios.post(BASE_URL, {
      full_name,
      phone_number,
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch  {
    const message =  "Internal server error";
    const status =  500;
    return NextResponse.json({ error: message }, { status });
  }
}


export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      const { data: client } = await axios.get(`${BASE_URL}/${id}`);
      return NextResponse.json(client);
    } else {
      const { data: clients } = await axios.get(BASE_URL);
      return NextResponse.json(clients);
    }
  } catch  {
    const message =  "Internal server error";
    const status =  500;
    return NextResponse.json({ error: message }, { status });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    await axios.delete(`${BASE_URL}/${id}`);

    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch  {
    const message =  "Internal server error";
    const status =  500;
    return NextResponse.json({ error: message }, { status });
  }
}

