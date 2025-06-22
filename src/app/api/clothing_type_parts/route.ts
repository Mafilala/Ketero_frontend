import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
const backendUrl = process.env.BACKEND_URL;
const BASE_URL = `${backendUrl}/clothing_part`;

export async function GET(req: NextRequest) {
  try {
    const clothingTypeId = req.nextUrl.searchParams.get('clothingTypeId');

    if (!clothingTypeId) {
      return NextResponse.json(
        { error: 'Missing clothingTypeId parameter' },
        { status: 400 }
      );
    }

    const res = await axios.get(`${BASE_URL}/${clothingTypeId}`);
    return NextResponse.json(res.data);
  } catch  {
    return NextResponse.json(
      { error:  'Failed to fetch clothing type parts' },
      { status:  500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { clothingTypeId, clothingId } = await req.json();

    if (!clothingTypeId || !clothingId) {
      return NextResponse.json(
        { error: 'Both clothingTypeId and clothingId are required' },
        { status: 400 }
      );
    }

    const res = await axios.post(BASE_URL, {
      clothing_type_id: clothingTypeId,
      clothing_id: clothingId
    });

    return NextResponse.json(res.data, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error:  'Failed to create part' },
      { status:  500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { clothingTypeId, clothingId } = await req.json();

    if (!clothingTypeId || !clothingId) {
      return NextResponse.json(
        { error: 'Both clothingTypeId and clothingId are required' },
        { status: 400 }
      );
    }

    await axios.delete(`${BASE_URL}/${clothingTypeId}/${clothingId}`);

    return NextResponse.json(
      { message: 'Part removed successfully' },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      { error:  'Failed to delete part' },
      { status:  500 }
    );
  }
}

