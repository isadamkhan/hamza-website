"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  ArrowUpRight,
  X,
  CircleCheck,
  Loader2,
  AlertCircle,
  Search,
  Menu,
} from "lucide-react";
import type { ApiProduct, Product } from "./types";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import { TrustSection } from "./components/TrustSection";

const PRODUCTS_PER_PAGE = 12;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 0C7.166 0 0 7.163 0 16c0 2.822.738 5.58 2.14 8.007L0 32l8.2-2.11A15.93 15.93 0 0 0 16.004 32C24.84 32 32 24.837 32 16S24.84 0 16.004 0Zm0 29.27c-2.53 0-5.007-.68-7.166-1.965l-.514-.304-4.868 1.253 1.3-4.744-.335-.487A13.24 13.24 0 0 1 2.73 16c0-7.34 5.97-13.31 13.274-13.31 3.545 0 6.877 1.382 9.383 3.89a13.19 13.19 0 0 1 3.887 9.39c0 7.34-5.97 13.3-13.27 13.3Zm7.29-9.955c-.399-.2-2.36-1.164-2.726-1.296-.365-.133-.63-.2-.897.2-.266.398-1.03 1.296-1.263 1.562-.232.266-.464.3-.863.1-.399-.199-1.684-.62-3.208-1.98-1.186-1.058-1.987-2.364-2.219-2.763-.232-.398-.025-.613.175-.812.18-.18.399-.464.598-.697.2-.232.266-.398.399-.664.133-.266.066-.498-.033-.697-.1-.2-.897-2.163-1.229-2.963-.324-.78-.653-.674-.897-.686l-.764-.014c-.266 0-.697.1-1.063.498-.365.398-1.395 1.363-1.395 3.326s1.428 3.856 1.627 4.122c.2.266 2.809 4.288 6.804 6.013.951.41 1.693.655 2.272.838.955.303 1.824.26 2.51.158.766-.115 2.36-.965 2.693-1.897.332-.93.332-1.729.232-1.897-.1-.166-.365-.266-.764-.464Z" />
    </svg>
  );
}

export default function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /*
   * ============================
   * FETCH PRODUCTS
   * ============================
   */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(
            errorData?.error ||
              `Server returned ${response.status} ${response.statusText}`,
          );
        }

        const data = await response.json();

        const apiProducts: ApiProduct[] = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : [];

        const formattedProducts: Product[] = apiProducts.map((product) => ({
          id: product._id,
          name: product.title || "Unnamed Part",
          description: product.description || "",
          price: product.price,
          image: product.imageUrl,
          createdAt: product.createdAt,
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);

        setError(
          err instanceof Error ? err.message : "Unable to load products.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /*
   * ============================
   * SEARCH — debounce input so filtering a 1,000+ item
   * list doesn't run on every single keystroke
   * ============================
   */

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => clearTimeout(timeout);
  }, [search]);

  const scrollToProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /*
   * ============================
   * SEARCH — filtering
   * ============================
   */

  const searchIndex = useMemo(
    () =>
      products.map((product) => ({
        product,
        nameLower: (product.name || "").toLowerCase(),
        descLower: (product.description || "").toLowerCase(),
      })),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) return products;

    return searchIndex
      .filter(
        ({ nameLower, descLower }) =>
          nameLower.includes(query) || descLower.includes(query),
      )
      .map(({ product }) => product);
  }, [searchIndex, products, debouncedSearch]);

  useEffect(() => {
    setCurrentPage(1);

    if (debouncedSearch.trim()) {
      scrollToProducts();
    }
  }, [debouncedSearch, products.length]);

  /*
   * ============================
   * PAGINATION
   * ============================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);

    scrollToProducts();
  };

  const pageNumbers = useMemo(() => {
    const delta = 1;
    const range: (number | "...")[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("...");

    if (totalPages > 1) range.push(totalPages);

    return range;
  }, [currentPage, totalPages]);

  /*
   * ============================
   * HELPERS
   * ============================
   */

  const formatPKR = (price: number) => {
    if (!price || price <= 0) {
      return "Price on request";
    }

    return `PKR ${price.toLocaleString("en-PK")}`;
  };

  /*
   * ============================
   * RENDER
   * ============================
   */

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-[#171717] antialiased">
      {/* ================= TOP BAR ================= */}

      <div className="hidden bg-[#171717] text-white lg:block">
        <div className="mx-auto flex h-10 max-w-[1400px] items-center justify-between px-6 text-[11px]">
          <div className="flex items-center gap-6 text-neutral-400">
            <span className="font-medium text-white">HAMZA ENTERPRISES</span>

            <span>Heavy Equipment Parts & Components</span>

            <span className="h-3 w-px bg-neutral-700" />

            <span>Khadda Market, Tarnol, Islamabad</span>
          </div>

          <div className="flex items-center gap-5 text-neutral-400">
            <span className="cursor-pointer hover:text-white">Track Order</span>

            <span className="cursor-pointer hover:text-white">
              Bulk Enquiry
            </span>

            <span className="cursor-pointer hover:text-white">
              Import & LC Process
            </span>
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-6">
          <div className="flex h-[78px] items-center gap-5">
            {/* Logo */}

            <Link
              href="/"
              onClick={() => {
                setSearch("");
                setDebouncedSearch("");
                setCurrentPage(1);
                setMobileMenu(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex shrink-0 items-center gap-3"
            >
              <div className="min-w-0">
                <div className="truncate text-[15px] font-black uppercase leading-tight tracking-tight sm:text-[18px]">
                  Hamza
                  <span className="text-[#d99f00]"> Enterprises</span>
                </div>

                <div className="hidden text-[9px] font-bold tracking-[0.2em] text-neutral-500 sm:block">
                  HEAVY EQUIPMENT PARTS
                </div>
              </div>
            </Link>

            {/* Search */}

            <div className="mx-auto hidden max-w-2xl flex-1 md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setDebouncedSearch(search);
                      scrollToProducts();
                    }
                  }}
                  placeholder="Search by part name or description..."
                  className="h-11 w-full border border-neutral-300 bg-neutral-50 pl-11 pr-28 text-sm outline-none transition focus:border-[#d99f00] focus:bg-white"
                />

                <button
                  type="button"
                  onClick={() => {
                    setDebouncedSearch(search);
                    scrollToProducts();
                  }}
                  className="absolute right-0 top-0 flex h-11 items-center gap-2 bg-[#171717] px-5 text-xs font-bold text-white transition hover:bg-[#d99f00] hover:text-black"
                >
                  SEARCH
                </button>
              </div>
            </div>

            {/* Actions */}

            <div className="ml-auto flex items-center gap-2">
              <a
                href="https://wa.me/923359068724"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-2 border border-neutral-200 px-3 text-xs font-bold text-[#25D366] transition hover:border-[#25D366] hover:bg-[#25D366]/5 sm:px-4"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                <span className="hidden text-[#171717] sm:inline">
                  WhatsApp
                </span>
              </a>

              {/* Mobile: tap search icon to reveal input + jump to inventory */}
              <button
                onClick={() => {
                  setMobileSearch((v) => {
                    const next = !v;
                    if (next) scrollToProducts();
                    return next;
                  });
                  setMobileMenu(false);
                }}
                className="flex h-11 w-11 items-center justify-center border border-neutral-200 md:hidden"
                aria-label="Search parts"
              >
                {mobileSearch ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>

              {/* Mobile: hamburger opens nav links (Repair Service / Undercarriage / About) */}
              <button
                onClick={() => {
                  setMobileMenu(!mobileMenu);
                  setMobileSearch(false);
                }}
                className="flex h-11 w-11 items-center justify-center border border-neutral-200 md:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          {mobileSearch && (
            <div className="border-t border-neutral-200 py-3 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setDebouncedSearch(search);
                      scrollToProducts();
                      setMobileSearch(false);
                    }
                  }}
                  placeholder="Search parts..."
                  className="h-11 w-full border border-neutral-300 bg-neutral-50 pl-10 pr-4 text-sm outline-none focus:border-[#d99f00] focus:bg-white"
                />
              </div>
            </div>
          )}

          {/* Desktop navigation */}

          <div className="hidden h-12 items-center border-t border-neutral-100 md:flex">
            <div className="flex h-full items-center gap-8 text-[12px] font-bold uppercase tracking-wide">
              <button className="relative flex h-full items-center text-[#d99f00]">
                All Products
                <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#f2b705]" />
              </button>

              <Link
                href="/repair-service"
                className="text-neutral-500 transition hover:text-[#d99f00]"
              >
                Repair Service
              </Link>

              <Link
                href="/undercarriage"
                className="text-neutral-500 transition hover:text-[#d99f00]"
              >
                Undercarriage
              </Link>

              <span className="ml-auto h-5 w-px bg-neutral-200" />
              <Link
                href="/contact"
                className="text-neutral-500 transition hover:text-[#d99f00]"
              >
                Contact
              </Link>

              <Link
                href="/about"
                className="text-neutral-500 transition hover:text-[#d99f00]"
              >
                About
              </Link>

              <a
                href="#"
                className="flex items-center gap-2 hover:text-[#d99f00]"
              >
                Request a Quote
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile menu — nav links only (search moved to its own icon) */}

        {mobileMenu && (
          <div className="border-t border-neutral-200 bg-white p-5 md:hidden">
            <Link
              href="/repair-service"
              onClick={() => setMobileMenu(false)}
              className="flex items-center justify-between border border-neutral-200 px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-700 hover:border-[#d99f00] hover:text-[#d99f00]"
            >
              Repair Service
              <ChevronRight className="h-4 w-4" />
            </Link>

            <Link
              href="/undercarriage"
              onClick={() => setMobileMenu(false)}
              className="mt-2 flex items-center justify-between border border-neutral-200 px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-700 hover:border-[#d99f00] hover:text-[#d99f00]"
            >
              Undercarriage
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="mt-2 flex items-center justify-between border border-neutral-200 px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-700 hover:border-[#d99f00] hover:text-[#d99f00]"
            >
              Contact
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenu(false)}
              className="mt-2 flex items-center justify-between border border-neutral-200 px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-700 hover:border-[#d99f00] hover:text-[#d99f00]"
            >
              About
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}

      <main>
        <section className="bg-[#171717]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-6">
            <div className="relative min-h-[510px] overflow-hidden">
              <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border-[70px] border-neutral-800/50" />

              <div className="absolute bottom-[-200px] right-[15%] h-[450px] w-[450px] rounded-full border-[50px] border-neutral-800/40" />

              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />

              <div className="relative z-10 flex min-h-[510px] items-center">
                <div className="max-w-3xl py-16">
                  <div className="mb-5 inline-flex items-center gap-2 border border-[#f2b705]/30 bg-[#f2b705]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#f2b705]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f2b705]" />
                    Heavy Equipment Parts Supplier
                  </div>

                  <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                    The right part.
                    <br />
                    <span className="text-[#f2b705]">The first time.</span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
                    Genuine and OEM-alternative components for excavators,
                    bulldozers, motor graders and heavy machinery — imported
                    directly and supplied across Pakistan.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={scrollToProducts}
                      className="flex items-center justify-center gap-3 bg-[#f2b705] px-7 py-4 text-xs font-black uppercase tracking-wide text-black transition hover:bg-white"
                    >
                      Browse Parts
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    <button className="flex items-center justify-center gap-3 border border-neutral-700 px-7 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#f2b705] hover:text-[#f2b705]">
                      Request a Quote
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-2">
                      <CircleCheck className="h-4 w-4 text-[#f2b705]" />
                      OEM & aftermarket
                    </span>

                    <span className="flex items-center gap-2">
                      <CircleCheck className="h-4 w-4 text-[#f2b705]" />
                      Bulk pricing
                    </span>

                    <span className="flex items-center gap-2">
                      <CircleCheck className="h-4 w-4 text-[#f2b705]" />
                      Direct imports
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 right-[-30px] hidden w-[42%] items-end justify-center lg:flex">
                <div className="relative flex h-[380px] w-[380px] items-center justify-center rounded-full border border-neutral-700">
                  <div className="absolute h-[290px] w-[290px] rounded-full border border-neutral-700" />

                  <div className="text-[190px] opacity-80 grayscale">🚜</div>

                  <div className="absolute bottom-5 left-5 border border-neutral-700 bg-[#171717]/90 px-4 py-3 backdrop-blur">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">
                      Current inventory
                    </div>

                    <div className="mt-1 text-lg font-black text-white">
                      {loading ? "..." : `${products.length}+ Parts`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}

        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
            {[
              ["1,200+", "Parts in catalogue"],
              ["15+", "Years importing"],
              ["40+", "Machine models"],
              ["72 hrs", "Average quote time"],
            ].map(([number, label], index) => (
              <div
                key={label}
                className={`flex items-center gap-4 px-6 py-7 ${
                  index !== 0 ? "border-l border-neutral-200" : ""
                }`}
              >
                <div className="text-2xl font-black text-[#d99f00]">
                  {number}
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PRODUCTS ================= */}

        <section
          id="products-section"
          className="border-y border-neutral-200 bg-white"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-6">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d99f00]">
                  Live inventory
                </div>

                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Available parts
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  {loading
                    ? "Loading inventory..."
                    : search !== debouncedSearch
                      ? "Searching..."
                      : `${filteredProducts.length} products available`}
                </p>
              </div>

              {!loading && (
                <div className="text-xs text-neutral-400">
                  Updated from server
                </div>
              )}
            </div>

            {/* Loading */}

            {loading && (
              <div className="flex min-h-[350px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-[#d99f00]" />

                  <p className="text-sm font-medium text-neutral-500">
                    Loading products...
                  </p>
                </div>
              </div>
            )}

            {/* Error */}

            {!loading && error && (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="max-w-md border border-red-200 bg-red-50 p-8 text-center">
                  <AlertCircle className="mx-auto h-8 w-8 text-red-500" />

                  <h3 className="mt-4 font-black">Unable to load products</h3>

                  <p className="mt-2 break-words text-xs leading-5 text-red-600">
                    {error}
                  </p>

                  <button
                    onClick={() => window.location.reload()}
                    className="mt-5 bg-[#171717] px-5 py-3 text-xs font-black uppercase text-white"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Empty */}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="py-24 text-center">
                <Search className="mx-auto h-8 w-8 text-neutral-300" />

                <h3 className="mt-4 font-black">No products found</h3>

                <p className="mt-2 text-sm text-neutral-500">
                  Try searching for another part.
                </p>
              </div>
            )}

            {/* Products — extracted into ProductGrid (which renders ProductCard per item) */}

            {!loading && !error && filteredProducts.length > 0 && (
              <ProductGrid
                products={filteredProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                productsPerPage={PRODUCTS_PER_PAGE}
                pageNumbers={pageNumbers}
                onGoToPage={goToPage}
              />
            )}
          </div>
        </section>

        {/* ================= QUOTE CTA ================= */}

        <section className="bg-[#f2b705]">
          <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 px-5 py-12 lg:flex-row lg:items-center lg:px-6">
            <div>
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/60">
                Fleet & contractor pricing
              </div>

              <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                Need multiple parts?
                <br />
                Get a custom quote.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-black/65">
                Send us your machine model, part numbers and required
                quantities. We&apos;ll prepare a competitive quotation.
              </p>
            </div>

            <button className="flex shrink-0 items-center justify-center gap-3 bg-[#171717] px-7 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-black">
              Request Bulk Quote
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* ================= TRUST ================= */}

        <TrustSection />
      </main>

      {/* ================= FOOTER ================= */}

      <Footer />
    </div>
  );
}
