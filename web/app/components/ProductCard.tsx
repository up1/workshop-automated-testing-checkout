import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  price: string;
  onAddToCart?: () => void;
}

export function ProductCard({
  image,
  category,
  title,
  description,
  price,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="flex flex-col border border-[var(--color-border)] flex-1 min-w-0">
      <div
        className="h-[220px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="flex flex-col gap-2 p-[16px_20px]">
        <span className="font-body text-[12px] font-medium text-[var(--color-accent)]">
          {category}
        </span>
        <h3 className="font-heading text-[16px] font-medium text-[var(--color-primary)]">
          {title}
        </h3>
        <p className="font-body text-[13px] text-[var(--color-secondary)] leading-[1.4]">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-heading text-[18px] font-semibold text-[var(--color-primary)]">
            {price}
          </span>
          <button
            onClick={onAddToCart}
            className="flex items-center gap-[6px] bg-[var(--color-primary)] px-3 py-2 cursor-pointer hover:opacity-80 active:scale-95 transition"
          >
            <ShoppingCart className="w-[14px] h-[14px] text-white" />
            <span className="font-heading text-[13px] font-medium text-white">
              Add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
