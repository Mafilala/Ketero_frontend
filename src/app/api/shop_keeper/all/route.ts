import { NextResponse } from "next/server";
import axios from "axios";
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/user`;

export async function GET() {
  try {
    const { data } = await axios.get(BASE_URL);
    return NextResponse.json(data);
  } catch  {

  // You can access error.response if available
     return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
