import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import SiteFooter from "@/components/footer/SiteFooter";
import Header from "@/components/header/Header";
import CheckoutPageContent from "@/components/sections/checkout/CheckoutPageContent";

const epilogueRegular = Epilogue({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Checkout | Ayurra Herbal",
	description:
		"Add your delivery details and save your Ayurra Herbal order for processing.",
};

export default function CheckoutPage() {
	return (
		<div
			className={`bg-background relative m-0 flex min-h-screen w-full flex-col overflow-hidden bg-white/35 p-0 ${epilogueRegular.className}`}
		>
			<Header />
			<CheckoutPageContent />
			<SiteFooter />
		</div>
	);
}
