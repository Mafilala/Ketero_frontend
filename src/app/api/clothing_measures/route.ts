import { NextResponse, NextRequest } from 'next/server';

const BASE_URL = `https://ketero-db.onrender.com/clothing_measure`;

export async function GET(req: NextRequest) {
  try {
    const clothingId = req.nextUrl.searchParams.get('clothingId');
        
    if (!clothingId) {
      return NextResponse.json(
        { error: 'Missing clothingId parameter' },
        { status: 400 }
      );
    }

    const url = `${BASE_URL}/${clothingId}`; 
        
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    
    
    if (!res.ok) {
      console.log(res);
      return NextResponse.json(
        { error: 'Failed to fetch clothing measures' },
        { status: res.status }
      );
    }

    const measures = await res.json();
    console.log(measures);
    return NextResponse.json(measures);
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', detail: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { clothingId, measureId } = await req.json();
    
    if (!clothingId || !measureId) {
      return NextResponse.json(
        { error: "Both clothingId and measureId are required" },
        { status: 400 }
      );
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clothing_id: clothingId, measure_id: measureId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Backend error" },
        { status: response.status }
      );
    }

    const newMeasure = await response.json();
    return NextResponse.json(newMeasure, { status: 201 });
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
    const { clothingId, measureId } = await req.json();
    
    if (!clothingId || !measureId) {
      return NextResponse.json(
        { error: "Both clothingId and measureId are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${BASE_URL}/${clothingId}/${measureId}`, {
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
      { message: "Measure removed successfully" },
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
