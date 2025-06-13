import { NextRequest, NextResponse } from 'next/server';
const BaseUrl = "https://ketero-db.onrender.com"
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    const orderId = context.params.id;
    const { status_id } = await req.json();
    
    if (!orderId || !status_id) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    // Send request to backend
    const response = await fetch(`${BaseUrl}/order/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status_id })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to update order status" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
