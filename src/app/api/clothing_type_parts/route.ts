import { NextResponse, NextRequest } from 'next/server';

const BASE_URL = `https://ketero-db.onrender.com/clothing_part`;

export async function GET(req: NextRequest) {
  try {
    const clothingTypeId = req.nextUrl.searchParams.get('clothingTypeId');
    
    if (!clothingTypeId) {
      return NextResponse.json(
        { error: 'Missing clothingTypeId parameter' },
        { status: 400 }
      );
    }


    const url = `${BASE_URL}/${clothingTypeId}`; 

    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch clothing type parts' },
        { status: res.status }
      );
    }

    const parts = await res.json();
    return NextResponse.json(parts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', detail: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { clothingTypeId, clothingId } = await req.json();
    
    if (!clothingTypeId || !clothingId) {
      return NextResponse.json(
        { error: "Both clothingTypeId and clothingId are required" },
        { status: 400 }
      );
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({clothing_type_id: clothingTypeId, clothing_id: clothingId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Backend error" },
        { status: response.status }
      );
    }

    const newPart = await response.json();
    return NextResponse.json(newPart, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { clothingTypeId, clothingId } = await req.json();
    
    if (!clothingTypeId || !clothingId) {
      return NextResponse.json(
        { error: "Both clothingTypeId and clothingId are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/${clothingTypeId}/${clothingId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Backend error" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Part removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
