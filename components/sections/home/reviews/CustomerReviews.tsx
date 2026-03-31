"use client";
import React, { useEffect, useMemo, useState } from "react";

type Review = {
	id: number;
	name: string;
	location: string;
	rating: number;
	review: string;
};

const reviews: Review[] = [
	{
		id: 1,
		name: "Nimali Perera",
		location: "Colombo",
		rating: 5,
		review:
			"I’ve been using Ayurra Herbal products for a few weeks now and I truly love the quality. The packaging feels premium and the results have been great.",
	},
	{
		id: 2,
		name: "Sahan Jayasinghe",
		location: "Kandy",
		rating: 5,
		review:
			"The capsules fit perfectly into my daily routine. I appreciate the natural ingredients and the overall trust this brand gives.",
	},
	{
		id: 3,
		name: "Dilini Fernando",
		location: "Galle",
		rating: 4,
		review:
			"Very clean branding and excellent customer experience. The product felt gentle and effective. I’ll definitely order again.",
	},
	{
		id: 4,
		name: "Tharindu Silva",
		location: "Kurunegala",
		rating: 5,
		review:
			"What stood out to me most was the consistency. The product quality, the design, and the fast delivery all felt very professional.",
	},
	{
		id: 5,
		name: "Sachini Ranathunga",
		location: "Negombo",
		rating: 5,
		review:
			"I bought this for daily wellness support and honestly I’m impressed. The formula feels natural and the product presentation is beautiful.",
	},
	{
		id: 6,
		name: "Ravindu De Zoysa",
		location: "Matara",
		rating: 4,
		review:
			"A very polished herbal brand. The reviews made me try it, and now I understand why people like it so much.",
	},
];

const chunkArray = <T,>(array: T[], size: number): T[][] => {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
};

const StarRating = ({ rating }: { rating: number }) => {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<span
					key={i}
					className={`text-sm ${i < rating ? "text-brand-gold-soft" : "text-brand-border-pill"}`}
				>
					★
				</span>
			))}
		</div>
	);
};

export default function CustomerReviews() {
	const [cardsPerSlide, setCardsPerSlide] = useState(3);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const updateCardsPerSlide = () => {
			if (window.innerWidth < 640) {
				setCardsPerSlide(1);
			} else if (window.innerWidth < 1024) {
				setCardsPerSlide(2);
			} else {
				setCardsPerSlide(3);
			}
		};

		updateCardsPerSlide();
		window.addEventListener("resize", updateCardsPerSlide);

		return () => window.removeEventListener("resize", updateCardsPerSlide);
	}, []);

	const slides = useMemo(
		() => chunkArray(reviews, cardsPerSlide),
		[cardsPerSlide],
	);
	const visibleSlide = Math.min(currentSlide, Math.max(slides.length - 1, 0));

	useEffect(() => {
		if (slides.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<section className="bg-brand-ivory-alt px-4 py-16 sm:px-6 lg:px-10">
			<div className="mx-auto max-w-7xl">
				<div className="mb-10 text-center">
					<p className="section-eyebrow text-brand-gold-soft mb-3">
						Customer Feedback
					</p>
					<h2 className="section-title text-brand-ink-muted">
						What Our Customers Say
					</h2>
					<p className="section-body text-brand-copy-secondary mx-auto mt-4 max-w-2xl leading-6">
						Real experiences from customers who trust our herbal wellness
						products in their daily routine.
					</p>
				</div>

				<div className="overflow-hidden">
					<div
						className="flex transition-transform duration-700 ease-in-out"
						style={{ transform: `translateX(-${visibleSlide * 100}%)` }}
					>
						{slides.map((slide, slideIndex) => (
							<div
								key={slideIndex}
								className="grid min-w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
							>
								{slide.map((item) => (
									<div
										key={item.id}
										className="border-brand-border rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
									>
										<StarRating rating={item.rating} />

										<p className="text-brand-copy-strong mt-4 text-sm leading-7 sm:text-base">
											“{item.review}”
										</p>

										<div className="border-brand-border-light mt-6 border-t pt-4">
											<h4 className="text-brand-ink-subtle text-base font-medium">
												{item.name}
											</h4>
											<p className="text-brand-copy-label-alt mt-1 text-sm">
												{item.location}
											</p>
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				{slides.length > 1 && (
					<div className="mt-8 flex items-center justify-center gap-3">
						{slides.map((_, index) => (
							<button
								key={index}
								type="button"
								aria-label={`Go to slide ${index + 1}`}
								onClick={() => setCurrentSlide(index)}
								className={`h-2.5 w-2.5 rounded-full transition-all ${
									visibleSlide === index
										? "bg-brand-gold-soft scale-110"
										: "bg-brand-border-indicator"
								}`}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
