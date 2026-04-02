"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useCart } from "@/components/providers/CartProvider";
import ActionToast from "@/components/ui/ActionToast";
import { formatLkr } from "@/lib/currency";
import type { Product } from "@/lib/products";

type ProductPurchaseControlsProps = {
	product: Product;
};

export default function ProductPurchaseControls({
	product,
}: ProductPurchaseControlsProps) {
	const [quantity, setQuantity] = useState(1);
	const [isToastOpen, setIsToastOpen] = useState(false);
	const { addItem } = useCart();

	const total = useMemo(() => product.price * quantity, [product.price, quantity]);

	useEffect(() => {
		if (!isToastOpen) return;

		const timeout = window.setTimeout(() => {
			setIsToastOpen(false);
		}, 3200);

		return () => window.clearTimeout(timeout);
	}, [isToastOpen]);

	const handleAddToCart = () => {
		addItem(product, quantity);
		setIsToastOpen(true);
	};

	return (
		<>
			<div className="mt-10 rounded-[28px] border border-brand-border-soft bg-brand-paper p-5 shadow-[0_10px_30px_var(--shadow-black-03)] sm:p-6">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="section-eyebrow text-brand-gold">Choose Quantity</p>
						<div className="mt-4 inline-flex items-center rounded-full border border-brand-border-soft bg-brand-ivory p-1">
							<button
								type="button"
								onClick={() => setQuantity((current) => Math.max(1, current - 1))}
								className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-copy-ui transition duration-300 hover:bg-brand-paper hover:text-brand-gold"
								aria-label="Decrease quantity"
							>
								<CiCircleMinus className="h-6 w-6" />
							</button>
							<span className="min-w-12 text-center text-lg font-medium text-brand-ink">
								{quantity}
							</span>
							<button
								type="button"
								onClick={() => setQuantity((current) => current + 1)}
								className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-copy-ui transition duration-300 hover:bg-brand-paper hover:text-brand-gold"
								aria-label="Increase quantity"
							>
								<CiCirclePlus className="h-6 w-6" />
							</button>
						</div>
					</div>

					<div className="text-left sm:text-right">
						<p className="section-eyebrow text-brand-copy-label">Estimated Total</p>
						<p className="mt-2 text-3xl font-medium text-brand-ink">
							{formatLkr(total)}
						</p>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap gap-3">
					<button
						type="button"
						onClick={handleAddToCart}
						className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
					>
						Add {quantity} to Cart
					</button>
					<Link
						href="/shop"
						className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border-button px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
					>
						Back to Shop
					</Link>
				</div>
			</div>

			<ActionToast
				isOpen={isToastOpen}
				title={`${quantity} ${quantity === 1 ? "item" : "items"} added`}
				description={`${product.name} has been added to your cart. You can keep browsing or open the cart whenever you're ready.`}
				actionLabel="View Cart"
				actionHref="/cart"
				onClose={() => setIsToastOpen(false)}
			/>
		</>
	);
}
