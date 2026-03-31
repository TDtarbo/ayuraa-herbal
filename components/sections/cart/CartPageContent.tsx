"use client";

import Image from "next/image";
import Link from "next/link";
import { Epilogue } from "next/font/google";
import { useState } from "react";
import { CiCircleMinus, CiCirclePlus, CiTrash } from "react-icons/ci";
import { useCart } from "@/components/providers/CartProvider";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import RevealWrapper from "@/components/util/RevealWrapper";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function CartPageContent() {
	const [isClearCartDialogOpen, setIsClearCartDialogOpen] = useState(false);
	const [pendingRemovalSlug, setPendingRemovalSlug] = useState<string | null>(null);
	const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } =
		useCart();

	const shipping = items.length === 0 || subtotal >= 45 ? 0 : 6.5;
	const total = subtotal + shipping;

	const handleConfirmClearCart = () => {
		clearCart();
		setIsClearCartDialogOpen(false);
	};

	const pendingRemovalItem = items.find((item) => item.slug === pendingRemovalSlug);

	const handleConfirmRemoveItem = () => {
		if (!pendingRemovalSlug) return;

		removeItem(pendingRemovalSlug);
		setPendingRemovalSlug(null);
	};

	if (items.length === 0) {
		return (
			<section className="min-h-[85vh] bg-brand-ivory-alt px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
				<div className="mx-auto max-w-4xl rounded-[32px] border border-brand-border-soft bg-brand-paper p-8 text-center shadow-[0_18px_50px_var(--shadow-black-03)] sm:p-12">
					<p className="section-eyebrow text-brand-gold">Your Cart</p>
					<h1 className={`${epilogue.className} section-title text-brand-ink mt-3`}>
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
							className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
						>
							Shop Products
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

	return (
		<section className="min-h-[85vh] bg-brand-ivory-alt px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<RevealWrapper direction="up" className="lg:flex-1">
						<p className="section-eyebrow text-brand-gold">Your Wellness Cart</p>
						<h1 className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}>
							Review your items without the extra scroll.
						</h1>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={80} className="flex flex-wrap gap-3">
						<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui">
							<span className="font-medium text-brand-ink">{itemCount}</span>{" "}
							items
						</div>
						<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui">
							{subtotal >= 45 ? "Free shipping unlocked" : "Free shipping over $45"}
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
								<article className="rounded-[28px] border border-brand-border-soft bg-brand-paper p-5 shadow-[0_10px_30px_var(--shadow-black-03)] sm:p-6">
								<div className="flex flex-col gap-6 md:flex-row md:items-center">
									<div className="rounded-[24px] border border-brand-border-soft bg-brand-ivory p-4 md:w-52">
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
											<span className="rounded-full border border-brand-border-highlight bg-brand-ivory px-3 py-1 text-[10px] tracking-[0.22em] text-brand-gold uppercase">
												{item.category}
											</span>
											<span className="text-sm text-brand-copy-label">
												{item.size}
											</span>
										</div>

										<div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
											<div>
												<h2 className="text-2xl font-light tracking-tight text-brand-ink capitalize sm:text-[2rem]">
													{item.name}
												</h2>
												<p className="mt-3 max-w-xl text-sm leading-7 text-brand-copy">
													{item.description}
												</p>
											</div>

											<div className="text-left lg:text-right">
												<p className="section-eyebrow text-brand-copy-label">Line Total</p>
												<p className="mt-2 text-2xl font-medium text-brand-ink">
													${(item.price * item.quantity).toFixed(2)}
												</p>
											</div>
										</div>

										<div className="border-brand-border-soft mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
											<div className="inline-flex items-center rounded-full border border-brand-border-soft bg-brand-ivory p-1">
												<button
													type="button"
													onClick={() =>
														updateQuantity(item.slug, item.quantity - 1)
													}
													className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-copy-ui transition duration-300 hover:bg-brand-paper hover:text-brand-gold"
													aria-label={`Decrease quantity for ${item.name}`}
												>
													<CiCircleMinus className="h-6 w-6" />
												</button>
												<span className="min-w-12 text-center text-base font-medium text-brand-ink">
													{item.quantity}
												</span>
												<button
													type="button"
													onClick={() =>
														updateQuantity(item.slug, item.quantity + 1)
													}
													className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-copy-ui transition duration-300 hover:bg-brand-paper hover:text-brand-gold"
													aria-label={`Increase quantity for ${item.name}`}
												>
													<CiCirclePlus className="h-6 w-6" />
												</button>
											</div>

											<div className="flex flex-wrap items-center gap-3">
												<Link
													href={`/products/${item.slug}`}
													className="inline-flex items-center justify-center rounded-full border border-brand-border-button px-5 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
												>
													View Product
												</Link>
												<button
													type="button"
													onClick={() => setPendingRemovalSlug(item.slug)}
													className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-4 py-3 text-[11px] tracking-[0.24em] text-brand-copy-label uppercase transition duration-300 hover:text-brand-gold"
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
						<div className="rounded-[30px] border border-brand-border-soft bg-brand-paper p-6 shadow-[0_18px_50px_var(--shadow-black-05)] sm:p-7">
							<p className="section-eyebrow text-brand-gold">Order Summary</p>

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

								<Link
									href="/checkout"
									className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
								>
									Proceed to Checkout
								</Link>

								<Link
									href="/shop"
									className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-brand-border-button px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
								>
									Continue Shopping
								</Link>

								<button
									type="button"
									onClick={() => setIsClearCartDialogOpen(true)}
									className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-transparent px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-label uppercase transition duration-300 hover:text-brand-gold"
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
