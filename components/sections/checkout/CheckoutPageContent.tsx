"use client";

import Link from "next/link";
import { Epilogue } from "next/font/google";
import { useMemo, useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import RevealWrapper from "@/components/util/RevealWrapper";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["300", "400", "500"] });

type FormState = {
	customerName: string;
	phoneNumber: string;
	address: string;
	email: string;
	notes: string;
};

const initialFormState: FormState = {
	customerName: "",
	phoneNumber: "",
	address: "",
	email: "",
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
		(
			event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		) => {
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
				<div className="mx-auto max-w-4xl rounded-[34px] border border-brand-border-soft bg-brand-paper p-8 text-center shadow-[0_18px_50px_var(--shadow-black-03)] sm:p-12">
					<p className="section-eyebrow text-brand-gold">Order Saved</p>
					<h1 className={`${epilogue.className} section-title text-brand-ink mt-3`}>
						Your order details were saved successfully.
					</h1>
					<p className="section-body text-brand-copy mx-auto mt-5 max-w-2xl">
						We saved this order to the local text file for now. Your reference is{" "}
						<span className="font-medium text-brand-ink">{orderId}</span>.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<Link
							href="/shop"
							className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
						>
							Continue Shopping
						</Link>
						<Link
							href="/"
							className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border-button px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
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
				<div className="mx-auto max-w-4xl rounded-[34px] border border-brand-border-soft bg-brand-paper p-8 text-center shadow-[0_18px_50px_var(--shadow-black-03)] sm:p-12">
					<p className="section-eyebrow text-brand-gold">Checkout</p>
					<h1 className={`${epilogue.className} section-title text-brand-ink mt-3`}>
						Your cart is empty right now.
					</h1>
					<p className="section-body text-brand-copy mx-auto mt-5 max-w-2xl">
						Add a few products before moving to checkout so we can save the
						order details for you.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<Link
							href="/shop"
							className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
						>
							Visit Shop
						</Link>
						<Link
							href="/cart"
							className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border-button px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
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
						<h1 className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}>
							Add your details and save the order for processing.
						</h1>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={80} className="flex flex-wrap gap-3">
						<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui">
							<span className="font-medium text-brand-ink">{itemCount}</span>{" "}
							items
						</div>
						<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui">
							Total ${total.toFixed(2)}
						</div>
					</RevealWrapper>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] xl:gap-10">
					<RevealWrapper direction="right" asChild>
						<div className="rounded-[32px] border border-brand-border-soft bg-brand-paper p-7 shadow-[0_12px_35px_var(--shadow-black-03)] sm:p-8">
							<p className="section-eyebrow text-brand-gold">Customer Details</p>
							<h2 className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}>
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
										className="h-13 rounded-[20px] border border-brand-border-button bg-brand-ivory px-5 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
									/>
									<input
										type="tel"
										required
										value={formState.phoneNumber}
										onChange={handleChange("phoneNumber")}
										placeholder="Phone number"
										className="h-13 rounded-[20px] border border-brand-border-button bg-brand-ivory px-5 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
									/>
								</div>

								<input
									type="email"
									value={formState.email}
									onChange={handleChange("email")}
									placeholder="Email address (optional)"
									className="h-13 w-full rounded-[20px] border border-brand-border-button bg-brand-ivory px-5 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
								/>

								<textarea
									required
									value={formState.address}
									onChange={handleChange("address")}
									placeholder="Delivery address"
									rows={5}
									className="w-full rounded-[24px] border border-brand-border-button bg-brand-ivory px-5 py-4 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
								/>

								<textarea
									value={formState.notes}
									onChange={handleChange("notes")}
									placeholder="Order notes (optional)"
									rows={4}
									className="w-full rounded-[24px] border border-brand-border-button bg-brand-ivory px-5 py-4 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
								/>

								{errorMessage && (
									<p className="rounded-[18px] border border-[#d7b7b2] bg-[#fff4f2] px-4 py-3 text-sm text-[#8c4f49]">
										{errorMessage}
									</p>
								)}

								<div className="flex flex-wrap gap-3">
									<button
										type="submit"
										disabled={isSubmitting}
										className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover disabled:cursor-not-allowed disabled:opacity-70"
									>
										{isSubmitting ? "Saving Order..." : "Save Order"}
									</button>
									<Link
										href="/cart"
										className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border-button px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
									>
										Back to Cart
									</Link>
								</div>
							</form>
						</div>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={100} asChild>
						<aside className="rounded-[32px] border border-brand-border-soft bg-brand-paper p-6 shadow-[0_18px_50px_var(--shadow-black-05)] sm:p-7">
							<p className="section-eyebrow text-brand-gold">Order Summary</p>
							<div className="mt-6 space-y-4">
								{items.map((item) => (
									<div
										key={item.slug}
										className="rounded-[22px] border border-brand-border-soft bg-brand-ivory p-4"
									>
										<div className="flex items-start justify-between gap-4">
											<div>
												<h3 className="text-lg font-light text-brand-ink capitalize">
													{item.name}
												</h3>
												<p className="mt-1 text-sm text-brand-copy">
													{item.quantity} x ${item.price.toFixed(2)}
												</p>
											</div>
											<p className="text-base font-medium text-brand-ink">
												${(item.price * item.quantity).toFixed(2)}
											</p>
										</div>
									</div>
								))}
							</div>

							<div className="border-brand-border-soft mt-6 space-y-4 border-t pt-6">
								<div className="flex items-center justify-between text-sm text-brand-copy">
									<span>Subtotal</span>
									<span className="font-medium text-brand-ink">
										${subtotal.toFixed(2)}
									</span>
								</div>
								<div className="flex items-center justify-between text-sm text-brand-copy">
									<span>Delivery</span>
									<span className="font-medium text-brand-ink">
										{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}
									</span>
								</div>
							</div>

							<div className="border-brand-border-soft mt-6 border-t pt-6">
								<div className="flex items-center justify-between">
									<div>
										<p className="section-eyebrow text-brand-copy-label">Total</p>
										<p className="mt-2 text-3xl font-medium text-brand-ink">
											${total.toFixed(2)}
										</p>
									</div>
									<div className="rounded-full border border-brand-border-highlight bg-brand-ivory px-4 py-2 text-sm text-brand-copy-ui">
										{itemCount} items
									</div>
								</div>
								<p className="mt-4 text-sm leading-7 text-brand-copy">
									For now, this checkout saves the order details into a local text
									file so you can process it manually before connecting Google
									Sheets later.
								</p>
							</div>
						</aside>
					</RevealWrapper>
				</div>
			</div>
		</section>
	);
}
