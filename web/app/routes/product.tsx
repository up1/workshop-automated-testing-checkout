import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { ProductCard } from "~/components/ProductCard";
import { useCart } from "~/hooks/useCart";
import type { Route } from "./+types/product";

interface Product {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  price: string;
}

export async function loader() {
  const apiHostname = process.env.API_HOSTNAME || "http://localhost:3001";
  const response = await fetch(`${apiHostname}/api/product?page=1&limit=8`);
  const result = await response.json();
  const products: Product[] = result.data;
  return { products };
}

const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
];

const brands = ["Apple", "Samsung", "Nike", "Sony"];

function CheckboxItem({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-[10px] w-full cursor-pointer">
      <div className="w-4 h-4 border border-[var(--color-secondary)] shrink-0" />
      <span className="font-body text-[14px] text-[var(--color-primary)]">
        {label}
      </span>
    </label>
  );
}

function RatingFilter({ stars }: { stars: number }) {
  return (
    <label className="flex items-center gap-[10px] w-full cursor-pointer">
      <div className="w-4 h-4 border border-[var(--color-secondary)] shrink-0" />
      <div className="flex items-center gap-1">
        {Array.from({ length: stars }).map((_, i) => (
          <Star
            key={i}
            className="w-[14px] h-[14px] fill-[var(--color-accent)] text-[var(--color-accent)]"
          />
        ))}
      </div>
      <span className="font-body text-[13px] text-[var(--color-secondary)]">
        & Up
      </span>
    </label>
  );
}

function PaginationButton({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center px-4 py-[10px] font-heading text-[13px] font-medium ${
        active
          ? "bg-[var(--color-accent)] text-white"
          : "border border-[var(--color-border)] text-[var(--color-primary)]"
      }`}
    >
      {children}
    </button>
  );
}

export default function ProductPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  const { addToCart, totalItems } = useCart();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center gap-8 px-12 border-b border-[var(--color-border)]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--color-accent)]" />
          <span className="font-heading text-[18px] font-semibold text-[var(--color-primary)]">
            STORE
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="font-heading text-[14px] font-medium text-[var(--color-accent)]"
          >
            Home
          </a>
          <a
            href="#"
            className="font-heading text-[14px] text-[var(--color-secondary)]"
          >
            Shop
          </a>
          <a
            href="#"
            className="font-heading text-[14px] text-[var(--color-secondary)]"
          >
            Categories
          </a>
          <a
            href="#"
            className="font-heading text-[14px] text-[var(--color-secondary)]"
          >
            Deals
          </a>
        </nav>

        <div className="flex-1" />

        {/* Search */}
        <div className="flex items-center gap-2 w-[320px] h-10 px-4 border border-[var(--color-border)]">
          <Search className="w-4 h-4 text-[var(--color-secondary)]" />
          <span className="font-body text-[14px] text-[var(--color-placeholder)]">
            Search products...
          </span>
        </div>

        <div className="flex-1" />

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-[18px] h-[18px] text-[var(--color-primary)]" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 bg-[var(--color-accent)] text-white text-[10px] font-semibold rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          <User className="w-[18px] h-[18px] text-[var(--color-primary)]" />
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Filter Sidebar */}
        <aside className="flex flex-col gap-6 w-[280px] shrink-0 p-[32px_24px] border-r border-[var(--color-border)]">
          <h2 className="font-heading text-[18px] font-semibold text-[var(--color-primary)]">
            Filters
          </h2>

          <hr className="border-[var(--color-border)]" />

          {/* Category */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
              Category
            </h3>
            <div className="flex flex-col gap-[10px]">
              {categories.map((cat) => (
                <CheckboxItem key={cat} label={cat} />
              ))}
            </div>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Price Range */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
              Price Range
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center flex-1 h-10 px-3 border border-[var(--color-border)]">
                <span className="font-body text-[14px] text-[var(--color-placeholder)]">
                  Min
                </span>
              </div>
              <span className="font-body text-[14px] text-[var(--color-secondary)]">
                –
              </span>
              <div className="flex items-center flex-1 h-10 px-3 border border-[var(--color-border)]">
                <span className="font-body text-[14px] text-[var(--color-placeholder)]">
                  Max
                </span>
              </div>
            </div>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
              Brand
            </h3>
            <div className="flex flex-col gap-[10px]">
              {brands.map((brand) => (
                <CheckboxItem key={brand} label={brand} />
              ))}
            </div>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Rating */}
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
              Rating
            </h3>
            <div className="flex flex-col gap-[10px]">
              <RatingFilter stars={4} />
              <RatingFilter stars={3} />
              <RatingFilter stars={2} />
            </div>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Apply Button */}
          <button className="flex items-center justify-center h-11 w-full bg-[var(--color-accent)] font-heading text-[13px] font-medium text-white">
            Apply Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex flex-col flex-1 gap-8 p-[40px_48px]">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="font-heading text-[28px] font-semibold text-[var(--color-primary)] tracking-[-1px]">
                Product Catalog
              </h1>
              <p className="font-body text-[14px] text-[var(--color-secondary)]">
                Showing {products.length} products
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-[14px] text-[var(--color-secondary)]">
                Sort by:
              </span>
              <button className="flex items-center gap-2 px-4 py-[10px] border border-[var(--color-border)]">
                <span className="font-body text-[14px] font-medium text-[var(--color-primary)]">
                  Featured
                </span>
                <ChevronDown className="w-[14px] h-[14px] text-[var(--color-secondary)]" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: Math.ceil(products.length / 4) }).map((_, row) => (
              <div key={row} className="flex gap-6">
                {products.slice(row * 4, row * 4 + 4).map((product) => (
                  <ProductCard
                    key={product.title}
                    {...product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 pt-6">
            <button className="flex items-center gap-[6px] px-4 py-[10px] border border-[var(--color-border)]">
              <ChevronLeft className="w-4 h-4 text-[var(--color-secondary)]" />
              <span className="font-heading text-[13px] font-medium text-[var(--color-secondary)]">
                Previous
              </span>
            </button>
            <PaginationButton active>1</PaginationButton>
            <PaginationButton>2</PaginationButton>
            <PaginationButton>3</PaginationButton>
            <span className="font-heading text-[13px] text-[var(--color-secondary)]">
              ...
            </span>
            <PaginationButton>8</PaginationButton>
            <button className="flex items-center gap-[6px] px-4 py-[10px] border border-[var(--color-border)]">
              <span className="font-heading text-[13px] font-medium text-[var(--color-primary)]">
                Next
              </span>
              <ChevronRight className="w-4 h-4 text-[var(--color-primary)]" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
