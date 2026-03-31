import Link from "next/link";

export default function SiteFooter() {
	return (
		<footer className="bg-[#1f1f1b] text-[#eae5da]">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<h3 className="text-2xl font-light tracking-wide text-white">
							Ayurra Herbal
						</h3>
						<p className="mt-4 max-w-sm text-sm leading-7 text-[#bdb7ab]">
							Premium herbal wellness products crafted with care, backed by
							trusted standards, and designed for everyday balance.
						</p>
					</div>

					<div>
						<h4 className="text-sm font-semibold tracking-[0.2em] text-[#b79b57] uppercase">
							Quick Links
						</h4>
						<ul className="mt-4 space-y-3 text-sm text-[#d8d1c5]">
							<li>
								<Link href="/" className="transition hover:text-white">
									Home
								</Link>
							</li>
							<li>
								<Link href="/shop" className="transition hover:text-white">
									Shop
								</Link>
							</li>
							<li>
								<Link href="/about" className="transition hover:text-white">
									About Us
								</Link>
							</li>
							<li>
								<Link href="/contact" className="transition hover:text-white">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-sm font-semibold tracking-[0.2em] text-[#b79b57] uppercase">
							Contact
						</h4>
						<ul className="mt-4 space-y-3 text-sm text-[#d8d1c5]">
							<li>123 Herbal Lane, Colombo</li>
							<li>+94 77 123 4567</li>
							<li>hello@ayurraherbal.com</li>
							<li>Mon - Sat: 9.00 AM - 6.00 PM</li>
						</ul>
					</div>

					<div>
						<h4 className="text-sm font-semibold tracking-[0.2em] text-[#b79b57] uppercase">
							Newsletter
						</h4>
						<p className="mt-4 text-sm leading-7 text-[#bdb7ab]">
							Subscribe for wellness tips, herbal insights, and product updates.
						</p>

						<form className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
							<input
								type="email"
								placeholder="Your email address"
								className="w-full rounded-full border border-[#5f5a52] bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-[#9f988b] focus:border-[#b79b57]"
							/>
							<button
								type="submit"
								className="rounded-full bg-[#b79b57] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
							>
								Subscribe
							</button>
						</form>
					</div>
				</div>

				<div className="mt-10 border-t border-[#35342f] pt-6">
					<div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-[#a8a193] md:flex-row md:text-left">
						<p>© 2026 Ayurra Herbal. All rights reserved.</p>

						<div className="flex flex-wrap items-center gap-5">
							<Link href="/privacy-policy" className="transition hover:text-white">
								Privacy Policy
							</Link>
							<Link href="/terms" className="transition hover:text-white">
								Terms & Conditions
							</Link>
							<Link href="/shipping" className="transition hover:text-white">
								Shipping & Returns
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
