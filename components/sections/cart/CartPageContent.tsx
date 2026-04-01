"use client";

import Image from "next/image";
import Link from "next/link";
import { Epilogue } from "next/font/google";
import { useState } from "react";
import { CiCircleMinus, CiCirclePlus, CiTrash } from "react-icons/ci";
import { useCart } from "@/components/providers/CartProvider";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import RevealWrapper from "@/components/util/RevealWrapper";

const epilogue = Epilogue({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export default function CartPageContent() {
	const [isClearCartDialogOpen, setIsClearCartDialogOpen] = useState(false);
	const [pendingRemovalSlug, setPendingRemovalSlug] = useState<string | null>(
		null,
	);
	const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } =
		useCart();

	const shipping = items.length === 0 || subtotal >= 45 ? 0 : 6.5;
	const total = subtotal + shipping;

	const handleConfirmClearCart = () => {
		clearCart();
		setIsClearCartDialogOpen(false);
	};

	const pendingRemovalItem = items.find(
		(item) => item.slug === pendingRemovalSlug,
	);

	const handleConfirmRemoveItem = () => {
		if (!pendingRemovalSlug) return;

		removeItem(pendingRemovalSlug);
		setPendingRemovalSlug(null);
	};

	if (items.length === 0) {
		return (
			<section className="bg-brand-ivory-alt min-h-[85vh] px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
				<div className="border-brand-border-soft bg-brand-paper mx-auto max-w-4xl rounded-4xl border p-8 text-center shadow-[0_18px_50px_var(--shadow-black-03)] sm:p-12">
					<p className="section-eyebrow text-brand-gold">Your Cart</p>
					<h1
						className={`${epilogue.className} section-title text-brand-ink mt-3`}
					>
						Your basket is waiting to be filled.
					</h1>
					<p className="section-body text-brand-copy mx-auto mt-4 max-w-2xl">
						Start with one of our herbal essentials and your cart will update
						here automatically with quantities, totals, and a cleaner checkout
						experience.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<Link
							href="/shop"
							className="border-brand-gold bg-brand-gold hover:border-brand-gold-hover hover:bg-brand-gold-hover inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300"
						>
							Shop Products
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

	return (
		<section className="bg-brand-ivory-alt min-h-[85vh] px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<RevealWrapper direction="up" className="lg:flex-1">
						<p className="section-eyebrow text-brand-gold">
							Your Wellness Cart
						</p>
						<h1
							className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}
						>
							Review your items without the extra scroll.
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
							{subtotal >= 45
								? "Free shipping unlocked"
								: "Free shipping over $45"}
						</div>
					</RevealWrapper>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] xl:gap-10">
					<div className="space-y-5">
						{items.map((item, index) => (
							<RevealWrapper
								key={item.slug}
								direction="rise"
								delay={Math.min(index * 70, 280)}
								asChild
							>
								<article className="border-brand-border-soft bg-brand-paper rounded-[28px] border p-5 shadow-[0_10px_30px_var(--shadow-black-03)] sm:p-6">
									<div className="flex flex-col gap-6 md:flex-row md:items-center">
										<div className="border-brand-border-soft bg-brand-ivory rounded-3xl border p-4 md:w-52">
											<div className="mx-auto flex h-36 w-full items-center justify-center sm:h-40">
												<Image
													src={item.image}
													alt={item.name}
													width={180}
													height={180}
													className="h-full w-auto object-contain"
												/>
											</div>
										</div>

										<div className="flex-1">
											<div className="flex flex-wrap items-center gap-3">
												<span className="border-brand-border-highlight bg-brand-ivory text-brand-gold rounded-full border px-3 py-1 text-[10px] tracking-[0.22em] uppercase">
													{item.category}
												</span>
												<span className="text-brand-copy-label text-sm">
													{item.size}
												</span>
											</div>

											<div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
												<div>
													<h2 className="text-brand-ink text-2xl font-light tracking-tight capitalize sm:text-[2rem]">
														{item.name}
													</h2>
													<p className="text-brand-copy mt-3 max-w-xl text-sm leading-7">
														{item.description}
													</p>
												</div>

												<div className="text-left lg:text-right">
													<p className="section-eyebrow text-brand-copy-label">
														Line Total
													</p>
													<p className="text-brand-ink mt-2 text-2xl font-medium">
														${(item.price * item.quantity).toFixed(2)}
													</p>
												</div>
											</div>

											<div className="border-brand-border-soft mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
												<div className="border-brand-border-soft bg-brand-ivory inline-flex items-center rounded-full border p-1">
													<button
														type="button"
														onClick={() =>
															updateQuantity(item.slug, item.quantity - 1)
														}
														className="text-brand-copy-ui hover:bg-brand-paper hover:text-brand-gold inline-flex h-10 w-10 items-center justify-center rounded-full transition duration-300"
														aria-label={`Decrease quantity for ${item.name}`}
													>
														<CiCircleMinus className="h-6 w-6" />
													</button>
													<span className="text-brand-ink min-w-12 text-center text-base font-medium">
														{item.quantity}
													</span>
													<button
														type="button"
														onClick={() =>
															updateQuantity(item.slug, item.quantity + 1)
														}
														className="text-brand-copy-ui hover:bg-brand-paper hover:text-brand-gold inline-flex h-10 w-10 items-center justify-center rounded-full transition duration-300"
														aria-label={`Increase quantity for ${item.name}`}
													>
														<CiCirclePlus className="h-6 w-6" />
													</button>
												</div>

												<div className="flex flex-wrap items-center gap-3">
													<Link
														href={`/products/${item.slug}`}
														className="border-brand-border-button text-brand-copy-ui hover:border-brand-gold hover:text-brand-gold inline-flex items-center justify-center rounded-full border px-5 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300"
													>
														View Product
													</Link>
													<button
														type="button"
														onClick={() => setPendingRemovalSlug(item.slug)}
														className="text-brand-copy-label hover:text-brand-gold inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-4 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300"
													>
														<CiTrash className="h-5 w-5" />
														Remove
													</button>
												</div>
											</div>
										</div>
									</div>
								</article>
							</RevealWrapper>
						))}
					</div>

					<RevealWrapper direction="left" delay={120} asChild>
						<aside className="lg:sticky lg:top-8 lg:self-start">
							<div className="border-brand-border-soft bg-brand-paper rounded-[30px] border p-6 shadow-[0_18px_50px_var(--shadow-black-05)] sm:p-7">
								<p className="section-eyebrow text-brand-gold">Order Summary</p>

								<div className="border-brand-border-soft mt-6 space-y-4 border-t pt-6">
									<div className="text-brand-copy flex items-center justify-between text-sm">
										<span>Subtotal</span>
										<span className="text-brand-ink font-medium">
											${subtotal.toFixed(2)}
										</span>
									</div>
									<div className="text-brand-copy flex items-center justify-between text-sm">
										<span>Delivery</span>
										<span className="text-brand-ink font-medium">
											{shipping === 0
												? "Complimentary"
												: `$${shipping.toFixed(2)}`}
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
												${total.toFixed(2)}
											</p>
										</div>
										<div className="border-brand-border-highlight bg-brand-ivory text-brand-copy-ui rounded-full border px-4 py-2 text-sm">
											{itemCount} items
										</div>
									</div>

									<Link
										href="/checkout"
										className="border-brand-gold bg-brand-gold hover:border-brand-gold-hover hover:bg-brand-gold-hover mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300"
									>
										Proceed to Checkout
									</Link>

									<Link
										href="/shop"
										className="border-brand-border-button text-brand-copy-ui hover:border-brand-gold hover:text-brand-gold mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300"
									>
										Continue Shopping
									</Link>

									<button
										type="button"
										onClick={() => setIsClearCartDialogOpen(true)}
										className="text-brand-copy-label hover:text-brand-gold mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-transparent px-7 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300"
									>
										Clear Cart
									</button>
								</div>
							</div>
						</aside>
					</RevealWrapper>
				</div>
			</div>

			<ConfirmationDialog
				isOpen={isClearCartDialogOpen}
				title="Clear your cart?"
				description="This will remove every product from your cart. You can keep shopping afterward, but the current selection will be lost."
				confirmLabel="Clear Cart"
				cancelLabel="Keep Items"
				tone="danger"
				onConfirm={handleConfirmClearCart}
				onClose={() => setIsClearCartDialogOpen(false)}
			/>

			<ConfirmationDialog
				isOpen={Boolean(pendingRemovalItem)}
				title={`Remove ${pendingRemovalItem?.name ?? "this item"}?`}
				description="This product will be removed from your cart. You can add it again later from the shop or product page."
				confirmLabel="Remove Item"
				cancelLabel="Keep Item"
				tone="danger"
				onConfirm={handleConfirmRemoveItem}
				onClose={() => setPendingRemovalSlug(null)}
			/>
		</section>
	);
}
