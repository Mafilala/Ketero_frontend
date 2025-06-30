import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/auth_tg_user`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log(body)
    const res = await axios.post(BASE_URL, body)
    const {data} = res;
    console.log(data)
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


