import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export const revalidate = 86400; // 1 day

export async function GET() {
  if (!BACKEND_API_URL) {
    console.error("Missing BACKEND_API_URL environment variable");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${BACKEND_API_URL}/api/products`, {
      next: {
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Products API error:", error);

    return NextResponse.json(
      { error: "Unable to fetch products" },
      { status: 500 },
    );
  }
}
