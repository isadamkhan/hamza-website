"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowLeft,
  Wrench,
  Circle,
  Link2,
  CircleDot,
  Cog,
  X,
} from "lucide-react";

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

const CATEGORIES = [
  {
    icon: Link2,
    title: "Track chains & shoes",
    text: "Sealed and lubricated track chain assemblies with bolt-on shoes, sized for excavators, dozers and loaders.",
  },
  {
    icon: Circle,
    title: "Rollers & idlers",
    text: "Carrier rollers, track rollers and front idlers rebuilt or supplied new, matched to your machine's track frame.",
  },
  {
    icon: CircleDot,
    title: "Sprockets & segments",
    text: "Drive sprockets and rim segments for common excavator and dozer undercarriage families.",
  },
  {
    icon: Cog,
    title: "Bushings & pins",
    text: "Precision-fit pins and bushings for track chain rebuilds, sold individually or as full sets.",
  },
];

const REASONS = [
  {
    title: "Machine-matched fitment",
    text: "We ask for your machine's make, model and undercarriage type before quoting, so what arrives actually bolts on.",
  },
  {
    title: "New & rebuilt options",
    text: "Choose new components or cost-effective rebuilt units depending on your budget and how many hours you need out of it.",
  },
  {
    title: "Stocked for fast turnaround",
    text: "Common wear parts are kept in stock at our Tarnol warehouse so a worn undercarriage doesn't mean weeks of downtime.",
  },
];

export default function UndercarriagePage() {
  const [mobileMenu, setMobileMenu] = useState(false);

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
            <span className="cursor-pointer hover:text-white">Bulk Enquiry</span>
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
            <Link href="/" className="flex shrink-0 items-center gap-3">
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

            <Link
              href="/"
              className="ml-2 hidden items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-[#d99f00] md:flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to catalogue
            </Link>

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

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-11 w-11 items-center justify-center border border-neutral-200 md:hidden"
              >
                {mobileMenu ? <X className="h-5 w-5" /> : <Wrench className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {mobileMenu && (
            <div className="border-t border-neutral-200 py-4 md:hidden">
              <Link
                href="/"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-600"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to catalogue
              </Link>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}

        <section className="bg-[#171717]">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-6">
            <div className="relative min-h-[400px] overflow-hidden">
              <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border-[60px] border-neutral-800/50" />

              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />

              <div className="relative z-10 flex min-h-[400px] items-center py-16">
                <div className="max-w-2xl">
                  <div className="mb-5 inline-flex items-center gap-2 border border-[#f2b705]/30 bg-[#f2b705]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#f2b705]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f2b705]" />
                    Undercarriage Parts
                  </div>

                  <h1 className="text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                    Worn tracks
                    <br />
                    <span className="text-[#f2b705]">cost you every day.</span>
                  </h1>

                  <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
                    Track chains, rollers, idlers, sprockets and bushings for
                    excavators, dozers and loaders — matched to your
                    machine's fitment and stocked for fast dispatch.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="https://wa.me/923359068724"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#f2b705] px-7 py-4 text-xs font-black uppercase tracking-wide text-black transition hover:bg-white"
                    >
                      Get a Quote
                      <ArrowUpRight className="h-4 w-4" />
                    </a>

                    <a
                      href="tel:+923359068724"
                      className="flex items-center justify-center gap-3 border border-neutral-700 px-7 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#f2b705] hover:text-[#f2b705]"
                    >
                      Call to Check Fitment
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORIES ================= */}

        <section className="border-y border-neutral-200 bg-white">
          <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-6">
            <div className="mb-10 max-w-xl">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d99f00]">
                What we stock
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Undercarriage components
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;

                return (
                  <div
                    key={category.title}
                    className="border border-neutral-200 bg-white p-6 transition hover:border-[#f2b705]"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center bg-[#171717]">
                      <Icon className="h-5 w-5 text-[#f2b705]" />
                    </div>

                    <h3 className="text-sm font-black leading-5">
                      {category.title}
                    </h3>

                    <p className="mt-3 text-xs leading-5 text-neutral-500">
                      {category.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= WHY ================= */}

        <section className="bg-[#171717] text-white">
          <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-6">
            <div className="mb-10 max-w-xl">
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#f2b705]">
                Why buy from us
              </div>

              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Fitment first, every time
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden border border-neutral-800 bg-neutral-800 sm:grid-cols-3">
              {REASONS.map((reason) => (
                <div
                  key={reason.title}
                  className="bg-[#171717] p-7 transition hover:bg-[#202020]"
                >
                  <h3 className="text-sm font-black uppercase tracking-wide">
                    {reason.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-neutral-500">
                    {reason.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="bg-[#f2b705]">
          <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 px-5 py-12 lg:flex-row lg:items-center lg:px-6">
            <div>
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/60">
                Not sure what you need?
              </div>

              <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                Send your machine model,
                <br />
                we&apos;ll confirm the parts.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-black/65">
                Share the make, model and undercarriage size over WhatsApp and
                we&apos;ll confirm exact fitment before you order.
              </p>
            </div>

            <a
              href="https://wa.me/923359068724"
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center justify-center gap-3 bg-[#171717] px-7 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
            >
              Message on WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="bg-[#111111] text-neutral-400">
        <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
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
                Undercarriage parts and heavy equipment components imported
                and supplied across Pakistan.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#f2b705]" />
                +92 335 9068724
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#f2b705]" />
                hamzaenterprises062@gmail.com
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f2b705]" />
                Khadda Market, Arslan Plaza, GT Road, Tarnol, Islamabad
              </div>
            </div>

            <div>
              <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                Quick links
              </h4>

              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-xs transition hover:text-[#f2b705]">
                    Full Catalogue
                  </Link>
                </li>
                <li>
                  <Link
                    href="/repair-service"
                    className="text-xs transition hover:text-[#f2b705]"
                  >
                    Repair Service
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-xs transition hover:text-[#f2b705]">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
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