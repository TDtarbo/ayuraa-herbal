import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import SiteFooter from "@/components/footer/SiteFooter";
import Header from "@/components/header/Header";
import ProductsCatalog from "@/components/sections/products/ProductsCatalog";

const epilogueRegular = Epilogue({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Products | Ayurra Herbal",
	description:
		"Browse the Ayurra Herbal collection of refined herbal blends and single-herb essentials.",
};

export default function ProductsPage() {
	return (
		<div
			className={`relative m-0 flex min-h-screen w-full flex-col overflow-hidden bg-white/35 p-0 ${epilogueRegular.className}`}
		>
			<Header />
			<ProductsCatalog />
			<SiteFooter />
		</div>
	);
}
