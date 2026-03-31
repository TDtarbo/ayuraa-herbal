import { Epilogue } from "next/font/google";
import Image from "next/image";
import RevealWrapper from "@/components/util/RevealWrapper";

const epilogue = Epilogue({ subsets: ["latin"], weight: "300" });

const certificationsData = [
	{
		name: "ISO 9001",
		image: "/images/certifications/iso.png",
		description:
			"International quality management standard for consistent processes.",
	},
	{
		name: "HACCP",
		image: "/images/certifications/haccp.png",
		description:
			"A recognized system focused on product safety and controlled handling.",
	},
	{
		name: "GMP",
		image: "/images/certifications/gmp.png",
		description:
			"Good manufacturing practices that support quality and reliability.",
	},
];

const Certifications = () => {
	return (
		<section className="bg-brand-ivory relative overflow-hidden">
			<Image
				src="/images/icon-dark.png"
				alt="Certifications Background"
				width={500}
				height={500}
				className="absolute top-12 right-0 h-auto w-40 object-contain opacity-[0.04] sm:w-56 lg:top-16 lg:w-96"
			/>

			<div className="mx-auto max-w-400 px-4 py-20 sm:px-6 lg:px-10 lg:py-24">
				<div className="mb-14 text-center sm:mb-16">
					<div className="mb-4 flex items-center justify-center gap-4">
						<span className="bg-brand-gold h-px w-10 sm:w-12" />
						<p className="text-brand-gold text-[11px] tracking-[0.32em] uppercase sm:text-xs">
							Certified Quality
						</p>
						<span className="bg-brand-gold h-px w-10 sm:w-12" />
					</div>

					<h2
						className={`${epilogue.className} text-brand-ink text-3xl leading-tight font-light tracking-tight sm:text-4xl lg:text-5xl`}
					>
						Trusted Standards Behind
						<span className="text-brand-gold mt-2 block">Every Product</span>
					</h2>

					<p className="text-brand-copy-soft mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base">
						Our herbal products are developed with care and supported by
						recognized standards in quality, safety, and manufacturing
						excellence.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{certificationsData.map((certification, index) => (
						<RevealWrapper
							key={certification.name}
							direction="up"
							delay={index * 120}
						>
							<article className="border-brand-border-strong bg-brand-ivory-muted hover:border-brand-border-highlight group flex h-full flex-col rounded-[22px] border px-6 py-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] sm:px-7 sm:py-12">
								<div className="mx-auto mb-6 flex h-27.5 items-center justify-center sm:h-30">
									<Image
										src={certification.image}
										alt={certification.name}
										width={200}
										height={200}
										className="h-24 w-auto object-contain transition duration-300 group-hover:scale-[1.03] sm:h-28"
									/>
								</div>

								<div className="mb-4 flex items-center justify-center gap-3">
									<span className="bg-brand-gold h-px w-8" />
									<span className="text-brand-gold text-[10px] tracking-[0.24em] uppercase">
										Certified
									</span>
									<span className="bg-brand-gold h-px w-8" />
								</div>

								<h3 className="text-brand-ink text-2xl font-light tracking-tight">
									{certification.name}
								</h3>

								<p className="text-brand-copy mx-auto mt-4 max-w-xs text-sm leading-7 sm:text-[15px]">
									{certification.description}
								</p>
							</article>
						</RevealWrapper>
					))}
				</div>
			</div>
		</section>
	);
};

export default Certifications;
