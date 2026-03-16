import { useState } from "react";
import {
  Lock,
  CreditCard,
  Wallet,
  Landmark,
  ChevronDown,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "~/hooks/useCart";

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
}

function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function FormField({
  label,
  placeholder,
  icon,
  className,
  name,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div className={`flex flex-col gap-[6px] ${className ?? ""}`}>
      <label className="font-body text-[13px] font-medium text-[var(--color-secondary)]">
        {label}
      </label>
      <div
        className={`flex items-center gap-[10px] h-[42px] px-[14px] border ${
          error
            ? "border-[var(--color-accent)]"
            : "border-[var(--color-border)]"
        }`}
      >
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="flex-1 font-body text-[14px] text-[var(--color-primary)] placeholder:text-[var(--color-placeholder)] outline-none bg-transparent"
        />
      </div>
      {error && (
        <span className="font-body text-[12px] text-[var(--color-accent)]">
          {error}
        </span>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-[6px] ${className ?? ""}`}>
      <label className="font-body text-[13px] font-medium text-[var(--color-secondary)]">
        {label}
      </label>
      <div className="flex items-center justify-between h-[42px] px-[14px] border border-[var(--color-border)]">
        <span className="font-body text-[14px] text-[var(--color-primary)]">
          {value}
        </span>
        <ChevronDown className="w-4 h-4 text-[var(--color-secondary)]" />
      </div>
    </div>
  );
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
  cardHolder: string;
}

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  cardNumber: "",
  expDate: "",
  cvv: "",
  cardHolder: "",
};

function validate(form: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  if (!form.street.trim()) errors.street = "Street address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.state.trim()) errors.state = "State is required";
  if (!form.zip.trim()) errors.zip = "Zip code is required";
  if (!form.cardNumber.trim()) {
    errors.cardNumber = "Card number is required";
  } else if (form.cardNumber.replace(/\s/g, "").length < 13) {
    errors.cardNumber = "Enter a valid card number";
  }
  if (!form.expDate.trim()) {
    errors.expDate = "Expiration date is required";
  } else if (!/^\d{2}\s*\/\s*\d{2}$/.test(form.expDate.trim())) {
    errors.expDate = "Use MM / YY format";
  }
  if (!form.cvv.trim()) {
    errors.cvv = "CVV is required";
  } else if (!/^\d{3,4}$/.test(form.cvv.trim())) {
    errors.cvv = "Enter a valid CVV";
  }
  if (!form.cardHolder.trim()) errors.cardHolder = "Cardholder name is required";

  return errors;
}

export default function CheckoutPage() {
  const { items } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 12.0 : 0;
  const tax = subtotal * 0.08;
  const discount = subtotal * 0.15;
  const total = subtotal + shipping + tax - discount;

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormData];
        return next;
      });
    }
  };

  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    setApiError(null);
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const apiHostname = "http://localhost:3001";
        const res = await fetch(`${apiHostname}/api/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: {
              fullName: form.fullName,
              email: form.email,
              phone: form.phone,
            },
            shippingAddress: {
              street: form.street,
              city: form.city,
              state: form.state,
              zip: form.zip,
            },
            items: items.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          }),
        });

        const data = await res.json();

        if (res.status === 201 && data.success) {
          navigate(`/confirmation/${data.data.orderId}`);
        } else if (res.status === 400) {
          if (data.errors) {
            setErrors(data.errors);
          }
          setApiError(data.message || "Validation failed");
        } else {
          setApiError(data.message || "Internal Server Error");
        }
      } catch {
        setApiError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    }
  };

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

        {/* Steps */}
        <nav className="flex items-center gap-6">
          {/* Step 1 - Active */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-[var(--color-accent)] rounded-full">
              <span className="font-heading text-[12px] font-semibold text-white">
                1
              </span>
            </div>
            <span className="font-heading text-[14px] font-medium text-[var(--color-accent)]">
              Shipping
            </span>
          </div>

          <div className="w-10 h-px bg-[var(--color-border)]" />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-[var(--color-placeholder)] rounded-full">
              <span className="font-heading text-[12px] font-semibold text-white">
                2
              </span>
            </div>
            <span className="font-heading text-[14px] font-medium text-[var(--color-placeholder)]">
              Payment
            </span>
          </div>

          <div className="w-10 h-px bg-[var(--color-border)]" />

          {/* Step 3 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 bg-[var(--color-placeholder)] rounded-full">
              <span className="font-heading text-[12px] font-semibold text-white">
                3
              </span>
            </div>
            <span className="font-heading text-[14px] font-medium text-[var(--color-placeholder)]">
              Confirm
            </span>
          </div>
        </nav>

        {/* Secure */}
        <div className="flex items-center gap-[6px]">
          <Lock className="w-[14px] h-[14px] text-[var(--color-placeholder)]" />
          <span className="font-body text-[13px] text-[var(--color-placeholder)]">
            Secure Checkout
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="flex gap-12 px-12 py-10">
        {/* Forms */}
        <div className="flex flex-col flex-1 gap-10">
          {/* Shipping Address */}
          <section className="flex flex-col gap-5">
            <h2 className="font-heading text-[18px] font-semibold text-[var(--color-primary)]">
              Shipping Address
            </h2>

            <FormField
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
              className="w-full"
            />

            <div className="flex gap-4">
              <FormField
                label="Email Address"
                name="email"
                placeholder="you@example.com"
                type="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                className="flex-1"
              />
              <FormField
                label="Phone Number"
                name="phone"
                placeholder="+1 (555) 000-0000"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                className="flex-1"
              />
            </div>

            <FormField
              label="Street Address"
              name="street"
              placeholder="123 Main Street, Apt 4B"
              value={form.street}
              onChange={handleChange}
              error={errors.street}
              className="w-full"
            />

            <div className="flex gap-4">
              <FormField
                label="City"
                name="city"
                placeholder="New York"
                value={form.city}
                onChange={handleChange}
                error={errors.city}
                className="flex-1"
              />
              <FormField
                label="State/Province"
                name="state"
                placeholder="NY"
                value={form.state}
                onChange={handleChange}
                error={errors.state}
                className="flex-1"
              />
              <FormField
                label="Zip Code"
                name="zip"
                placeholder="10001"
                value={form.zip}
                onChange={handleChange}
                error={errors.zip}
                className="flex-1"
              />
            </div>

            <SelectField
              label="Country"
              value="United States"
              className="w-full"
            />
          </section>

          {/* Payment Method */}
          <section className="flex flex-col gap-5">
            <h2 className="font-heading text-[18px] font-semibold text-[var(--color-primary)]">
              Payment Method
            </h2>

            {/* Payment Options */}
            <div className="flex gap-4">
              <button className="flex flex-col items-center justify-center gap-2 flex-1 h-[72px] p-4 border-2 border-[var(--color-accent)] bg-[#FEF2F1]">
                <CreditCard className="w-5 h-5 text-[var(--color-accent)]" />
                <span className="font-body text-[13px] font-medium text-[var(--color-primary)]">
                  Credit Card
                </span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 flex-1 h-[72px] p-4 border border-[var(--color-border)]">
                <Wallet className="w-5 h-5 text-[var(--color-secondary)]" />
                <span className="font-body text-[13px] font-medium text-[var(--color-secondary)]">
                  PayPal
                </span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 flex-1 h-[72px] p-4 border border-[var(--color-border)]">
                <Landmark className="w-5 h-5 text-[var(--color-secondary)]" />
                <span className="font-body text-[13px] font-medium text-[var(--color-secondary)]">
                  Bank Transfer
                </span>
              </button>
            </div>

            <FormField
              label="Card Number"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={form.cardNumber}
              onChange={handleChange}
              error={errors.cardNumber}
              icon={
                <CreditCard className="w-4 h-4 text-[var(--color-placeholder)]" />
              }
              className="w-full"
            />

            <div className="flex gap-4">
              <FormField
                label="Expiration Date"
                name="expDate"
                placeholder="MM / YY"
                value={form.expDate}
                onChange={handleChange}
                error={errors.expDate}
                className="flex-1"
              />
              <FormField
                label="CVV"
                name="cvv"
                placeholder="123"
                value={form.cvv}
                onChange={handleChange}
                error={errors.cvv}
                className="flex-1"
              />
            </div>

            <FormField
              label="Cardholder Name"
              name="cardHolder"
              placeholder="Name on card"
              value={form.cardHolder}
              onChange={handleChange}
              error={errors.cardHolder}
              className="w-full"
            />
          </section>

          {/* API Error */}
          {apiError && (
            <div className="flex items-center gap-2 p-3 border border-[var(--color-accent)] bg-[#FEF2F1]">
              <span className="font-body text-[13px] text-[var(--color-accent)]">
                {apiError}
              </span>
            </div>
          )}

          {/* Complete Order Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center gap-2 h-[52px] w-full bg-[var(--color-accent)] disabled:opacity-50"
          >
            <Lock className="w-4 h-4 text-white" />
            <span className="font-heading text-[14px] font-medium text-white">
              {loading ? "Processing..." : "Complete Order"}
            </span>
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-[400px] shrink-0 flex flex-col gap-6 p-8 border border-[var(--color-border)] self-start">
          <h2 className="font-heading text-[20px] font-semibold text-[var(--color-primary)]">
            Your Order
          </h2>

          <hr className="border-[var(--color-border)]" />

          {/* Order Items */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3"
              >
                <div className="w-14 h-14 bg-[#F5F5F5] shrink-0 overflow-hidden">
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
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                  {formatPrice(parsePrice(item.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-[var(--color-border)]" />

          {/* Price Rows */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-[14px] text-[var(--color-secondary)]">
                Subtotal
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
                Tax
              </span>
              <span className="font-heading text-[14px] font-medium text-[var(--color-primary)]">
                {formatPrice(tax)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <Tag className="w-[14px] h-[14px] text-[var(--color-accent)]" />
                <span className="font-body text-[14px] text-[var(--color-accent)]">
                  SUMMER2024 (15%)
                </span>
              </div>
              <span className="font-heading text-[14px] font-semibold text-[var(--color-accent)]">
                -{formatPrice(discount)}
              </span>
            </div>
          </div>

          <hr className="border-[var(--color-primary)] border-t-2" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="font-heading text-[18px] font-semibold text-[var(--color-primary)]">
              Total
            </span>
            <span className="font-heading text-[22px] font-semibold text-[var(--color-primary)] tracking-[-0.5px]">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
