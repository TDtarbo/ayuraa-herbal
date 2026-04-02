"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
	name: string;
	images: string[];
};

export default function ProductImageGallery({
	name,
	images,
}: ProductImageGalleryProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const activeImage = images[activeIndex] ?? images[0];

	return (
		<div className="border-brand-border-soft bg-brand-ivory relative h-full min-h-104 overflow-hidden rounded-4xl border shadow-[0_18px_50px_var(--shadow-black-05)] sm:min-h-120">
			<div className="absolute inset-0">
				<Image
					src={activeImage}
					alt={name}
					fill
					sizes="(min-width: 1024px) 42vw, 100vw"
					className="object-cover"
					priority
				/>
			</div>

			{images.length > 1 && (
				<div className="absolute inset-x-0 bottom-4 z-10 flex justify-center sm:bottom-5">
					<div className="inline-flex items-center gap-1.5 rounded-full bg-white/28 px-2.5 py-1.5 shadow-[0_12px_30px_var(--shadow-black-03)] backdrop-blur-md">
						{images.map((image, index) => {
							const isActive = index === activeIndex;

							return (
								<button
									key={`${image}-${index}`}
									type="button"
									onClick={() => setActiveIndex(index)}
									aria-label={`Show image ${index + 1} for ${name}`}
									aria-pressed={isActive}
									className={`focus-visible:outline-brand-gold inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
										isActive ? "bg-white/24" : "hover:bg-white/18"
									}`}
								>
									<span
										className={`h-2.5 w-2.5 rounded-full transition duration-300 ${
											isActive
												? "bg-brand-gold scale-110"
												: "border-brand-border-highlight bg-brand-ivory hover:border-brand-gold border"
										}`}
									/>
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
