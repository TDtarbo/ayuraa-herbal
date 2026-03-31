import Image from "next/image";
import Link from "next/link";
import { Epilogue } from "next/font/google";
import RevealWrapper from "@/components/util/RevealWrapper";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["300", "400", "500"] });

const values = [
	{
		title: "Herbal integrity",
		description:
			"We keep the formulas rooted in plant-led care, while shaping the final experience with a premium visual finish.",
	},
	{
		title: "Calm consistency",
		description:
			"From packaging cues to product pages, every detail is designed to feel clear, steady, and easy to trust.",
	},
	{
		title: "Everyday rituals",
		description:
			"Our collection is built for real routines, not complicated regimens or wellness performativity.",
	},
];

const process = [
	{
		step: "01",
		title: "Choose with care",
		description:
			"We begin with herbal ingredients that carry a clear role in daily wellness and a recognisable sense of purpose.",
	},
	{
		step: "02",
		title: "Refine the ritual",
		description:
			"Each product is shaped into a format that feels practical, repeatable, and easy to return to day after day.",
	},
	{
		step: "03",
		title: "Present with clarity",
		description:
			"The final layer is design: clean structure, warm materials, and a visual language that feels composed rather than loud.",
	},
];

const trustPoints = [
	{ label: "Certified standards", value: "ISO, HACCP, GMP" },
	{ label: "Product focus", value: "Daily herbal wellness" },
	{ label: "Brand direction", value: "Calm, refined, grounded" },
];

export default function AboutPageContent() {
	return (
		<>
			<section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(183,157,103,0.16),_transparent_30%),linear-gradient(180deg,#fcfaf6_0%,#f8f4ec_100%)] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
				<Image
					src="/images/icon-dark.png"
					alt="Decorative botanical mark"
					width={560}
					height={560}
					className="absolute top-6 right-0 h-auto w-40 object-contain opacity-[0.04] sm:w-56 lg:top-8 lg:w-110"
				/>

				<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
					<RevealWrapper direction="right" asChild>
						<div className="relative z-10">
							<div className="mb-5 flex items-center gap-4">
								<span className="bg-brand-gold h-px w-10" />
								<p className="section-eyebrow text-brand-gold">About Ayurra Herbal</p>
							</div>

							<h1 className={`${epilogue.className} text-brand-ink max-w-2xl text-4xl leading-[1.02] font-light tracking-tight sm:text-5xl lg:text-[4.4rem]`}>
								Herbal wellness,
								<span className="mt-2 block text-brand-gold">presented with a quieter kind of luxury.</span>
							</h1>

							<p className="section-body text-brand-copy mt-6 max-w-2xl text-base leading-8 sm:text-lg">
								Ayurra Herbal exists to make everyday wellness feel grounded,
								beautiful, and easy to trust. We bring together plant-led care,
								premium presentation, and a calmer visual rhythm so the experience
								feels as considered as the formulas themselves.
							</p>

							<div className="mt-8 flex flex-wrap gap-3">
								<Link
									href="/shop"
									className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
								>
									Explore Shop
								</Link>
								<Link
									href="/cart"
									className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border-button bg-brand-paper/90 px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
								>
									View Cart
								</Link>
							</div>

							<div className="mt-10 grid gap-4 sm:grid-cols-3">
								{trustPoints.map((point, index) => (
									<RevealWrapper
										key={point.label}
										direction="rise"
										delay={120 + index * 70}
										asChild
									>
										<div className="rounded-[24px] border border-brand-border-soft bg-brand-paper/90 p-5 shadow-[0_10px_30px_var(--shadow-black-03)] backdrop-blur-sm">
											<p className="section-eyebrow text-brand-copy-label">
												{point.label}
											</p>
											<p className="mt-3 text-sm leading-6 font-medium text-brand-ink">
												{point.value}
											</p>
										</div>
									</RevealWrapper>
								))}
							</div>
						</div>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={80} asChild>
						<div className="relative z-10">
							<div className="relative overflow-hidden rounded-[34px] border border-brand-border-soft bg-brand-paper p-4 shadow-[0_18px_50px_var(--shadow-black-05)] sm:p-5">
								<div className="relative overflow-hidden rounded-[30px] bg-brand-ivory">
									<Image
										src="/images/hero22.png"
										alt="Ayurra Herbal brand visual"
										width={900}
										height={1100}
										className="h-[500px] w-full object-cover sm:h-[560px]"
										priority
									/>

									<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(38,35,31,0.12))]" />
									<RevealWrapper direction="rise" delay={160} asChild>
										<div className="absolute right-5 bottom-5 max-w-56 rounded-[22px] border border-white/25 bg-[#fffaf1]/88 px-4 py-3 shadow-[0_14px_32px_var(--shadow-black-05)] backdrop-blur-sm">
											<p className="section-eyebrow text-brand-copy-label">
												Brand Note
											</p>
											<p className="mt-2 text-sm leading-6 text-brand-ink">
												Quietly premium. Never overworked.
											</p>
										</div>
									</RevealWrapper>
								</div>
							</div>
						</div>
					</RevealWrapper>
				</div>
			</section>

			<section className="bg-brand-ivory px-4 py-16 sm:px-6 lg:px-10 lg:py-22">
				<div className="mx-auto max-w-7xl space-y-8">
					<RevealWrapper direction="up" asChild>
						<div className="overflow-hidden rounded-[34px] border border-brand-border-soft bg-[linear-gradient(135deg,#fffaf1_0%,#f4ecde_100%)] shadow-[0_14px_38px_var(--shadow-black-03)]">
							<div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
								<div className="border-brand-border-soft bg-[#24211d] p-7 text-brand-ivory sm:p-8 lg:border-r">
									<p className="section-eyebrow text-brand-copy-cream">Our Story</p>
									<h2 className={`${epilogue.className} mt-3 text-3xl leading-tight font-light tracking-tight text-white sm:text-4xl`}>
										Rooted in herbal tradition. Styled for modern routines.
									</h2>
									<div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-5">
										<p className="section-eyebrow text-brand-copy-cream">Core Idea</p>
										<p className="mt-3 text-base leading-8 text-[#e6dfd2]">
											Wellness can feel authentic and elegant at the same time.
										</p>
									</div>
								</div>

								<div className="p-7 sm:p-8">
									<p className="section-body text-brand-copy">
										Ayurra Herbal started with the belief that herbal wellness
										brands do not have to choose between authenticity and elegance.
										Traditional plant-led thinking can still be expressed through a
										visual language that feels clean, warm, and contemporary.
									</p>
									<p className="section-body text-brand-copy mt-5">
										That belief shapes everything from the tone of our product pages
										to the way each bottle is framed: less clutter, more clarity,
										and a calmer overall experience.
									</p>
									<div className="border-brand-border-soft mt-8 flex flex-wrap gap-3 border-t pt-6">
										<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-4 py-2 text-sm text-brand-copy-ui">
											Traditional foundation
										</div>
										<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-4 py-2 text-sm text-brand-copy-ui">
											Modern presentation
										</div>
										<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-4 py-2 text-sm text-brand-copy-ui">
											Clearer daily rituals
										</div>
									</div>
								</div>
							</div>
						</div>
					</RevealWrapper>

					<RevealWrapper direction="up" delay={90} asChild>
						<div className="rounded-[34px] border border-brand-border-soft bg-brand-paper p-7 shadow-[0_14px_38px_var(--shadow-black-03)] sm:p-8">
							<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
								<div>
									<p className="section-eyebrow text-brand-gold">What Guides Us</p>
									<h2 className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}>
										Three values that shape every decision.
									</h2>
								</div>
								<div className="rounded-full border border-brand-border-highlight bg-brand-ivory px-4 py-2 text-sm text-brand-copy-ui">
									Calm by design
								</div>
							</div>

							<div className="space-y-4">
								{values.map((value, index) => (
									<RevealWrapper
										key={value.title}
										direction="rise"
										delay={120 + index * 80}
										asChild
									>
										<div className="grid gap-5 rounded-[28px] border border-brand-border-soft bg-[linear-gradient(180deg,#fffaf1_0%,#f8f4ec_100%)] p-5 shadow-[0_10px_24px_var(--shadow-black-02)] sm:grid-cols-[auto_1fr] sm:items-start sm:p-6">
											<div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-border-highlight bg-brand-paper text-sm font-medium text-brand-gold">
												0{index + 1}
											</div>
											<div>
												<h3 className="text-2xl leading-tight font-light text-brand-ink capitalize">
													{value.title}
												</h3>
												<p className="mt-3 max-w-3xl text-sm leading-7 text-brand-copy">
													{value.description}
												</p>
											</div>
										</div>
									</RevealWrapper>
								))}
							</div>
						</div>
					</RevealWrapper>
				</div>
			</section>

			<section className="bg-[linear-gradient(180deg,#f6f4ef_0%,#fcfaf6_100%)] px-4 py-16 sm:px-6 lg:px-10 lg:py-22">
				<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
					<RevealWrapper direction="right" asChild>
						<div className="rounded-[34px] border border-brand-border-soft bg-brand-paper p-7 shadow-[0_16px_42px_var(--shadow-black-03)] sm:p-8">
							<p className="section-eyebrow text-brand-gold">How We Build</p>
							<h2 className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}>
								A simple process, elevated by detail.
							</h2>

							<div className="mt-8 space-y-4">
								{process.map((item, index) => (
									<RevealWrapper
										key={item.step}
										direction="rise"
										delay={120 + index * 80}
										asChild
									>
										<div className="flex gap-4 rounded-[26px] border border-brand-border-soft bg-brand-ivory p-5">
											<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-border-highlight bg-brand-paper text-sm font-medium text-brand-gold">
												{item.step}
											</div>
											<div>
												<h3 className="text-xl font-light text-brand-ink">
													{item.title}
												</h3>
												<p className="mt-2 text-sm leading-7 text-brand-copy">
													{item.description}
												</p>
											</div>
										</div>
									</RevealWrapper>
								))}
							</div>
						</div>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={90} asChild>
						<div className="relative overflow-hidden rounded-[36px] border border-brand-border-soft bg-brand-paper shadow-[0_20px_55px_var(--shadow-black-05)]">
							<div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(183,157,103,0.16),transparent)]" />
							<div className="relative min-h-[500px]">
								<Image
									src="/images/slide/slide5.png"
									alt="Ayurra Herbal botanical visual"
									fill
									className="object-cover"
								/>
							</div>
							<div className="absolute right-5 bottom-5 left-5 rounded-[26px] border border-white/30 bg-[#26231f]/72 p-5 text-brand-ivory backdrop-blur-md">
								<p className="section-eyebrow text-brand-copy-cream">Brand Philosophy</p>
								<p className="mt-3 text-lg leading-8 font-light">
									We design for people who want wellness to feel grounded,
									beautiful, and quietly premium.
								</p>
							</div>
						</div>
					</RevealWrapper>
				</div>
			</section>

			<section className="relative overflow-hidden bg-brand-ivory px-4 py-16 sm:px-6 lg:px-10 lg:py-22">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(183,157,103,0.14),_transparent_45%)]" />

				<div className="relative mx-auto max-w-5xl rounded-[36px] border border-brand-border-soft bg-[linear-gradient(180deg,#fffaf1_0%,#f7f1e7_100%)] p-8 text-center shadow-[0_22px_60px_var(--shadow-black-05)] sm:p-12">
					<RevealWrapper direction="up">
						<p className="section-eyebrow text-brand-gold">A Better Daily Ritual</p>
						<h2 className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl lg:text-5xl`}>
							Explore the collection shaped by this philosophy.
						</h2>
						<p className="section-body text-brand-copy mx-auto mt-5 max-w-2xl">
							If the brand story feels aligned with how you want wellness to
							feel, the next step is simple: browse the collection and find the
							product that fits your routine.
						</p>
						<div className="mt-8 flex flex-wrap justify-center gap-3">
							<Link
								href="/shop"
								className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
							>
								Visit the Shop
							</Link>
							<Link
								href="/contact"
								className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border-button bg-brand-paper/90 px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
							>
								Contact Us
							</Link>
						</div>
					</RevealWrapper>
				</div>
			</section>
		</>
	);
}
