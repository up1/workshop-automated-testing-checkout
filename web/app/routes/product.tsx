import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Link } from "react-router";
import { ProductCard } from "~/components/ProductCard";
import { useCart } from "~/hooks/useCart";

const products = [
  {
    image:
      "https://images.unsplash.com/photo-1739764575613-ecc078ed173d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Electronics",
    title: "Wireless Headphones Pro",
    description: "Premium noise-cancelling over-ear headphones",
    price: "$249.99",
  },
  {
    image:
      "https://images.unsplash.com/photo-1729980635252-35c2e0ae5414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Clothing",
    title: "Classic Denim Jacket",
    description: "Timeless washed denim with modern fit",
    price: "$89.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1761083042195-9e0e85189e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Home & Garden",
    title: "Ceramic Plant Pot Set",
    description: "Set of 3 minimalist ceramic planters",
    price: "$45.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1626194062394-022cc80f6d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Electronics",
    title: "Smart Watch Ultra",
    description: "Advanced fitness tracking & notifications",
    price: "$399.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1724921196547-08aee1bab2da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Sports",
    title: "Running Shoes Air Max",
    description: "Lightweight breathable mesh running shoes",
    price: "$129.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1759266339551-2ed0a89a4b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Books",
    title: "Design Patterns Handbook",
    description: "Essential guide to modern software design",
    price: "$34.99",
  },
  {
    image:
      "https://images.unsplash.com/photo-1703243030062-58deb1b82367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Toys",
    title: "Building Blocks 500pc",
    description: "Creative construction set for ages 6+",
    price: "$59.99",
  },
  {
    image:
      "https://images.unsplash.com/photo-1676524246728-bda8b4c0548a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Clothing",
    title: "Merino Wool Sweater",
    description: "Soft premium merino wool crew neck",
    price: "$120.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1649230955954-108845001397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Home & Garden",
    title: "LED Desk Lamp",
    description: "Adjustable brightness with USB charging port",
    price: "$67.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1594501432907-91214bfdd928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Electronics",
    title: "Bluetooth Speaker Mini",
    description: "Portable waterproof speaker with 12h battery",
    price: "$79.99",
  },
  {
    image:
      "https://images.unsplash.com/photo-1754738381783-f9a2847bfef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Sports",
    title: "Yoga Mat Premium",
    description: "Non-slip eco-friendly exercise mat 6mm",
    price: "$42.00",
  },
  {
    image:
      "https://images.unsplash.com/photo-1719429873442-e894bc0ca520?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Books",
    title: "Creative Coding Guide",
    description: "Learn to code through art and design",
    price: "$29.99",
  },
];

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

export default function ProductPage() {
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
                Showing 1–12 of 86 products
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
            {[0, 1, 2].map((row) => (
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
