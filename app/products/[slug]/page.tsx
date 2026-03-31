import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Epilogue, Ephesis } from "next/font/google";
import SiteFooter from "@/components/footer/SiteFooter";
import Header from "@/components/header/Header";
import ProductPurchaseControls from "@/components/sections/products/ProductPurchaseControls";
import RevealWrapper from "@/components/util/RevealWrapper";
import { getProductBySlug, products } from "@/lib/products";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["300", "400", "500"] });
const ephesis = Ephesis({ subsets: ["latin"], weight: "400" });

type ProductPageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateStaticParams() {
	return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
	params,
}: ProductPageProps): Promise<Metadata> {
	const { slug } = await params;
	const product = getProductBySlug(slug);

	if (!product) {
		return {
			title: "Product Not Found | Ayurra Herbal",
		};
	}

	return {
		title: `${product.name} | Ayurra Herbal`,
		description: product.description,
	};
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
	const { slug } = await params;
	const product = getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	const relatedProducts = products
		.filter((item) => item.slug !== product.slug)
		.slice(0, 3);

	return (
		<div className={`bg-background relative flex min-h-screen flex-col overflow-hidden bg-white/35 ${epilogue.className}`}>
			<Header />

			<section className="relative overflow-hidden bg-brand-ivory">
				<Image
					src="/images/icon-dark.png"
					alt="Decorative botanical mark"
					width={560}
					height={560}
					className="absolute top-8 right-0 h-auto w-40 object-contain opacity-[0.04] sm:w-56 lg:top-12 lg:w-110"
				/>

				<div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-24">
					<RevealWrapper direction="right" asChild>
						<div className="relative z-10 rounded-[32px] border border-brand-border-soft bg-brand-paper p-6 shadow-[0_18px_50px_var(--shadow-black-05)] sm:p-8">
						<div className="rounded-[28px] bg-brand-ivory p-8">
							<div className="relative flex min-h-96 items-center justify-center">
								<Image
									src={product.image}
									alt={product.name}
									width={520}
									height={520}
									className="h-80 w-auto object-contain sm:h-96"
									priority
								/>
							</div>
						</div>
						</div>
					</RevealWrapper>

					<RevealWrapper direction="left" delay={80} asChild>
						<div className="relative z-10 flex items-center">
						<div>
							<div className="mb-5 flex items-center gap-4">
								<span className="bg-brand-gold h-px w-10" />
								<p className="section-eyebrow text-brand-gold">
									{product.category}
								</p>
							</div>

							<h1 className="text-4xl leading-tight font-light tracking-tight text-brand-ink capitalize sm:text-5xl lg:text-6xl">
								{product.name}
							</h1>

							<p className={`${ephesis.className} mt-5 text-5xl leading-none text-brand-gold`}>
								Prepared for daily rituals
							</p>

							<p className="section-body text-brand-copy mt-6 max-w-2xl">
								{product.longDescription}
							</p>

							<div className="mt-8 flex flex-wrap items-center gap-4">
								<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui shadow-[0_10px_25px_var(--shadow-black-03)]">
									<span className="font-medium text-brand-ink">
										${product.price.toFixed(2)}
									</span>
								</div>
								<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui shadow-[0_10px_25px_var(--shadow-black-03)]">
									{product.reviews} reviews
								</div>
								<div className="rounded-full border border-brand-border-highlight bg-brand-paper px-5 py-3 text-sm text-brand-copy-ui shadow-[0_10px_25px_var(--shadow-black-03)]">
									{product.size}
								</div>
							</div>

							<ProductPurchaseControls product={product} />
						</div>
						</div>
					</RevealWrapper>
				</div>
			</section>

			<section className="bg-brand-ivory-alt px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
				<div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
					<RevealWrapper direction="up" asChild>
						<div className="rounded-[30px] border border-brand-border-soft bg-brand-paper p-7 shadow-[0_10px_30px_var(--shadow-black-03)]">
						<p className="section-eyebrow text-brand-gold">At a Glance</p>
						<div className="mt-6 space-y-5">
							<div className="flex items-center justify-between gap-4 border-b border-brand-border-soft pb-4 text-sm">
								<span className="text-brand-copy">Format</span>
								<span className="font-medium text-brand-ink">{product.format}</span>
							</div>
							<div className="flex items-center justify-between gap-4 border-b border-brand-border-soft pb-4 text-sm">
								<span className="text-brand-copy">Size</span>
								<span className="font-medium text-brand-ink">{product.size}</span>
							</div>
							<div className="flex items-center justify-between gap-4 text-sm">
								<span className="text-brand-copy">Ritual</span>
								<span className="max-w-56 text-right font-medium text-brand-ink">
									{product.ritual}
								</span>
							</div>
						</div>
						</div>
					</RevealWrapper>

					<RevealWrapper direction="up" delay={100} asChild>
						<div className="rounded-[30px] border border-brand-border-soft bg-brand-paper p-7 shadow-[0_10px_30px_var(--shadow-black-03)]">
						<p className="section-eyebrow text-brand-gold">Why Customers Choose It</p>
						<div className="mt-6 grid gap-4 sm:grid-cols-3">
							{product.benefits.map((benefit) => (
								<RevealWrapper
									key={benefit}
									direction="rise"
									delay={120}
									asChild
								>
									<div className="rounded-[24px] bg-brand-ivory p-5 text-sm leading-7 text-brand-copy">
										{benefit}
									</div>
								</RevealWrapper>
							))}
						</div>

						<div className="border-brand-border-soft mt-8 border-t pt-8">
							<p className="section-eyebrow text-brand-copy-label">Product Details</p>
							<div className="mt-4 flex flex-wrap gap-3">
								{product.details.map((detail) => (
									<span
										key={detail}
										className="rounded-full border border-brand-border-highlight bg-brand-ivory px-4 py-2 text-[11px] tracking-[0.22em] text-brand-copy-ui uppercase"
									>
										{detail}
									</span>
								))}
							</div>
						</div>
						</div>
					</RevealWrapper>
				</div>
			</section>

			<section className="bg-brand-ivory px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
				<div className="mx-auto max-w-7xl">
					<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<p className="section-eyebrow text-brand-gold">Continue Exploring</p>
							<h2 className="section-title text-brand-ink mt-3">
								More products in the collection.
							</h2>
						</div>
						<Link
							href="/shop"
							className="text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:text-brand-gold"
						>
							View all products
						</Link>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{relatedProducts.map((item, index) => (
							<RevealWrapper
								key={item.id}
								direction="rise"
								delay={Math.min(index * 80, 240)}
								asChild
							>
								<Link href={`/products/${item.slug}`} className="group block">
									<article className="flex h-full flex-col rounded-[28px] border border-brand-border-soft bg-brand-paper p-6 shadow-[0_10px_30px_var(--shadow-black-03)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_var(--shadow-black-05)]">
									<div className="rounded-[24px] bg-brand-ivory p-5">
										<div className="relative flex min-h-56 items-center justify-center">
											<Image
												src={item.image}
												alt={item.name}
												width={280}
												height={280}
												className="h-48 w-auto object-contain transition duration-500 group-hover:scale-[1.04]"
											/>
										</div>
									</div>
									<h3 className="mt-5 text-2xl leading-tight font-light text-brand-ink capitalize">
										{item.name}
									</h3>
									<p className="mt-3 text-sm leading-7 text-brand-copy">
										{item.description}
									</p>
									<p className="mt-auto pt-6 text-xl font-medium text-brand-ink">
										${item.price.toFixed(2)}
									</p>
									</article>
								</Link>
							</RevealWrapper>
						))}
					</div>
				</div>
			</section>

			<SiteFooter />
		</div>
	);
}
