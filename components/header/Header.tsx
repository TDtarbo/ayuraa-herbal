"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiShoppingCart, CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { Ephesis, Epilogue } from "next/font/google";
import { useCart } from "@/components/providers/CartProvider";

const ephesis = Ephesis({ subsets: ["latin"], weight: "400" });
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

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const { itemCount } = useCart();

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

	const isActiveLink = (href: string) => {
		if (href === "/") return pathname === "/";
		if (href === "/shop") {
			return pathname === "/shop" || pathname.startsWith("/products");
		}

		return pathname === href || pathname.startsWith(`${href}/`);
	};

	return (
		<>
			<header className="relative z-40 w-full border-b border-[#e7dfd2] bg-[#fcfaf6]/95 backdrop-blur-sm">
				<div className="mx-auto flex h-[15vh] max-w-475 items-center justify-between px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20">
					{/* Left: Brand */}
					<div className="flex min-w-0 items-center">
						<Link href="/" className="group inline-flex flex-col leading-none">
							<span
								className={`${ephesis.className} text-[2rem] text-[#b79d67] transition duration-300 group-hover:text-[#a88d56] sm:text-[2.3rem]`}
							>
								Ayurra Herbal
							</span>
							<span
								className={`${epilogue.className} mt-1 text-[10px] tracking-[0.32em] text-[#8b8478] uppercase`}
							>
								Pure Herbal Wellness
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
					<div className="flex items-center gap-3 sm:gap-4">
						<Link
							href="/shop"
							className={`${epilogue.className} hidden rounded-full border border-[#d8d0c2] px-5 py-2.5 text-[10px] tracking-[0.24em] text-[#4f493f] uppercase transition duration-300 hover:border-[#b79d67] hover:text-[#b79d67] md:inline-flex`}
						>
							Explore
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

			{/* Full Screen Mobile Menu Overlay - OUTSIDE RevealWrapper */}
			<div
				className={`fixed inset-0 z-9999 h-screen w-screen lg:hidden ${
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
				<div className="relative flex h-full w-full flex-col px-6 pt-6 pb-8 sm:px-8">
					{/* Top */}
					<div className="flex items-start justify-between border-b border-[#e7dfd2] pb-5">
						<div className="flex flex-col leading-none">
							<span
								className={`${ephesis.className} text-[2.2rem] text-[#b79d67]`}
							>
								Ayurra Herbal
							</span>
							<span
								className={`${epilogue.className} mt-1 text-[10px] tracking-[0.32em] text-[#8b8478] uppercase`}
							>
								Pure Herbal Wellness
							</span>
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
					<div className="flex flex-1 items-center">
						<div className="w-full">
							<div className="mb-6 flex items-center gap-3">
								<span className="h-px w-10 bg-[#b79d67]" />
								<p
									className={`${epilogue.className} text-[10px] tracking-[0.28em] text-[#b79d67] uppercase`}
								>
									Navigation
								</p>
							</div>

							<nav className="flex flex-col">
								{navLinks.map((link, index) => (
									<Link
										key={link.name}
										href={link.href}
										onClick={() => setMobileMenuOpen(false)}
										className={`${epilogue.className} ${
											index !== navLinks.length - 1
												? "border-b border-[#ece3d6]"
												: ""
										} py-5 text-[1.15rem] tracking-[0.18em] uppercase transition duration-300 ${
											isActiveLink(link.href)
												? "pl-2 text-[#b79d67]"
												: "text-[#26231f] hover:pl-2 hover:text-[#b79d67]"
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
						<div className="flex flex-col gap-3">
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
					</div>
				</div>
			</div>
		</>
	);
}
