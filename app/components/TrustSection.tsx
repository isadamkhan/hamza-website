import React from 'react'
import {
  ShieldCheck,
  Truck,
  PackageCheck,
  Wrench,
} from "lucide-react";
export const TrustSection = () => {
  return (
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
  )
}
