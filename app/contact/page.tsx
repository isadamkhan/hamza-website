"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ChevronLeft,
} from "lucide-react";
import Footer from "../components/Footer";
import MapEmbed from "../components/MapEmbed";

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

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Phone",
    value: "+92 335 9068724",
    href: "tel:+923359068724",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hamzaenterprises062@gmail.com",
    href: "mailto:hamzaenterprises062@gmail.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Khadda Market, Arslan Plaza, GT Road, Tarnol, Islamabad",
    href: "https://www.google.com/maps/search/?api=1&query=33.648249,72.9151665",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat, 9:00 AM – 7:00 PM",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        </div>
      </div>

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1400px] items-center gap-5 px-5 lg:px-6">
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
            className="ml-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500 transition hover:text-[#d99f00]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <a
            href="https://wa.me/923359068724"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center gap-2 border border-neutral-200 px-3 text-xs font-bold text-[#25D366] transition hover:border-[#25D366] hover:bg-[#25D366]/5 sm:px-4"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            <span className="hidden text-[#171717] sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <main>
        <section className="bg-[#171717]">
          <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-6">
            <div className="mb-3 inline-flex items-center gap-2 border border-[#f2b705]/30 bg-[#f2b705]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#f2b705]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f2b705]" />
              Get in touch
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
              Talk to us about
              <br />
              <span className="text-[#f2b705]">your next order.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
              Send us your machine model, part numbers, or a photo of the
              worn-out part — our team will get back with pricing and
              availability.
            </p>
          </div>
        </section>

        {/* ================= CONTACT DETAILS + FORM ================= */}

        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-6">
            {/* Details */}
            <div>
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d99f00]">
                Contact details
              </div>

              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Reach us directly
              </h2>

              <div className="mt-8 space-y-5">
                {CONTACT_DETAILS.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 border border-neutral-200 p-4 transition hover:border-[#f2b705]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#171717]">
                        <Icon className="h-4 w-4 text-[#f2b705]" />
                      </div>

                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                          {item.label}
                        </div>
                        <div className="mt-1 text-sm font-medium text-neutral-800">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d99f00]">
                Send a message
              </div>

              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                We&apos;ll reply within 72 hours
              </h2>

              {submitted ? (
                <div className="mt-8 border border-[#f2b705] bg-[#f2b705]/10 p-6">
                  <p className="text-sm font-bold text-[#171717]">
                    Thanks — your message has been noted.
                  </p>
                  <p className="mt-1 text-xs text-neutral-600">
                    For a faster response, message us on WhatsApp directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-neutral-500">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Your name"
                      className="h-11 w-full border border-neutral-300 bg-neutral-50 px-4 text-sm outline-none transition focus:border-[#d99f00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-neutral-500">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="03XX XXXXXXX"
                      className="h-11 w-full border border-neutral-300 bg-neutral-50 px-4 text-sm outline-none transition focus:border-[#d99f00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-wider text-neutral-500">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Machine model, part numbers, or what you're looking for..."
                      className="w-full resize-none border border-neutral-300 bg-neutral-50 p-4 text-sm outline-none transition focus:border-[#d99f00] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 bg-[#171717] px-7 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#f2b705] hover:text-black sm:w-auto"
                  >
                    Send Message
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= MAP ================= */}

        <section className="bg-white">
          <div className="mx-auto max-w-[1400px] px-5 pb-16 lg:px-6">
            <div className="mb-6">
              <div className="mb-2 pt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#d99f00]">
                Find us
              </div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                Visit our shop
              </h2>
            </div>

            <MapEmbed
              height={380}
              label="Hamza Enterprises — Tarnol, Islamabad"
            />
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <Footer />
    </div>
  );
}
