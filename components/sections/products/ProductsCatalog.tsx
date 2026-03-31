"use client";

import Image from "next/image";
import Link from "next/link";
import { Epilogue } from "next/font/google";
import { useMemo, useState } from "react";
import RevealWrapper from "@/components/util/RevealWrapper";
import { productCategories, products } from "@/lib/products";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["300", "400", "500"] });

function Stars({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }).map((_, index) => (
				<span
					key={index}
					className={`text-sm leading-none ${
						index < rating ? "text-brand-gold" : "text-brand-border-accent"
					}`}
				>
					★
				</span>
			))}
		</div>
	);
}

export default function ProductsCatalog() {
	const [activeCategory, setActiveCategory] = useState("All");

	const filteredProducts = useMemo(() => {
		if (activeCategory === "All") return products;

		return products.filter((product) => product.category === activeCategory);
	}, [activeCategory]);

	return (
		<section className="bg-brand-ivory-alt px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
			<div className="mx-auto max-w-7xl">
				<div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<RevealWrapper direction="up" className="lg:flex-1">
						<p className="section-eyebrow text-brand-gold">Herbal Collection</p>
						<h1 className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}>
							Shop products without the extra scroll.
						</h1>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={80} className="flex flex-wrap gap-3">
						<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui shadow-[0_10px_25px_var(--shadow-black-03)]">
							<span className="font-medium text-brand-ink">{products.length}</span>{" "}
							products
						</div>
						<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui shadow-[0_10px_25px_var(--shadow-black-03)]">
							<span className="font-medium text-brand-ink">
								{productCategories.length - 1}
							</span>{" "}
							categories
						</div>
					</RevealWrapper>
				</div>

				<RevealWrapper direction="up" delay={120} className="mb-8 flex flex-wrap gap-3">
					{productCategories.map((category) => {
						const isActive = activeCategory === category;

						return (
							<button
								key={category}
								type="button"
								onClick={() => setActiveCategory(category)}
								className={`rounded-full border px-5 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300 ${
									isActive
										? "border-brand-gold bg-brand-gold text-white"
										: "border-brand-border-button bg-brand-paper text-brand-copy-ui hover:border-brand-gold hover:text-brand-gold"
								}`}
							>
								{category}
							</button>
						);
					})}
				</RevealWrapper>

				<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
					{filteredProducts.map((product, index) => (
						<RevealWrapper
							key={product.id}
							direction="rise"
							delay={Math.min(index * 70, 280)}
							asChild
						>
							<Link href={`/products/${product.slug}`} className="group block">
								<article className="flex h-full flex-col rounded-[28px] border border-brand-border-soft bg-brand-paper p-6 shadow-[0_10px_30px_var(--shadow-black-03)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_var(--shadow-black-05)]">
								<div className="rounded-[24px] bg-brand-ivory p-5">
									<div className="relative flex min-h-56 items-center justify-center">
										<Image
											src={product.image}
											alt={product.name}
											width={280}
											height={280}
											className="h-48 w-auto object-contain transition duration-500 group-hover:scale-[1.04]"
										/>
									</div>
								</div>

								<div className="mt-5 flex items-center justify-between gap-4">
									<span className="rounded-full border border-brand-border-highlight bg-brand-ivory px-3 py-1 text-[10px] tracking-[0.22em] text-brand-gold uppercase">
										{product.category}
									</span>
									<Stars rating={product.rating} />
								</div>

								<h3 className="mt-5 text-2xl leading-tight font-light text-brand-ink capitalize sm:text-[2rem]">
									{product.name}
								</h3>
								<p className="mt-3 text-sm leading-7 text-brand-copy">
									{product.description}
								</p>

								<div className="mt-5 grid gap-2 text-sm text-brand-copy-soft">
									<div className="flex items-center justify-between gap-4">
										<span>Format</span>
										<span className="font-medium text-brand-copy-ui">
											{product.format}
										</span>
									</div>
									<div className="flex items-center justify-between gap-4">
										<span>Size</span>
										<span className="font-medium text-brand-copy-ui">
											{product.size}
										</span>
									</div>
								</div>

								<div className="mt-auto flex items-end justify-between gap-4 pt-7">
									<div>
										<p className="section-eyebrow text-brand-copy-label">Price</p>
										<p className="mt-2 text-2xl font-medium text-brand-ink">
											${product.price.toFixed(2)}
										</p>
									</div>
									<span className="inline-flex items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-5 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 group-hover:border-brand-gold-hover group-hover:bg-brand-gold-hover">
										View Details
									</span>
								</div>
								</article>
							</Link>
						</RevealWrapper>
					))}
				</div>
			</div>
		</section>
	);
}
