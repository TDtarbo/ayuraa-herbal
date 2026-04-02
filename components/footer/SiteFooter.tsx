"use client";

import Link from "next/link";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { socialLinks } from "@/lib/socialLinks";

const socialIcons = {
	Instagram: FaInstagram,
	Facebook: FaFacebookF,
	TikTok: FaTiktok,
} as const;

export default function SiteFooter() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage("");
		setSuccessMessage("");
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const result = (await response.json()) as {
				error?: string;
				success?: boolean;
			};

			if (!response.ok || !result.success) {
				throw new Error(result.error || "Something went wrong.");
			}

			setSuccessMessage("You have been subscribed successfully.");
			setEmail("");
		} catch (error) {
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Unable to subscribe right now.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

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
						<div className="mt-6">
							<h4 className="text-sm font-semibold tracking-[0.2em] text-[#b79b57] uppercase">
								Follow Us
							</h4>
							<div className="mt-4 flex flex-col gap-3">
								{socialLinks.map((link) => {
									const Icon = socialIcons[link.label];

									return (
										<a
											key={link.label}
											href={link.href}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-3 text-sm text-[#d8d1c5] transition hover:text-white"
										>
											<Icon className="h-4 w-4" />
											<span>{link.label}</span>
										</a>
									);
								})}
							</div>
						</div>
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

						<form
							className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
							onSubmit={handleSubmit}
						>
							<input
								type="email"
								required
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="Your email address"
								className="w-full rounded-full border border-[#5f5a52] bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-[#9f988b] focus:border-[#b79b57]"
							/>
							<button
								type="submit"
								disabled={isSubmitting}
								className="rounded-full bg-[#b79b57] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
							>
								{isSubmitting ? "Subscribing..." : "Subscribe"}
							</button>
						</form>

						{errorMessage && (
							<p className="mt-3 text-sm text-[#e6b9b3]">{errorMessage}</p>
						)}

						{successMessage && (
							<p className="mt-3 text-sm text-[#c9dfbc]">{successMessage}</p>
						)}
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
