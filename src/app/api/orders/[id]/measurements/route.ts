import { NextRequest, NextResponse } from 'next/server';
const BASE_URL = `https://ketero-db.onrender.com/order-measure`;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
       const orderId =  params.id;
       const res = await fetch(`${BASE_URL}/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          return NextResponse.json({ error: 'Failed to fetch measures' }, { status: res.status });
        }

        const measures = await res.json();
        return NextResponse.json(measures);
  } catch (error) {
        return NextResponse.json({ error: 'Server error', detail: (error as Error).message }, { status: 500 });
      }
  }


export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
    try {
    const reqObj = await req.json();
    const orderId = params.id;

    // Validation
    console.log(reqObj, orderId)
    if (!orderId || !reqObj) {
      console.log("missing fields", orderId)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Forward to backend service
    const backendResponse = await fetch(
      `${BASE_URL}/${orderId}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqObj),
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.log(errorData)
      return NextResponse.json(
        { error: errorData.message || "Backend update failed" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(
      { message: "Measurements updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Measurement update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
