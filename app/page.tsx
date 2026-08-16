"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  Search,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Truck,
  PackageCheck,
  Wrench,
  Menu,
  X,
  MessageCircle,
  CircleCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

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

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
};

export default function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const API_URL = "http://185.255.93.161:3000/api/products";

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
          name: product.title,
          description: product.description,
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
   * SEARCH
   * ============================
   */

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query),
    );
  }, [products, search]);

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

  const addToCart = (productName: string) => {
    setCartCount((count) => count + 1);

    alert(`Added ${productName} to cart!`);
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

            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-[#f2b705] shadow-[4px_4px_0_#171717]">
                <Wrench className="h-5 w-5 text-[#171717]" />
              </div>

              <div className="hidden sm:block">
                <div className="text-[18px] font-black uppercase tracking-tight">
                  Hamza
                  <span className="text-[#d99f00]"> Enterprises</span>
                </div>

                <div className="text-[9px] font-bold tracking-[0.2em] text-neutral-500">
                  HEAVY EQUIPMENT PARTS
                </div>
              </div>
            </div>

            {/* Search */}

            <div className="mx-auto hidden max-w-2xl flex-1 md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by part name or description..."
                  className="h-11 w-full border border-neutral-300 bg-neutral-50 pl-11 pr-28 text-sm outline-none transition focus:border-[#d99f00] focus:bg-white"
                />

                <button className="absolute right-0 top-0 flex h-11 items-center gap-2 bg-[#171717] px-5 text-xs font-bold text-white transition hover:bg-[#d99f00] hover:text-black">
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
                className="hidden items-center gap-2 border border-neutral-200 px-4 py-2.5 text-xs font-bold transition hover:border-[#d99f00] sm:flex"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>

              <button className="relative flex h-11 w-11 items-center justify-center border border-neutral-200 transition hover:border-[#d99f00]">
                <ShoppingCart className="h-[18px] w-[18px]" />

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#f2b705] text-[10px] font-black">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-11 w-11 items-center justify-center border border-neutral-200 md:hidden"
              >
                {mobileMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop navigation */}

          <div className="hidden h-12 items-center border-t border-neutral-100 md:flex">
            <div className="flex h-full items-center gap-8 text-[12px] font-bold uppercase tracking-wide">
              <button className="relative flex h-full items-center text-[#d99f00]">
                All Products
                <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#f2b705]" />
              </button>

              <span className="text-neutral-500">New Arrivals</span>

              <span className="text-neutral-500">Best Sellers</span>

              <span className="text-neutral-500">Heavy Equipment</span>

              <span className="text-neutral-500">Bearings</span>

              <span className="text-neutral-500">Hydraulics</span>

              <span className="ml-auto h-5 w-px bg-neutral-200" />

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

        {/* Mobile menu */}

        {mobileMenu && (
          <div className="border-t border-neutral-200 bg-white p-5 md:hidden">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search parts..."
                className="h-11 w-full border border-neutral-300 bg-neutral-50 pl-10 text-sm outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                "All Products",
                "New Arrivals",
                "Best Sellers",
                "Heavy Equipment",
                "Bearings",
                "Hydraulics",
              ].map((item) => (
                <button
                  key={item}
                  className="border border-neutral-200 p-3 text-left text-xs font-bold"
                  onClick={() => setMobileMenu(false)}
                >
                  {item}
                </button>
              ))}
            </div>
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
                    <button className="flex items-center justify-center gap-3 bg-[#f2b705] px-7 py-4 text-xs font-black uppercase tracking-wide text-black transition hover:bg-white">
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

        <section className="border-y border-neutral-200 bg-white">
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

            {/* Products */}

            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl"
                  >
                    {/* Image */}

                    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#f4f4f2]">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage:
                            "radial-gradient(#d4d4d4 1px, transparent 1px)",
                          backgroundSize: "14px 14px",
                        }}
                      />

                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <span className="absolute left-3 top-3 bg-[#171717] px-2 py-1 text-[9px] font-black text-white">
                        IN STOCK
                      </span>
                    </div>

                    {/* Information */}

                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-wide text-neutral-400">
                        <span>Heavy Equipment</span>
                      </div>

                      <h3 className="min-h-[42px] text-sm font-bold leading-5 text-neutral-800 transition group-hover:text-[#b38300]">
                        {product.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 min-h-[32px] text-[10px] leading-4 text-neutral-500">
                        {product.description}
                      </p>

                      {/* <div className="mt-4">
                        <div className="text-base font-black">
                          {formatPKR(product.price)}
                        </div>
                      </div> */}

                      {/* <button
                        onClick={() => addToCart(product.name)}
                        className="mt-4 flex h-10 w-full items-center justify-center gap-2 bg-[#171717] text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-[#f2b705] hover:text-black"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Add to cart
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
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

        <section className="bg-[#171717] text-white">
          <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-6">
            <div className="mb-10 max-w-xl">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#f2b705]">
                Why Hamza Enterprises
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Built for people who
                <br />
                can&apos;t afford downtime.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden border border-neutral-800 bg-neutral-800 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Quality checked",
                  text: "Genuine and carefully selected OEM-alternative components.",
                },
                {
                  icon: Truck,
                  title: "Direct imports",
                  text: "Parts sourced directly from established manufacturers.",
                },
                {
                  icon: PackageCheck,
                  title: "Bulk supply",
                  text: "Fleet and contractor quantities available on request.",
                },
                {
                  icon: Wrench,
                  title: "Parts expertise",
                  text: "Practical knowledge of earth-moving machinery components.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="bg-[#171717] p-7 transition hover:bg-[#202020]"
                  >
                    <Icon className="mb-6 h-7 w-7 text-[#f2b705]" />

                    <h3 className="text-sm font-black uppercase tracking-wide">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-neutral-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#111111] text-neutral-400">
        <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#f2b705]">
                  <Wrench className="h-5 w-5 text-black" />
                </div>

                <div>
                  <div className="text-sm font-black uppercase text-white">
                    Hamza Enterprises
                  </div>

                  <div className="text-[8px] font-bold tracking-[0.15em]">
                    HEAVY EQUIPMENT PARTS
                  </div>
                </div>
              </div>

              <p className="text-xs leading-6 text-neutral-500">
                Heavy equipment parts, bearings and earth-moving machinery
                components imported from China and supplied across Pakistan.
              </p>

              <div className="mt-6 space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#f2b705]" />
                  +92 3XX XXXXXXX
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-[#f2b705]" />
                  sales@hamzaenterprises.pk
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f2b705]" />
                  Khadda Market, Arslan Plaza, GT Road, Tarnol, Islamabad
                </div>
              </div>
            </div>

            {[
              {
                title: "Company",
                links: [
                  "About Us",
                  "Full Catalogue",
                  "Bulk Orders",
                  "Import & LC Process",
                ],
              },
              {
                title: "Customer Service",
                links: [
                  "Help Center",
                  "Returns & Warranty",
                  "Shipping Information",
                  "FAQs",
                ],
              },
              {
                title: "Information",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  "Quality Guarantee",
                  "Contact Us",
                ],
              },
            ].map((column) => (
              <div key={column.title}>
                <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  {column.title}
                </h4>

                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs transition hover:text-[#f2b705]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-neutral-800 pt-6 text-[10px] text-neutral-600 sm:flex-row">
            <p>© 2026 Hamza Enterprises. All rights reserved.</p>

            <p>Heavy Equipment Parts Supplier — Tarnol, Islamabad</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
