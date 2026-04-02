"use client";

import Link from "next/link";
import { Epilogue } from "next/font/google";
import { useMemo, useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import RevealWrapper from "@/components/util/RevealWrapper";
import { formatLkr } from "@/lib/currency";

const epilogue = Epilogue({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

type FormState = {
	customerName: string;
	phoneNumber: string;
	address: string;
	city: string;
	paymentMethod: "Cash on Delivery";
	notes: string;
};

const initialFormState: FormState = {
	customerName: "",
	phoneNumber: "",
	address: "",
	city: "",
	paymentMethod: "Cash on Delivery",
	notes: "",
};

export default function CheckoutPageContent() {
	const { items, subtotal, itemCount, clearCart } = useCart();
	const [formState, setFormState] = useState(initialFormState);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [orderId, setOrderId] = useState("");

	const shipping = useMemo(
		() => (items.length === 0 || subtotal >= 45 ? 0 : 6.5),
		[items.length, subtotal],
	);
	const total = subtotal + shipping;

	const handleChange =
		(field: keyof FormState) =>
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormState((current) => ({
				...current,
				[field]: event.target.value,
			}));
		};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage("");
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formState,
					items: items.map((item) => ({
						name: item.name,
						slug: item.slug,
						price: item.price,
						quantity: item.quantity,
					})),
					subtotal,
					shipping,
					total,
				}),
			});

			const result = (await response.json()) as {
				error?: string;
				orderId?: string;
			};

			if (!response.ok || !result.orderId) {
				throw new Error(result.error || "Something went wrong.");
			}

			setOrderId(result.orderId);
			clearCart();
			setFormState(initialFormState);
		} catch (error) {
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Unable to place the order right now.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (orderId) {
		return (
			<section className="bg-brand-ivory-alt flex min-h-[85vh] items-center px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
				<div className="border-brand-border-soft bg-brand-paper mx-auto max-w-4xl rounded-[34px] border p-8 text-center shadow-[0_18px_50px_var(--shadow-black-03)] sm:p-12">
					<p className="section-eyebrow text-brand-gold">Order Saved</p>
					<h1
						className={`${epilogue.className} section-title text-brand-ink mt-3`}
					>
						Your order details were saved successfully.
					</h1>
					<p className="section-body text-brand-copy mx-auto mt-5 max-w-2xl">
						We received your order and saved it for processing. Your reference
						is <span className="text-brand-ink font-medium">{orderId}</span>.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<Link
							href="/shop"
							className="border-brand-gold bg-brand-gold hover:border-brand-gold-hover hover:bg-brand-gold-hover inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300"
						>
							Continue Shopping
						</Link>
						<Link
							href="/"
							className="border-brand-border-button text-brand-copy-ui hover:border-brand-gold hover:text-brand-gold inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300"
						>
							Return Home
						</Link>
					</div>
				</div>
			</section>
		);
	}

	if (items.length === 0) {
		return (
			<section className="bg-brand-ivory-alt flex min-h-[85vh] items-center px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
				<div className="border-brand-border-soft bg-brand-paper mx-auto max-w-4xl rounded-[34px] border p-8 text-center shadow-[0_18px_50px_var(--shadow-black-03)] sm:p-12">
					<p className="section-eyebrow text-brand-gold">Checkout</p>
					<h1
						className={`${epilogue.className} section-title text-brand-ink mt-3`}
					>
						Your cart is empty right now.
					</h1>
					<p className="section-body text-brand-copy mx-auto mt-5 max-w-2xl">
						Add a few products before moving to checkout so we can save the
						order details for you.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<Link
							href="/shop"
							className="border-brand-gold bg-brand-gold hover:border-brand-gold-hover hover:bg-brand-gold-hover inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300"
						>
							Visit Shop
						</Link>
						<Link
							href="/cart"
							className="border-brand-border-button text-brand-copy-ui hover:border-brand-gold hover:text-brand-gold inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300"
						>
							Back to Cart
						</Link>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-brand-ivory-alt min-h-[85vh] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
					<RevealWrapper direction="up" className="lg:flex-1">
						<p className="section-eyebrow text-brand-gold">Checkout Details</p>
						<h1
							className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}
						>
							Add your details and save the order for processing.
						</h1>
					</RevealWrapper>

					<RevealWrapper
						direction="left"
						delay={80}
						className="flex flex-wrap gap-3"
					>
						<div className="border-brand-border-highlight bg-brand-paper text-brand-copy-ui rounded-full border px-5 py-3 text-sm">
							<span className="text-brand-ink font-medium">{itemCount}</span>{" "}
							items
						</div>
						<div className="border-brand-border-highlight bg-brand-paper text-brand-copy-ui rounded-full border px-5 py-3 text-sm">
							Total {formatLkr(total)}
						</div>
					</RevealWrapper>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] xl:gap-10">
					<RevealWrapper direction="right" asChild>
						<div className="border-brand-border-soft bg-brand-paper rounded-4xl border p-7 shadow-[0_12px_35px_var(--shadow-black-03)] sm:p-8">
							<p className="section-eyebrow text-brand-gold">
								Customer Details
							</p>
							<h2
								className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}
							>
								Where should we send the order?
							</h2>

							<form className="mt-8 space-y-4" onSubmit={handleSubmit}>
								<div className="grid gap-4 sm:grid-cols-2">
									<input
										type="text"
										required
										value={formState.customerName}
										onChange={handleChange("customerName")}
										placeholder="Full name"
										className="border-brand-border-button bg-brand-ivory text-brand-ink placeholder:text-brand-copy-placeholder focus:border-brand-gold h-13 rounded-[20px] border px-5 text-sm transition duration-300 outline-none"
									/>
									<input
										type="tel"
										required
										value={formState.phoneNumber}
										onChange={handleChange("phoneNumber")}
										placeholder="Phone number"
										className="border-brand-border-button bg-brand-ivory text-brand-ink placeholder:text-brand-copy-placeholder focus:border-brand-gold h-13 rounded-[20px] border px-5 text-sm transition duration-300 outline-none"
									/>
								</div>

								<textarea
									required
									value={formState.address}
									onChange={handleChange("address")}
									placeholder="Delivery address"
									rows={5}
									className="border-brand-border-button bg-brand-ivory text-brand-ink placeholder:text-brand-copy-placeholder focus:border-brand-gold w-full rounded-3xl border px-5 py-4 text-sm transition duration-300 outline-none"
								/>

								<input
									type="text"
									required
									value={formState.city}
									onChange={handleChange("city")}
									placeholder="City"
									className="border-brand-border-button bg-brand-ivory text-brand-ink placeholder:text-brand-copy-placeholder focus:border-brand-gold h-13 w-full rounded-[20px] border px-5 text-sm transition duration-300 outline-none"
								/>

								<div className="border-brand-border-soft bg-brand-ivory rounded-3xl border px-5 py-5">
									<div className="flex flex-wrap items-center justify-between gap-3">
										<div>
											<p className="text-brand-ink text-sm font-medium">
												Payment Method
											</p>
											<p className="text-brand-copy mt-1 text-sm">
												Choose how the customer will complete payment.
											</p>
										</div>
									</div>

									<div className="mt-4 grid gap-3 sm:grid-cols-2">
										<label className="border-brand-gold bg-brand-paper rounded-[22px] border px-4 py-4">
											<div className="flex items-start gap-3">
												<input
													type="radio"
													name="paymentMethod"
													value="Cash on Delivery"
													checked={formState.paymentMethod === "Cash on Delivery"}
													onChange={handleChange("paymentMethod")}
													className="accent-brand-gold mt-1 h-4 w-4"
												/>
												<div>
													<p className="text-brand-ink text-sm font-medium">
														Cash on Delivery
													</p>
													<p className="text-brand-copy mt-1 text-sm leading-6">
														Collect payment when the order arrives.
													</p>
												</div>
											</div>
										</label>

										<div className="border-brand-border-button bg-brand-paper/70 rounded-[22px] border px-4 py-4 opacity-70">
											<div className="flex items-start gap-3">
												<input
													type="radio"
													name="paymentMethod"
													value="Card Payment"
													disabled
													checked={false}
													readOnly
													className="accent-brand-gold mt-1 h-4 w-4 cursor-not-allowed"
												/>
												<div>
													<p className="text-brand-ink text-sm font-medium">
														Card Payment (Coming Soon)
													</p>
													<p className="text-brand-copy mt-1 text-sm leading-6">
														Online card payments are not available yet. This
														option is coming soon.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								<textarea
									value={formState.notes}
									onChange={handleChange("notes")}
									placeholder="Order notes (optional)"
									rows={4}
									className="border-brand-border-button bg-brand-ivory text-brand-ink placeholder:text-brand-copy-placeholder focus:border-brand-gold w-full rounded-3xl border px-5 py-4 text-sm transition duration-300 outline-none"
								/>

								{errorMessage && (
									<p className="rounded-3xl border border-[#d7b7b2] bg-[#fff4f2] px-4 py-3 text-sm text-[#8c4f49]">
										{errorMessage}
									</p>
								)}

								<div className="flex flex-wrap gap-3">
									<button
										type="submit"
										disabled={isSubmitting}
										className="border-brand-gold bg-brand-gold hover:border-brand-gold-hover hover:bg-brand-gold-hover inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 disabled:cursor-not-allowed disabled:opacity-70"
									>
										{isSubmitting ? "Saving Order..." : "Save Order"}
									</button>
									<Link
										href="/cart"
										className="border-brand-border-button text-brand-copy-ui hover:border-brand-gold hover:text-brand-gold inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300"
									>
										Back to Cart
									</Link>
								</div>
							</form>
						</div>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={100} asChild>
						<aside className="border-brand-border-soft bg-brand-paper rounded-4xl border p-6 shadow-[0_18px_50px_var(--shadow-black-05)] sm:p-7">
							<p className="section-eyebrow text-brand-gold">Order Summary</p>
							<div className="mt-6 space-y-4">
								{items.map((item) => (
									<div
										key={item.slug}
										className="border-brand-border-soft bg-brand-ivory rounded-[22px] border p-4"
									>
										<div className="flex items-start justify-between gap-4">
											<div>
												<h3 className="text-brand-ink text-lg font-light capitalize">
													{item.name}
												</h3>
												<p className="text-brand-copy mt-1 text-sm">
													{item.quantity} x {formatLkr(item.price)}
												</p>
											</div>
											<p className="text-brand-ink text-base font-medium">
												{formatLkr(item.price * item.quantity)}
											</p>
										</div>
									</div>
								))}
							</div>

							<div className="border-brand-border-soft mt-6 space-y-4 border-t pt-6">
								<div className="text-brand-copy flex items-center justify-between text-sm">
									<span>Subtotal</span>
									<span className="text-brand-ink font-medium">
										{formatLkr(subtotal)}
									</span>
								</div>
								<div className="text-brand-copy flex items-center justify-between text-sm">
									<span>Delivery</span>
									<span className="text-brand-ink font-medium">
										{shipping === 0
											? "Complimentary"
											: formatLkr(shipping)}
									</span>
								</div>
							</div>

							<div className="border-brand-border-soft mt-6 border-t pt-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="section-eyebrow text-brand-copy-label">
											Total
										</p>
										<p className="text-brand-ink mt-2 text-3xl font-medium">
											{formatLkr(total)}
										</p>
									</div>
									<div className="border-brand-border-highlight bg-brand-ivory text-brand-copy-ui rounded-full border px-4 py-2 text-sm">
										{itemCount} items
									</div>
								</div>
								<p className="text-brand-copy mt-4 text-sm leading-7">
									Your order details will be saved into Google Sheets so you can
									process them manually. Right now, orders are placed with cash
									on delivery while card payment is being prepared.
								</p>
							</div>
						</aside>
					</RevealWrapper>
				</div>
			</div>
		</section>
	);
}
