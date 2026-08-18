import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  productsPerPage: number;
  pageNumbers: (number | "...")[];
  onGoToPage: (page: number) => void;
};

export default function ProductGrid({
  products,
  currentPage,
  totalPages,
  productsPerPage,
  pageNumbers,
  onGoToPage,
}: ProductGridProps) {
  const start = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(start, start + productsPerPage);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-500">
            Showing{" "}
            <span className="font-bold text-neutral-800">{start + 1}</span>
            {"–"}
            <span className="font-bold text-neutral-800">
              {Math.min(currentPage * productsPerPage, products.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-neutral-800">
              {products.length}
            </span>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onGoToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center border border-neutral-200 text-neutral-600 transition hover:border-[#d99f00] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-neutral-200"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center text-xs text-neutral-400"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onGoToPage(page)}
                  className={`flex h-9 w-9 items-center justify-center border text-xs font-bold transition ${
                    page === currentPage
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-[#d99f00]"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => onGoToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center border border-neutral-200 text-neutral-600 transition hover:border-[#d99f00] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-neutral-200"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}