import {
  Search,
  ShoppingCart,
  User,
  Trash2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Shield,
  Tag,
  Zap,
  CircleCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useCart } from "~/hooks/useCart";

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
}

function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 12.0 : 0;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-12 h-[72px] border-b border-[var(--color-border)]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[var(--color-accent)]" />
          <span className="font-heading text-[18px] font-semibold text-[var(--color-primary)]">
            STORE
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            to="/product"
            className="font-body text-[14px] text-[var(--color-secondary)]"
          >
            Home
          </Link>
          <Link
            to="/product"
            className="font-body text-[14px] text-[var(--color-secondary)]"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className="font-heading text-[14px] font-medium text-[var(--color-accent)]"
          >
            Cart ({totalItems})
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Search className="w-[18px] h-[18px] text-[var(--color-secondary)]" />
          <ShoppingCart className="w-[18px] h-[18px] text-[var(--color-primary)]" />
          <User className="w-[18px] h-[18px] text-[var(--color-secondary)]" />
        </div>
      </header>

      {/* Cart Body */}
      <div className="flex px-12 py-10 gap-0">
        {/* Cart Items Section */}
        <div className="flex flex-col flex-1 gap-6 pr-12">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-[40px] font-medium text-[var(--color-primary)] tracking-[-1px]">
              Shopping Cart
            </h1>
            <p className="font-body text-[14px] text-[var(--color-secondary)]">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {/* Table Header */}
          <div className="flex items-center py-[14px] border-b border-[var(--color-border)]">
            <span className="flex-1 font-heading text-[13px] font-medium text-[var(--color-secondary)]">
              Product
            </span>
            <span className="w-[100px] text-right font-heading text-[13px] font-medium text-[var(--color-secondary)]">
              Price
            </span>
            <span className="w-[120px] text-center font-heading text-[13px] font-medium text-[var(--color-secondary)]">
              Quantity
            </span>
            <span className="w-[100px] text-right font-heading text-[13px] font-medium text-[var(--color-secondary)]">
              Total
            </span>
            <span className="w-[40px]" />
          </div>

          {/* Cart Rows */}
          {items.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="font-body text-[16px] text-[var(--color-secondary)]">
                Your cart is empty
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.title}
                className="flex items-center py-5 border-b border-[var(--color-border)]"
              >
                {/* Product */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-20 h-20 bg-[#F5F5F5] shrink-0 overflow-hidden">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                      {item.title}
                    </span>
                    <span className="font-body text-[13px] text-[var(--color-secondary)]">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <span className="w-[100px] text-right font-heading text-[14px] font-medium text-[var(--color-primary)]">
                  {item.price}
                </span>

                {/* Quantity */}
                <div className="w-[120px] flex items-center justify-center">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateQuantity(item.title, item.quantity - 1)
                      }
                      className="flex items-center justify-center w-8 h-8 border border-[var(--color-border)] font-body text-[14px] text-[var(--color-primary)]"
                    >
                      −
                    </button>
                    <div className="flex items-center justify-center w-10 h-8 border-y border-[var(--color-border)] font-heading text-[14px] font-medium text-[var(--color-primary)]">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() =>
                        updateQuantity(item.title, item.quantity + 1)
                      }
                      className="flex items-center justify-center w-8 h-8 border border-[var(--color-border)] font-body text-[14px] text-[var(--color-primary)]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <span className="w-[100px] text-right font-heading text-[14px] font-semibold text-[var(--color-primary)]">
                  {formatPrice(parsePrice(item.price) * item.quantity)}
                </span>

                {/* Remove */}
                <div className="w-[40px] flex items-center justify-center">
                  <button
                    onClick={() => removeFromCart(item.title)}
                    className="text-[var(--color-secondary)] hover:text-[var(--color-accent)]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="w-[420px] shrink-0 flex flex-col gap-6 p-8 border border-[var(--color-border)] bg-white self-start">
          <h2 className="font-heading text-[22px] font-semibold text-[var(--color-primary)] tracking-[-0.5px]">
            Order Summary
          </h2>

          <hr className="border-[var(--color-border)]" />

          {/* Price Breakdown */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-[14px] text-[var(--color-secondary)]">
                Subtotal ({totalItems} items)
              </span>
              <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-[14px] text-[var(--color-secondary)]">
                Shipping
              </span>
              <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                {formatPrice(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body text-[14px] text-[var(--color-secondary)]">
                Estimated Tax
              </span>
              <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                {formatPrice(tax)}
              </span>
            </div>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Promo Code */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
              Promotion Code
            </span>
            <div className="flex gap-2">
              <div className="flex items-center flex-1 h-[42px] px-[14px] border border-[var(--color-border)]">
                <span className="font-body text-[14px] text-[var(--color-placeholder)]">
                  SUMMER2024
                </span>
              </div>
              <button className="flex items-center justify-center h-[42px] px-5 bg-[var(--color-primary)]">
                <span className="font-heading text-[13px] font-medium text-white">
                  Apply
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2 bg-[#F0FDF4] px-[14px] py-[10px]">
              <CircleCheck className="w-4 h-4 text-green-600" />
              <span className="font-body text-[13px] font-medium text-[#166534]">
                SUMMER2024 applied — 15% off
              </span>
            </div>
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Discount */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <Tag className="w-[14px] h-[14px] text-[var(--color-accent)]" />
                <span className="font-body text-[14px] text-[var(--color-accent)]">
                  Discount (15%)
                </span>
              </div>
              <span className="font-heading text-[14px] font-semibold text-[var(--color-accent)]">
                -{formatPrice(subtotal * 0.15)}
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              <Zap className="w-3 h-3 text-green-600" />
              <span className="font-body text-[12px] text-green-600">
                You're saving {formatPrice(subtotal * 0.15)} on this order!
              </span>
            </div>
          </div>

          <hr className="border-[var(--color-primary)] border-t-2" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="font-heading text-[18px] font-semibold text-[var(--color-primary)]">
              Total
            </span>
            <span className="font-heading text-[24px] font-semibold text-[var(--color-primary)] tracking-[-0.5px]">
              {formatPrice(total - subtotal * 0.15)}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="flex items-center justify-center gap-[10px] h-[52px] w-full bg-[var(--color-accent)]"
          >
            <Lock className="w-4 h-4 text-white" />
            <span className="font-heading text-[16px] font-semibold text-white">
              Proceed to Checkout
            </span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          {/* Secure checkout */}
          <div className="flex items-center justify-center gap-[6px]">
            <Shield className="w-[14px] h-[14px] text-[var(--color-placeholder)]" />
            <span className="font-body text-[12px] text-[var(--color-placeholder)]">
              Secure checkout · SSL encrypted
            </span>
          </div>

          {/* Continue Shopping */}
          <Link
            to="/product"
            className="flex items-center justify-center gap-[6px]"
          >
            <ArrowLeft className="w-[14px] h-[14px] text-[var(--color-secondary)]" />
            <span className="font-body text-[13px] font-medium text-[var(--color-secondary)]">
              Continue Shopping
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
