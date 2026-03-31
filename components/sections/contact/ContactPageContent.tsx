import Link from "next/link";
import { Epilogue } from "next/font/google";
import RevealWrapper from "@/components/util/RevealWrapper";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["300", "400", "500"] });

const contactDetails = [
	{
		label: "Email",
		value: "hello@ayurraherbal.com",
		href: "mailto:hello@ayurraherbal.com",
	},
	{
		label: "Phone",
		value: "+94 77 123 4567",
		href: "tel:+94771234567",
	},
	{
		label: "Hours",
		value: "Mon - Sat, 9.00 AM - 6.00 PM",
		href: "",
	},
];

export default function ContactPageContent() {
	return (
		<>
			<section className="bg-brand-ivory px-4 pt-14 pb-10 sm:px-6 lg:px-10 lg:pt-18 lg:pb-12">
				<div className="mx-auto max-w-7xl">
					<RevealWrapper direction="up">
						<div className="max-w-3xl">
							<p className="section-eyebrow text-brand-gold">Contact Us</p>
							<h1
								className={`${epilogue.className} text-brand-ink mt-3 text-4xl leading-[1.02] font-light tracking-tight sm:text-5xl lg:text-[4.1rem]`}
							>
								A simple way to reach us, with clear details and a real map.
							</h1>
							<p className="section-body text-brand-copy mt-6 max-w-2xl text-base leading-8 sm:text-lg">
								If you have a question about a product, an order, or the brand,
								you can email us, call us, or send a message here. We’ve kept
								this page intentionally light and easy to use.
							</p>
						</div>
					</RevealWrapper>

					<div className="mt-10 grid gap-4 md:grid-cols-3">
						{contactDetails.map((detail, index) => {
							const card = (
								<div className="rounded-[26px] border border-brand-border-soft bg-brand-paper p-5 shadow-[0_10px_30px_var(--shadow-black-03)]">
									<p className="section-eyebrow text-brand-copy-label">
										{detail.label}
									</p>
									<p className="mt-3 text-base leading-7 font-medium text-brand-ink">
										{detail.value}
									</p>
								</div>
							);

							return (
								<RevealWrapper
									key={detail.label}
									direction="rise"
									delay={100 + index * 70}
									asChild
								>
									{detail.href ? (
										<a href={detail.href} className="block transition duration-300 hover:-translate-y-1">
											{card}
										</a>
									) : (
										<div>{card}</div>
									)}
								</RevealWrapper>
							);
						})}
					</div>
				</div>
			</section>

			<section className="bg-brand-ivory-alt px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
				<div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
					<RevealWrapper direction="right" asChild>
						<div className="rounded-[32px] border border-brand-border-soft bg-brand-paper p-7 shadow-[0_12px_35px_var(--shadow-black-03)] sm:p-8">
							<p className="section-eyebrow text-brand-gold">Send a Message</p>
							<h2
								className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}
							>
								Tell us what you need.
							</h2>

							<form className="mt-8 space-y-4">
								<div className="grid gap-4 sm:grid-cols-2">
									<input
										type="text"
										placeholder="Your name"
										className="h-13 rounded-[20px] border border-brand-border-button bg-brand-ivory px-5 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
									/>
									<input
										type="email"
										placeholder="Email address"
										className="h-13 rounded-[20px] border border-brand-border-button bg-brand-ivory px-5 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
									/>
								</div>

								<input
									type="text"
									placeholder="Subject"
									className="h-13 w-full rounded-[20px] border border-brand-border-button bg-brand-ivory px-5 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
								/>

								<textarea
									placeholder="How can we help?"
									rows={6}
									className="w-full rounded-[24px] border border-brand-border-button bg-brand-ivory px-5 py-4 text-sm text-brand-ink outline-none transition duration-300 placeholder:text-brand-copy-placeholder focus:border-brand-gold"
								/>

								<div className="flex flex-wrap gap-3">
									<button
										type="submit"
										className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-7 py-3 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
									>
										Send Message
									</button>
									<Link
										href="/shop"
										className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border-button px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
									>
										Visit Shop
									</Link>
								</div>
							</form>
						</div>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={80} asChild>
						<div className="rounded-[32px] border border-brand-border-soft bg-brand-paper p-5 shadow-[0_12px_35px_var(--shadow-black-03)] sm:p-6">
							<div className="mb-5">
								<p className="section-eyebrow text-brand-gold">Location</p>
								<h2
									className={`${epilogue.className} text-brand-ink mt-3 text-3xl leading-tight font-light tracking-tight sm:text-4xl`}
								>
									Visit our Colombo address.
								</h2>
							</div>

							<div className="overflow-hidden rounded-[28px] border border-brand-border-soft">
								<iframe
									title="Ayurra Herbal location map"
									src="https://www.openstreetmap.org/export/embed.html?bbox=79.8465%2C6.9148%2C79.8755%2C6.9398&layer=mapnik&marker=6.9271%2C79.8612"
									className="h-[380px] w-full border-0 sm:h-[460px]"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>

							<div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="section-eyebrow text-brand-copy-label">Address</p>
									<p className="mt-2 text-sm leading-7 text-brand-copy">
										123 Herbal Lane, Colombo, Sri Lanka
									</p>
								</div>
								<a
									href="https://www.openstreetmap.org/?mlat=6.9271&mlon=79.8612#map=16/6.9271/79.8612"
									target="_blank"
									rel="noreferrer"
									className="text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:text-brand-gold"
								>
									Open Full Map
								</a>
							</div>
						</div>
					</RevealWrapper>
				</div>
			</section>
		</>
	);
}
