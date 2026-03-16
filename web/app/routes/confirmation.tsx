import {
  Check,
  User,
  CreditCard,
  Tag,
  Mail,
  Package,
  ShoppingBag,
  Download,
} from "lucide-react";
import { Link } from "react-router";
import { useCart } from "~/hooks/useCart";

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
}

function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export default function ConfirmationPage() {
  const { items } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  const discount = subtotal * 0.15;
  const shipping = items.length > 0 ? 12.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const orderNumber = `#ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 5);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 8);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const deliveryRange = `${fmt(deliveryStart)} – ${fmt(deliveryEnd)}`;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between h-[72px] px-12 border-b border-[var(--color-border)]">
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
          <span className="font-heading text-[14px] font-medium text-[var(--color-accent)]">
            My Orders
          </span>
        </nav>

        {/* User Icon */}
        <div className="flex items-center gap-4">
          <User className="w-[18px] h-[18px] text-[var(--color-secondary)]" />
        </div>
      </header>

      {/* Body */}
      <div className="flex justify-center px-12 py-[60px]">
        <div className="flex flex-col items-center gap-10 w-[720px]">
          {/* Success Icon + Title */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-20 h-20 bg-[#F0FDF4] rounded-full">
              <Check className="w-9 h-9 text-green-600" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full">
            <h1 className="font-heading text-[36px] font-semibold text-[var(--color-primary)] tracking-[-1px] text-center">
              Order Confirmed!
            </h1>
            <p className="font-body text-[16px] text-[var(--color-secondary)] leading-[1.5] text-center">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
          </div>

          {/* Order Info Bar */}
          <div className="flex w-full border border-[var(--color-border)]">
            <div className="flex flex-col items-center gap-1 flex-1 py-5 px-6">
              <span className="font-body text-[12px] text-[var(--color-secondary)]">
                Order Number
              </span>
              <span className="font-heading text-[16px] font-semibold text-[var(--color-primary)]">
                {orderNumber}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 flex-1 py-5 px-6 border-x border-[var(--color-border)]">
              <span className="font-body text-[12px] text-[var(--color-secondary)]">
                Estimated Delivery
              </span>
              <span className="font-heading text-[16px] font-semibold text-[var(--color-primary)]">
                {deliveryRange}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 flex-1 py-5 px-6">
              <span className="font-body text-[12px] text-[var(--color-secondary)]">
                Total Paid
              </span>
              <span className="font-heading text-[16px] font-semibold text-[var(--color-primary)]">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* Shipping + Payment */}
          <div className="flex gap-6 w-full">
            {/* Shipping To */}
            <div className="flex flex-col gap-4 flex-1 p-6 border border-[var(--color-border)]">
              <span className="font-heading text-[14px] font-semibold text-[var(--color-primary)]">
                Shipping To
              </span>
              <hr className="border-[var(--color-border)]" />
              <span className="font-body text-[14px] font-medium text-[var(--color-primary)]">
                John Doe
              </span>
              <span className="font-body text-[13px] text-[var(--color-secondary)] leading-[1.5]">
                123 Main Street, Apt 4B
              </span>
              <span className="font-body text-[13px] text-[var(--color-secondary)]">
                New York, NY 10001
              </span>
              <span className="font-body text-[13px] text-[var(--color-secondary)]">
                United States
              </span>
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-4 flex-1 p-6 border border-[var(--color-border)]">
              <span className="font-heading text-[14px] font-semibold text-[var(--color-primary)]">
                Payment Method
              </span>
              <hr className="border-[var(--color-border)]" />
              <div className="flex items-center gap-3">
                <CreditCard className="w-[18px] h-[18px] text-[var(--color-primary)]" />
                <div className="flex flex-col gap-[2px]">
                  <span className="font-body text-[14px] font-medium text-[var(--color-primary)]">
                    Visa ending in 4242
                  </span>
                  <span className="font-body text-[13px] text-[var(--color-secondary)]">
                    Expires 12/2027
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-[6px] bg-[#FEF2F2] px-[14px] py-[10px]">
                <Tag className="w-[14px] h-[14px] text-[var(--color-accent)]" />
                <span className="font-body text-[13px] font-medium text-[var(--color-accent)]">
                  Saved {formatPrice(discount)} with SUMMER2024
                </span>
              </div>
            </div>
          </div>

          {/* Items Ordered */}
          <div className="flex flex-col gap-4 w-full p-6 border border-[var(--color-border)]">
            <span className="font-heading text-[14px] font-semibold text-[var(--color-primary)]">
              Items Ordered ({totalItems})
            </span>
            <hr className="border-[var(--color-border)]" />
            {items.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-[#F5F5F5] shrink-0 overflow-hidden">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-[2px] flex-1">
                  <span className="font-body text-[13px] font-medium text-[var(--color-primary)]">
                    {item.title}
                  </span>
                  <span className="font-body text-[12px] text-[var(--color-secondary)]">
                    Qty: {item.quantity} · {item.category}
                  </span>
                </div>
                <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                  {formatPrice(parsePrice(item.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Email Note */}
          <div className="flex items-center justify-center gap-2 w-full bg-[#F5F5F5] px-5 py-4">
            <Mail className="w-4 h-4 text-[var(--color-secondary)]" />
            <span className="font-body text-[13px] text-[var(--color-secondary)]">
              A confirmation email has been sent to john.doe@email.com
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 w-full">
            <button className="flex items-center justify-center gap-2 h-12 px-8 bg-[var(--color-accent)]">
              <Package className="w-4 h-4 text-white" />
              <span className="font-heading text-[14px] font-semibold text-white">
                Track Order
              </span>
            </button>
            <Link
              to="/product"
              className="flex items-center justify-center gap-2 h-12 px-8 border border-[var(--color-border)]"
            >
              <ShoppingBag className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                Continue Shopping
              </span>
            </Link>
            <button className="flex items-center justify-center gap-2 h-12 px-8 border border-[var(--color-border)]">
              <Download className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                Download Receipt
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
