import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group overflow-hidden border border-neutral-200 bg-white transition duration-300 hover:border-[#f2b705] hover:shadow-none">
      {/* Image */}
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-[#f4f4f2]">
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
          className="relative h-full w-full object-contain p-0"
          loading="lazy"
        />

        <span className="absolute left-3 top-3 border-l-4 border-[#f2b705] bg-[#171717] px-2 py-1 text-[9px] font-black text-white">
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
      </div>
    </div>
  );
}