import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import SiteFooter from "@/components/footer/SiteFooter";
import Header from "@/components/header/Header";
import CartPageContent from "@/components/sections/cart/CartPageContent";

const epilogueRegular = Epilogue({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Cart | Ayurra Herbal",
	description:
		"Review and update the herbal products in your Ayurra cart before checkout.",
};

export default function CartPage() {
	return (
		<div
			className={`relative m-0 flex min-h-screen w-full flex-col overflow-hidden bg-white/35 p-0 ${epilogueRegular.className}`}
		>
			<Header />
			<CartPageContent />
			<SiteFooter />
		</div>
	);
}
