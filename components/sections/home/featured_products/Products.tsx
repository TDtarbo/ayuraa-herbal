"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const categories = ["All", "Herbal Blends", "Single Herbs", "Adaptogens"];

const products = [
	{
		id: 1,
		slug: "ashwagandha-capsules",
		name: "ashwagandha capsules",
		category: "Adaptogens",
		price: 12.99,
		rating: 4,
		image: "/images/hero3.png",
		featured: true,
		description:
			"A natural herbal supplement traditionally used to support vitality, balance, and everyday wellness.",
		details: [
			"supports daily wellness",
			"traditionally used for vitality",
			"60 capsules per bottle",
		],
	},
	{
		id: 2,
		slug: "neem-capsules",
		name: "neem capsules",
		category: "Single Herbs",
		price: 12.99,
		rating: 4,
		image: "/images/hero2.png",
	},
	{
		id: 3,
		slug: "gluco-aid-capsules",
		name: "gluco-aid capsules",
		category: "Herbal Blends",
		price: 12.99,
		rating: 4,
		image: "/images/hero1.png",
	},
	{
		id: 4,
		slug: "immuno-aid-capsules",
		name: "immuno-aid capsules",
		category: "Herbal Blends",
		price: 12.99,
		rating: 4,
		image: "/images/hero3.png",
	},
	{
		id: 5,
		slug: "immuno-aid-capsules-2",
		name: "immuno-aid capsules",
		category: "Herbal Blends",
		price: 12.99,
		rating: 4,
		image: "/images/hero3.png",
	},
];

function Stars({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }).map((_, index) => (
				<span
					key={index}
					className={`text-sm leading-none ${
						index < rating ? "text-[#b79d67]" : "text-[#ddd6c9]"
					}`}
				>
					★
				</span>
			))}
		</div>
	);
}

export default function FeaturedProductsSection() {
	const [activeCategory, setActiveCategory] = useState("All");

	const featuredProduct =
		products.find((product) => product.featured) || products[0];

	const filteredProducts = useMemo(() => {
		if (activeCategory === "All") return products;
		return products.filter((product) => product.category === activeCategory);
	}, [activeCategory]);

	return (
		<section className="bg-[#f8f5ef]">
			{/* Top Seller */}
			<div className="border-t border-[#e3ddd2]">
				<div className="grid lg:grid-cols-2">
					<Link
						href={`/products/${featuredProduct.slug}`}
						className="group flex items-center justify-center border-b border-[#e3ddd2] bg-[#f3efe7] px-8 py-14 md:px-12 md:py-16 lg:min-h-190 lg:border-r lg:border-b-0"
					>
						<div className="relative flex w-full items-center justify-center">
							<div className="absolute inset-x-10 inset-y-10 rounded-full border border-[#e8e1d3] opacity-70" />
							<Image
								src={featuredProduct.image}
								alt={featuredProduct.name}
								width={700}
								height={700}
								className="relative h-65 w-auto object-contain transition duration-500 group-hover:scale-[1.03] sm:h-85 md:h-105 lg:h-130"
							/>
						</div>
					</Link>

					<div className="bg-[#f7f4ed]">
						<div className="flex h-full flex-col justify-center px-6 py-14 sm:px-8 md:px-12 lg:px-14 xl:px-20">
							<div className="mb-6 flex items-center gap-4">
								<span className="h-px w-12 bg-[#b79d67]" />
								<p className="text-[11px] tracking-[0.32em] text-[#b79d67] uppercase sm:text-xs">
									Top Seller
								</p>
							</div>

							<h2 className="max-w-xl text-4xl leading-[1.02] font-light tracking-tight text-[#26231f] capitalize sm:text-5xl lg:text-6xl">
								{featuredProduct.name}
							</h2>

							<div className="mt-6 flex items-center gap-3">
								<Stars rating={featuredProduct.rating} />
								<span className="text-sm text-[#8d8579]">(128 reviews)</span>
							</div>

							<p className="mt-8 max-w-xl text-base leading-8 text-[#6f685d] md:text-lg">
								{featuredProduct.description}
							</p>

							<div className="mt-10 grid border border-[#e3ddd2] bg-[#fbf9f4] sm:grid-cols-3">
								{featuredProduct.details?.map((item) => (
									<div
										key={item}
										className="border-b border-[#e3ddd2] px-5 py-6 last:border-b-0 sm:border-r sm:border-b-0 last:sm:border-r-0"
									>
										<span className="mb-3 block h-px w-8 bg-[#b79d67]" />
										<p className="text-[11px] leading-5 tracking-[0.18em] text-[#5f594f] uppercase">
											{item}
										</p>
									</div>
								))}
							</div>

							<div className="mt-10 flex flex-col gap-8 border-t border-[#e3ddd2] pt-8 sm:flex-row sm:items-end sm:justify-between">
								<div>
									<p className="text-[11px] tracking-[0.24em] text-[#9b9488] uppercase">
										Price
									</p>
									<p className="mt-2 text-3xl font-medium text-[#26231f]">
										${featuredProduct.price.toFixed(2)}
									</p>
								</div>

								<div className="flex flex-wrap gap-3">
									<Link
										href={`/products/${featuredProduct.slug}`}
										className="inline-flex items-center justify-center border border-[#b79d67] bg-[#b79d67] px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition hover:border-[#a88d56] hover:bg-[#a88d56]"
									>
										Shop Now
									</Link>

									<Link
										href={`/products/${featuredProduct.slug}`}
										className="inline-flex items-center justify-center border border-[#d5cebf] bg-transparent px-7 py-3 text-[11px] tracking-[0.24em] text-[#4d473f] uppercase transition hover:border-[#b79d67] hover:text-[#b79d67]"
									>
										View Details
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Featured Products Grid */}
			<div className="bg-[#fcfaf6] px-4 py-30 sm:px-6 md:px-8 lg:px-12 xl:px-20">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 text-center">
						<div className="mb-4 flex items-center justify-center gap-4">
							<span className="h-px w-10 bg-[#b79d67] sm:w-12" />
							<p className="text-[11px] tracking-[0.32em] text-[#b79d67] uppercase sm:text-xs">
								Curated Selection
							</p>
							<span className="h-px w-10 bg-[#b79d67] sm:w-12" />
						</div>

						<h3 className="text-3xl font-light tracking-tight text-[#26231f] sm:text-4xl lg:text-5xl">
							Featured Products
						</h3>

						<p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#7b7468] sm:text-base">
							Discover our carefully selected herbal essentials, crafted for
							everyday wellness with a refined, natural touch.
						</p>
					</div>

					{/* Categories */}
					<div className="mb-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8">
						{categories.map((category) => {
							const isActive = activeCategory === category;

							return (
								<button
									key={category}
									onClick={() => setActiveCategory(category)}
									className={`relative pb-2 text-[11px] tracking-[0.24em] uppercase transition sm:text-xs ${
										isActive
											? "text-[#2b2722]"
											: "text-[#a19a8c] hover:text-[#6a6459]"
									}`}
								>
									{category}
									<span
										className={`absolute top-full left-0 h-px transition-all duration-300 ${
											isActive ? "w-full bg-[#b79d67]" : "w-0 bg-transparent"
										}`}
									/>
								</button>
							);
						})}
					</div>

					{/* Cards */}
					<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{filteredProducts.map((product, index) => (
							<Link
								key={product.id}
								href={`/products/${product.slug}`}
								className="group block"
							>
								<article className="relative flex h-full flex-col rounded-[22px] border border-[#e6dfd2] bg-[#f7f4ed] px-6 pt-7 pb-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] sm:px-7">
									{index === 0 && (
										<div className="absolute top-0 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
											<span className="inline-flex rounded-full border border-[#cdb98c] bg-[#b79d67] px-4 py-2 text-[10px] tracking-[0.24em] text-white uppercase shadow-sm">
												Top Seller
											</span>
										</div>
									)}

									<div className="flex min-h-65 items-center justify-center sm:min-h-75">
										<Image
											src={product.image}
											alt={product.name}
											width={260}
											height={260}
											className="h-52.5 w-auto object-contain transition duration-500 group-hover:scale-[1.04] sm:h-57.5"
										/>
									</div>

									<div className="mt-2 flex justify-center">
										<Stars rating={product.rating} />
									</div>

									<h4 className="mt-5 text-2xl leading-tight font-light text-[#26231f] capitalize sm:text-[2rem]">
										{product.name}
									</h4>

									<p className="mt-4 text-xl font-medium text-[#26231f] sm:text-2xl">
										${product.price.toFixed(2)}
									</p>

									<div className="mt-auto pt-7">
										<span className="inline-flex min-w-45 items-center justify-center rounded-full border border-[#b79d67] bg-[#b79d67] px-6 py-3 text-[11px] tracking-[0.2em] text-white uppercase transition duration-300 group-hover:border-[#a88d56] group-hover:bg-[#a88d56]">
											View Product
										</span>
									</div>
								</article>
							</Link>
						))}

						<Link href="/products" className="group block">
							<article className="flex h-full flex-col items-center justify-center rounded-[22px] border border-dashed border-[#ddd5c7] bg-[#fbf8f2] px-6 py-12 text-center shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition duration-300 hover:-translate-y-1 hover:border-[#b79d67] hover:shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
								<div className="mb-6 text-4xl text-[#b79d67] transition duration-300 group-hover:translate-x-1">
									→
								</div>

								<h4 className="text-2xl leading-tight font-light text-[#26231f]">
									Explore Our
									<br />
									Full Collection
								</h4>

								<p className="mt-3 text-sm leading-7 text-[#7c7569]">
									Discover all herbal products
								</p>

								<span className="mt-6 border-b border-transparent pb-1 text-[11px] tracking-[0.22em] text-[#5f594f] uppercase transition group-hover:border-[#b79d67] group-hover:text-[#b79d67]">
									Go to Shop
								</span>
							</article>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
