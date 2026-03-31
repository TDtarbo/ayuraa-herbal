import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import SiteFooter from "@/components/footer/SiteFooter";
import Header from "@/components/header/Header";
import ContactPageContent from "@/components/sections/contact/ContactPageContent";

const epilogueRegular = Epilogue({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Contact | Ayurra Herbal",
	description:
		"Contact Ayurra Herbal for product questions, order support, and general inquiries. Includes direct contact details and our location map.",
};

export default function ContactPage() {
	return (
		<div
			className={`bg-background relative m-0 flex min-h-screen w-full flex-col overflow-hidden bg-white/35 p-0 ${epilogueRegular.className}`}
		>
			<Header />
			<ContactPageContent />
			<SiteFooter />
		</div>
	);
}
