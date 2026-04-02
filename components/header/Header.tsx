"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiShoppingCart, CiMenuFries } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { Epilogue } from "next/font/google";
import { useCart } from "@/components/providers/CartProvider";
import Image from "next/image";
import { socialLinks } from "@/lib/socialLinks";

const epilogue = Epilogue({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

const navLinks = [
	{ name: "Home", href: "/" },
	{ name: "Shop", href: "/shop" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

const socialIcons = {
	Instagram: FaInstagram,
	Facebook: FaFacebookF,
	TikTok: FaTiktok,
} as const;

const shellPadding = "px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);
	const pathname = usePathname();
	const { itemCount } = useCart();
	const lastScrollY = useRef(0);

	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileMenuOpen]);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (mobileMenuOpen || currentScrollY < 24) {
				setIsHeaderVisible(true);
				lastScrollY.current = currentScrollY;
				return;
			}

			if (currentScrollY > lastScrollY.current) {
				setIsHeaderVisible(false);
			} else if (currentScrollY < lastScrollY.current) {
				setIsHeaderVisible(true);
			}

			lastScrollY.current = currentScrollY;
		};

		lastScrollY.current = window.scrollY;
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [mobileMenuOpen]);

	const isActiveLink = (href: string) => {
		if (href === "/") return pathname === "/";
		if (href === "/shop") {
			return pathname === "/shop" || pathname.startsWith("/products");
		}

		return pathname === href || pathname.startsWith(`${href}/`);
	};

	return (
		<>
			<header
				className={`fixed top-0 right-0 left-0 z-40 w-full border-b border-[#e7dfd2] bg-[#fcfaf6]/95 backdrop-blur-sm transition-transform duration-300 ${
					isHeaderVisible ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div
					className={`mx-auto flex h-[15vh] items-center justify-between ${shellPadding}`}
				>
					{/* Left: Brand */}
					<div className="flex w-100 items-center">
						<Link
							href="/"
							className="group inline-flex items-center leading-none"
						>
							<Image
								src="/logos/logo_icon_v2.svg"
								alt="Ayurra Herbal Logo"
								width={56}
								height={56}
								className="hidden h-auto w-13.75 xl:block"
							/>

							<span className="inline-flex flex-col leading-none xl:ml-4">
								<Image
									src="/logos/logo_v3.svg"
									alt="Ayurra Herbal Logo"
									width={20}
									height={20}
									className="mb-1 h-auto w-34 sm:w-40 md:w-48 xl:w-55"
								/>
								<span
									className={`${epilogue.className} mt-1 text-[8px] tracking-[0.24em] text-[#8b8478] uppercase sm:text-[9px] md:text-[10px] md:tracking-[0.28em] xl:text-[11px] xl:tracking-[0.32em]`}
								>
									Your trusted herbal partner
								</span>
							</span>
						</Link>
					</div>

					{/* Center: Navigation */}
					<nav className="hidden items-center gap-8 lg:flex xl:gap-10">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className={`${epilogue.className} relative text-[11px] tracking-[0.24em] uppercase transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-[#b79d67] after:transition-all after:duration-300 ${
									isActiveLink(link.href)
										? "text-[#b79d67] after:w-full"
										: "text-[#4f493f] after:w-0 hover:text-[#b79d67] hover:after:w-full"
								}`}
								aria-current={isActiveLink(link.href) ? "page" : undefined}
							>
								{link.name}
							</Link>
						))}
					</nav>

					{/* Right: Actions */}
					<div className="bg flex w-100 items-center justify-end gap-3 sm:gap-4">
						<Link
							href="/products"
							className={`${epilogue.className} hidden min-h-11.5 items-center justify-center rounded-full border border-[#d8d0c2] bg-[#fffaf1] px-6 py-3 text-[10px] tracking-[0.24em] text-[#4f493f] uppercase transition duration-300 hover:border-[#b79d67] hover:text-[#b79d67] lg:inline-flex`}
						>
							Explore Products
						</Link>

						<Link
							href="/cart"
							className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ddd3c4] bg-[#fffaf1] text-[#26231f] transition duration-300 hover:border-[#b79d67] hover:text-[#b79d67]"
							aria-label="Shopping cart"
						>
							<CiShoppingCart className="h-6 w-6" />
							{itemCount > 0 && (
								<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#b79d67] text-[10px] text-white shadow-sm">
									{itemCount}
								</span>
							)}
						</Link>

						<button
							onClick={() => setMobileMenuOpen(true)}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ddd3c4] bg-[#fffaf1] text-[#26231f] transition duration-300 hover:border-[#b79d67] hover:text-[#b79d67] lg:hidden"
							aria-label="Open menu"
						>
							<CiMenuFries className="h-5 w-5" />
						</button>
					</div>
				</div>
			</header>
			<div aria-hidden="true" className="h-[15vh]" />

			{/* Full Screen Mobile Menu Overlay - OUTSIDE RevealWrapper */}
			<div
				className={`fixed inset-0 z-9999 h-screen w-screen px-3 pt-6 lg:hidden ${
					mobileMenuOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0"
				} transition-opacity duration-300`}
			>
				{/* Background */}
				<div
					className="absolute inset-0 bg-[#fcfaf6]"
					onClick={() => setMobileMenuOpen(false)}
				/>

				{/* Content */}
				<div
					className={`relative flex h-full w-full flex-col pt-6 pb-8 ${shellPadding}`}
				>
					{/* Top */}
					<div className="flex items-start justify-between gap-4 border-b border-[#e7dfd2] pb-5">
						<div className="flex min-w-0 flex-1 flex-col">
							<div>
								<Image
									src="/logos/logo_v3.svg"
									alt="Ayurra Herbal Logo"
									width={240}
									height={80}
									className="h-auto w-40 sm:w-44"
								/>
								<p
									className={`${epilogue.className} mt-2 text-[10px] tracking-[0.24em] text-[#8b8478] uppercase`}
								>
									Your trusted herbal partner
								</p>
							</div>
						</div>

						<button
							onClick={() => setMobileMenuOpen(false)}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ddd3c4] bg-[#fffaf1] text-[#26231f] transition duration-300 hover:border-[#b79d67] hover:text-[#b79d67]"
							aria-label="Close menu"
						>
							<IoCloseOutline className="h-7 w-7" />
						</button>
					</div>

					{/* Middle */}
					<div className="mt-12 flex flex-1 items-start">
						<div className="w-full">
							<div className="mb-5 flex items-center gap-3">
								<span className="h-px w-10 bg-[#b79d67]" />
								<p
									className={`${epilogue.className} text-[10px] tracking-[0.28em] text-[#b79d67] uppercase`}
								>
									Navigation
								</p>
							</div>

							<nav className="flex w-full flex-col">
								{navLinks.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										onClick={() => setMobileMenuOpen(false)}
										className={`${epilogue.className} border-b border-[#ece3d6] py-4 text-center text-[1rem] tracking-[0.18em] uppercase transition duration-300 last:border-b-0 ${
											isActiveLink(link.href)
												? "text-[#b79d67]"
												: "text-[#26231f] hover:text-[#b79d67]"
										}`}
										aria-current={isActiveLink(link.href) ? "page" : undefined}
									>
										{link.name}
									</Link>
								))}
							</nav>
						</div>
					</div>

					{/* Bottom */}
					<div className="border-t border-[#e7dfd2] pt-6">
						<div className="grid grid-cols-2 gap-3">
							<Link
								href="/shop"
								onClick={() => setMobileMenuOpen(false)}
								className={`${epilogue.className} inline-flex min-h-12.5 items-center justify-center rounded-full border border-[#b79d67] bg-[#b79d67] px-6 py-3 text-[10px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-[#a88d56] hover:bg-[#a88d56]`}
							>
								Explore Products
							</Link>

							<Link
								href="/cart"
								onClick={() => setMobileMenuOpen(false)}
								className={`${epilogue.className} inline-flex min-h-12.5 items-center justify-center rounded-full border border-[#d8d0c2] bg-[#fffaf1] px-6 py-3 text-[10px] tracking-[0.24em] text-[#4f493f] uppercase transition duration-300 hover:border-[#b79d67] hover:text-[#b79d67]`}
							>
								View Cart
							</Link>
						</div>

						<div className="mt-5 border-t border-[#ece3d6] pt-4">
							<div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
								{socialLinks.map((link) => {
									const Icon = socialIcons[link.label];

									return (
										<a
											key={link.label}
											href={link.href}
											target="_blank"
											rel="noreferrer"
											className={`${epilogue.className} inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-[#6b655b] uppercase transition duration-300 hover:text-[#b79d67]`}
										>
											<Icon className="h-3.5 w-3.5" />
											<span>{link.label}</span>
										</a>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
