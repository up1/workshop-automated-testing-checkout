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
import type { Route } from "./+types/confirmation";

function formatPrice(amount: string): string {
  return amount;
}

interface OrderItem {
  productId: number;
  title: string;
  price: string;
  quantity: number;
}

interface OrderData {
  orderId: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  items: OrderItem[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  status: string;
  createdAt: string;
}

export async function loader({ params }: Route.LoaderArgs) {
  const apiHostname = process.env.API_HOSTNAME || "http://localhost:3001";
  const response = await fetch(`${apiHostname}/api/order/${params.orderId}`);
  const result = await response.json();

  if (!result.success) {
    throw new Response(result.message || "Order not found", { status: response.status });
  }

  return { order: result.data as OrderData };
}

export default function ConfirmationPage({ loaderData }: Route.ComponentProps) {
  const { order } = loaderData;

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

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
                #ORD-{order.orderId}
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
                {formatPrice(order.total)}
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
                {order.customer.fullName}
              </span>
              <span className="font-body text-[13px] text-[var(--color-secondary)] leading-[1.5]">
                {order.shippingAddress.street}
              </span>
              <span className="font-body text-[13px] text-[var(--color-secondary)]">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
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
                  Order {order.status}
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
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-[#F5F5F5] shrink-0 overflow-hidden">
                </div>
                <div className="flex flex-col gap-[2px] flex-1">
                  <span className="font-body text-[13px] font-medium text-[var(--color-primary)]">
                    {item.title}
                  </span>
                  <span className="font-body text-[12px] text-[var(--color-secondary)]">
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          {/* Email Note */}
          <div className="flex items-center justify-center gap-2 w-full bg-[#F5F5F5] px-5 py-4">
            <Mail className="w-4 h-4 text-[var(--color-secondary)]" />
            <span className="font-body text-[13px] text-[var(--color-secondary)]">
              A confirmation email has been sent to {order.customer.email}
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
