import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/auth_tg_user`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const initData = body.initData;
    const res = await axios.post(BASE_URL, initData)
    const {data} = res;
        return NextResponse.json(data, { status: res.status })
  } catch  {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


