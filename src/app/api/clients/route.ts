import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = "https://ketero-db.onrender.com/client";

export async function POST(req: NextRequest) {
  try {
    const { full_name, phone_number } = await req.json();
    
    // Validate required fields
    if (!full_name || !phone_number) {
      return NextResponse.json(
        { error: "full_name and phone_number are required" },
        { status: 400 }
      );
    }

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, phone_number }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to create client" },
        { status: response.status }
      );
    }

    const newClient = await response.json();
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error("Client creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    
    if (id) {
      // Get a single client by ID
      const response = await fetch(`${BASE_URL}/${id}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Client not found" },
          { status: 404 }
        );
      }

      const client = await response.json();
      return NextResponse.json(client);
    } else {
      // Get all clients
      const response = await fetch(BASE_URL, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Failed to fetch clients" },
          { status: response.status }
        );
      }

      const clients = await response.json();
      return NextResponse.json(clients);
    }
  } catch (error) {
    console.error("Client fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to delete client" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Client deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
