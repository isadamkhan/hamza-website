import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;
const PRODUCTS_PER_PAGE = 12;

export const revalidate = 86400; // 1 day

type ApiProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export async function GET(request: NextRequest) {
  if (!BACKEND_API_URL) {
    console.error("Missing BACKEND_API_URL environment variable");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  try {
    // This fetch is cached by Next.js for 24h (revalidate: 86400) —
    // it runs against the VPS at most once/day regardless of how many
    // different ?page=/?search= combinations visitors request.
    const response = await fetch(`${BACKEND_API_URL}/api/products`, {
      next: {
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const data = await response.json();

    const allProducts: ApiProduct[] = Array.isArray(data)
      ? data
      : Array.isArray(data.products)
        ? data.products
        : [];

    const { searchParams } = new URL(request.url);
    const requestedPage = Math.max(1, Number(searchParams.get("page")) || 1);
    const search = (searchParams.get("search") || "").trim().toLowerCase();

    const filtered = search
      ? allProducts.filter((product) => {
          const name = (product.title || "").toLowerCase();
          const description = (product.description || "").toLowerCase();
          return name.includes(search) || description.includes(search);
        })
      : allProducts;

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE));
    const page = Math.min(requestedPage, totalPages);
    const start = (page - 1) * PRODUCTS_PER_PAGE;

    const pageProducts = filtered.slice(start, start + PRODUCTS_PER_PAGE);

    return NextResponse.json({
      products: pageProducts,
      page,
      totalPages,
      total, // count matching current search
      totalInventory: allProducts.length, // count regardless of search, for hero stat
    });
  } catch (error) {
    console.error("Products API error:", error);

    return NextResponse.json(
      { error: "Unable to fetch products" },
      { status: 500 },
    );
  }
}
