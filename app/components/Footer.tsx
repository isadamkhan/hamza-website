import Link from "next/link";
import { Phone, Mail, MapPin, Wrench } from "lucide-react";
import MapEmbed from "./MapEmbed";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Full Catalogue", href: "/" },
      { label: "Repair Service", href: "/repair-service" },
      { label: "Undercarriage", href: "/undercarriage" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Returns & Warranty", href: "#" },
      { label: "Shipping Information", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Quality Guarantee", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
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
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                {column.title}
              </h4>

              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs transition hover:text-[#f2b705]"
                    >
                      {link.label}
                    </Link>
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
  );
}
