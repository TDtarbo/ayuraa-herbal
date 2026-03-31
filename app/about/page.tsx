import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import SiteFooter from "@/components/footer/SiteFooter";
import Header from "@/components/header/Header";
import AboutPageContent from "@/components/sections/about/AboutPageContent";

const epilogueRegular = Epilogue({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "About | Ayurra Herbal",
	description:
		"Learn more about Ayurra Herbal, our approach to refined herbal wellness, and the values behind the brand.",
};

export default function AboutPage() {
	return (
		<div
			className={`bg-background relative m-0 flex min-h-screen w-full flex-col overflow-hidden bg-white/35 p-0 ${epilogueRegular.className}`}
		>
			<Header />
			<AboutPageContent />
			<SiteFooter />
		</div>
	);
}
