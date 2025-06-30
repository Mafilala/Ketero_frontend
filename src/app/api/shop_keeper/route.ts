import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/user`;

export async function POST(req: NextRequest) {
  try {
    const { name, telegram_id} = await req.json();

    if (!name || !telegram_id) {
      return NextResponse.json(
        { error: "name and telegram_id are required" },
        { status: 400 }
      );
    }

    const res = await axios.post(BASE_URL, {
      name,
      telegram_id,
      role:"shopkeeper"
    },

    {
      validateStatus: () => true
  });

    return NextResponse.json(res.data, { status: 201 });
  } catch(error)  {
    console.log(error)
    const message =  "Internal server error";
    const status =  500;
    return NextResponse.json({ error: message }, { status });
  }
}


export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      const { data: user } = await axios.get(`${BASE_URL}/${id}`);
      return NextResponse.json(user);
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
        { error: "user id is required" },
        { status: 400 }
      );
    }
    console.log("id", id)
    await axios.delete(`${BASE_URL}/${id}`);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch  {
    const message =  "Internal server error";
    const status =  500;
    return NextResponse.json({ error: message }, { status });
  }
}

