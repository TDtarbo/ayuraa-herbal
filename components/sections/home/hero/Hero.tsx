import Link from "next/link";
import { Epilogue } from "next/font/google";
import Image from "next/image";

const epilogue = Epilogue({ subsets: ["latin"], weight: "400" });
const epilogueLight = Epilogue({ subsets: ["latin"], weight: "300" });

const Hero = () => {
	return (
		<section className="bg-brand-ivory relative">
			<div className="mx-auto grid min-h-[85vh] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.15fr_0.95fr]">
				{/* Right Visual Panel (FIRST on mobile) */}
				<div className="bg-brand-ivory-deep relative order-1 min-h-100 lg:order-2 lg:min-h-0">
					{/* Mobile / vertical breakpoint image */}
					<div
						className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:hidden"
						style={{
							backgroundImage: "url('/images/hero23.png')",
						}}
					/>

					{/* Desktop image */}
					<div
						className="absolute inset-0 hidden bg-cover bg-right bg-no-repeat lg:block lg:bg-position-[80%] xl:bg-right"
						style={{
							backgroundImage: "url('/images/hero22.png')",
						}}
					/>

					<div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
						<div className="border-brand-border-highlight bg-brand-paper/95 rounded-full border px-4 py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.05)] backdrop-blur-sm sm:px-5">
							<p className="text-brand-copy-label-warm text-[10px] tracking-[0.24em] uppercase sm:text-[11px]">
								100% Natural
							</p>
						</div>
					</div>
				</div>

				{/* Left Content Panel (SECOND on mobile, centered) */}
				<div className="bg-brand-ivory relative order-2 flex items-center justify-center px-5 py-10 sm:px-8 md:px-15 lg:order-1 lg:justify-start lg:px-12 lg:pt-20 xl:px-16 2xl:translate-x-[5%] 2xl:px-22">
					<div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
						<div className="mb-5 flex items-center justify-center gap-4 lg:justify-start">
							<span className="bg-brand-gold h-px w-10" />
							<p className="section-eyebrow text-brand-gold">
								Pure Herbal Wellness
							</p>
						</div>

						<h1
							className={`${epilogue.className} hero-display-title text-brand-ink`}
						>
							The power of nature,
							<span className="text-brand-olive-soft mt-1 block">
								refined for
							</span>
							<span className="block">everyday care.</span>
						</h1>

						<div className="my-5 flex w-full max-w-90 justify-center sm:max-w-110 md:max-w-130 lg:max-w-115 lg:justify-start xl:max-w-135">
							<Image
								src="/logos/logo_v3.svg"
								alt="Ayurra Herbal"
								width={400}
								height={400}
								className="h-auto w-full"
							/>
						</div>

						<p
							className={`${epilogueLight.className} section-body text-brand-copy mt-6 max-w-136 lg:text-[1.05rem]`}
						>
							Experience the healing benefits of premium herbal products,
							crafted with care and backed by science for everyday wellness.
						</p>

						<div className="mt-9 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
							<Link
								href="/products"
								className="group bg-brand-gold border-brand-gold hover:border-brand-gold-hover hover:bg-brand-gold-hover inline-flex min-h-13 items-center justify-center rounded-full border px-4 py-2 text-white shadow-[0_14px_34px_rgba(183,157,103,0.24)] transition duration-300"
							>
								<span className="flex items-center gap-3 rounded-full bg-[#8f7340] px-4 py-3">
									<span
										className={`${epilogue.className} text-[11px] tracking-[0.24em] text-white uppercase`}
									>
										Shop Now
									</span>
									<span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#8f7340] transition duration-300 group-hover:translate-x-0.5">
										&rarr;
									</span>
								</span>
							</Link>

							<Link
								href="/about"
								className={`${epilogue.className} text-brand-copy-ui hover:text-brand-ink group inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase transition duration-300`}
							>
								<span className="bg-brand-ink h-px w-8 transition duration-300 group-hover:w-10" />
								Why Ayurra
							</Link>
						</div>

						<div className="border-brand-border-warm mt-10 grid max-w-104 grid-cols-2 gap-6 border-t pt-5 text-center sm:gap-8 lg:text-left">
							<div>
								<p className="text-brand-ink text-2xl font-medium sm:text-3xl">
									100%
								</p>
								<p className="text-brand-copy-label mt-2 text-[10px] tracking-[0.24em] uppercase sm:text-xs">
									Herbal Based
								</p>
							</div>

							<div>
								<p className="text-brand-ink text-2xl font-medium sm:text-3xl">
									Pure
								</p>
								<p className="text-brand-copy-label mt-2 text-[10px] tracking-[0.24em] uppercase sm:text-xs">
									Ayurvedic Care
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-brand-border-button h-px w-full" />
		</section>
	);
};

export default Hero;
