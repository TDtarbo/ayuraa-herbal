import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import Header from "@/components/header/Header";
import Hero from "@/components/sections/home/hero/Hero";
import Certifications from "@/components/sections/home/certifications/Certifications";
import Slide from "@/components/sections/home/Slide";
import FeaturedProductsSection from "@/components/sections/home/featured_products/Products";
import CustomerReviews from "@/components/sections/home/reviews/CustomerReviews";
import SiteFooter from "@/components/footer/SiteFooter";

const epilogueRegular = Epilogue({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Ayurra Herbal - Natural Skincare Solutions",
	description:
		"Discover the power of nature with Ayurra Herbal. Our premium herbal skincare products are crafted with care and backed by science to provide effective, natural solutions for your everyday care.",
	keywords: [
		"Ayurra Herbal",
		"natural skincare",
		"herbal products",
		"premium skincare",
		"natural beauty",
		"herbal remedies",
		"skincare solutions",
	],
};

const Home = () => {
	return (
		<div
			className={`bg-background relative m-0 flex w-full flex-col p-0 ${epilogueRegular.className} overflow-hidden bg-white/35`}
		>
			<Header />
			<Hero />
			<Certifications />
			<Slide />
			<FeaturedProductsSection />
			<CustomerReviews />
			<SiteFooter />
		</div>
	);
};

export default Home;
