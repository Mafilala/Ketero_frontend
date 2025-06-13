import { NextResponse, NextRequest } from 'next/server';

const BaseUrl = 'https://ketero-db.onrender.com'

export async function GET() {
  try {
    const res = await fetch(`${BaseUrl}/clothing`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch clients' }, { status: res.status });
    }

    const clothings = await res.json();
    return NextResponse.json(clothings);
  } catch (error) {
    return NextResponse.json({ error: 'Server error', detail: (error as Error).message }, { status: 500 });
  }

}

export async function DELETE(req: NextRequest) { 
    try { // Validate request body
    const { id } = await req.json();
        
    if ( !id ) {
      return NextResponse.json(
        { error: "id required" },
        { status: 400 }
      );
    }

    // Forward request to backend
    const response = await fetch(`${BaseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    // Handle backend errors
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Backend error" },
        { status: response.status }
      );
    }

    // Return successful response
    const newClothing = await response.json();
    return NextResponse.json(newClothing);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest) { try { 
    // Validate request body
    const { id, name } = await req.json();
        
    if (!name || !id ) {
      return NextResponse.json(
        { error: "Name and id required" },
        { status: 400 }
      );
    }

    // Forward request to backend
    const response = await fetch(`${BaseUrl}/clothing/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    // Handle backend errors
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Backend error" },
        { status: response.status }
      );
    }

    // Return successful response
    const newClothing = await response.json();
    return NextResponse.json(newClothing, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    // Validate request body
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Forward request to backend
    const response = await fetch(`${BaseUrl}/clothing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    // Handle backend errors
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Backend error" },
        { status: response.status }
      );
    }

    // Return successful response
    const newClothing = await response.json();
    return NextResponse.json(newClothing, { status: 201 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
