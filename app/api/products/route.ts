import { NextResponse } from "next/server";

const API_URL = "http://185.255.93.161:3000/api/products";

export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const response = await fetch(API_URL, {
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
