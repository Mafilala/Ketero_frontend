import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/clothing_measure`;

export async function GET(req: NextRequest) {
  try {
    const clothingId = req.nextUrl.searchParams.get('clothingId');

    if (!clothingId) {
      return NextResponse.json(
        { error: 'Missing clothingId parameter' },
        { status: 400 }
      );
    }

    const res = await axios.get(`${BASE_URL}/${clothingId}`);
    return NextResponse.json(res.data);
  } catch  {
    return NextResponse.json(
      { error:  'Failed to fetch clothing measures' },
      { status:  500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { clothingId, measureId } = await req.json();

    if (!clothingId || !measureId) {
      return NextResponse.json(
        { error: 'Both clothingId and measureId are required' },
        { status: 400 }
      );
    }

    const res = await axios.post(BASE_URL, {
      clothing_id: clothingId,
      measure_id: measureId,
    });

    return NextResponse.json(res.data, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error:  'Failed to create relation' },
      { status:  500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { clothingId, measureId } = await req.json();

    if (!clothingId || !measureId) {
      return NextResponse.json(
        { error: 'Both clothingId and measureId are required' },
        { status: 400 }
      );
    }

    await axios.delete(`${BASE_URL}/${clothingId}/${measureId}`);

    return NextResponse.json(
      { message: 'Measure removed successfully' },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      { error:  'Failed to delete relation' },
      { status:  500 }
    );
  }
}

