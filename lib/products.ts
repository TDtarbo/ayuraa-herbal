export type Product = {
	id: number;
	slug: string;
	name: string;
	category: string;
	price: number;
	rating: number;
	reviews: number;
	image: string;
	featured?: boolean;
	description: string;
	longDescription: string;
	details: string[];
	benefits: string[];
	ritual: string;
	format: string;
	size: string;
};

export const products: Product[] = [
	{
		id: 1,
		slug: "ashwagandha-capsules",
		name: "ashwagandha capsules",
		category: "Adaptogens",
		price: 12.99,
		rating: 4,
		reviews: 128,
		image: "/images/hero3.png",
		featured: true,
		description:
			"A natural herbal supplement traditionally used to support vitality, balance, and everyday wellness.",
		longDescription:
			"Ashwagandha is one of the most trusted herbs in daily wellness traditions. This capsule format is designed for a calm, consistent routine with a premium finish that feels aligned with modern self-care.",
		details: [
			"supports daily wellness",
			"traditionally used for vitality",
			"60 capsules per bottle",
		],
		benefits: [
			"Grounding support for demanding days",
			"Easy capsule format for morning or evening routines",
			"Balanced, minimal formulation with a refined feel",
		],
		ritual: "Best enjoyed as part of a steady daily ritual.",
		format: "Capsules",
		size: "60 count",
	},
	{
		id: 2,
		slug: "neem-capsules",
		name: "neem capsules",
		category: "Single Herbs",
		price: 12.99,
		rating: 4,
		reviews: 94,
		image: "/images/hero2.png",
		description:
			"A clean herbal staple traditionally chosen for its purifying and skin-supportive qualities.",
		longDescription:
			"Neem has long been valued for routines centered around clarity and care. This bottle is designed for customers who want a simple, focused herbal essential in an easy capsule format.",
		details: [
			"single-herb daily support",
			"crafted for clean routines",
			"60 capsules per bottle",
		],
		benefits: [
			"A streamlined herbal option with a traditional profile",
			"Easy to pair with broader wellness routines",
			"Presented in a clean, shelf-ready format",
		],
		ritual: "A thoughtful addition to disciplined morning wellness habits.",
		format: "Capsules",
		size: "60 count",
	},
	{
		id: 3,
		slug: "gluco-aid-capsules",
		name: "gluco-aid capsules",
		category: "Herbal Blends",
		price: 12.99,
		rating: 4,
		reviews: 88,
		image: "/images/hero1.png",
		description:
			"A composed herbal blend created for customers building a more intentional everyday routine.",
		longDescription:
			"Gluco-Aid brings together carefully selected herbal ingredients in a format that feels practical, premium, and easy to return to every day. It is designed for calm routines, not cluttered ones.",
		details: [
			"crafted herbal blend",
			"easy daily routine format",
			"60 capsules per bottle",
		],
		benefits: [
			"Multi-herb support in one refined bottle",
			"Designed for repeatable daily use",
			"Simple enough to fit into existing habits",
		],
		ritual: "Works well in structured day-start rituals.",
		format: "Capsules",
		size: "60 count",
	},
	{
		id: 4,
		slug: "immuno-aid-capsules",
		name: "immuno-aid capsules",
		category: "Herbal Blends",
		price: 14.99,
		rating: 5,
		reviews: 116,
		image: "/images/hero3.png",
		description:
			"A botanical support blend for customers who want to keep wellness rituals steady through the week.",
		longDescription:
			"Immuno-Aid is built for customers who prefer a dependable herbal blend with a polished presentation. It fits neatly into everyday routines and pairs well with broader self-care habits.",
		details: [
			"wellness-focused blend",
			"made for consistent use",
			"60 capsules per bottle",
		],
		benefits: [
			"Balanced blend for routine-minded customers",
			"Polished packaging suited for modern wellness shelves",
			"Easy to stack with other herbal essentials",
		],
		ritual: "A steady option for ongoing everyday care.",
		format: "Capsules",
		size: "60 count",
	},
	{
		id: 5,
		slug: "turmeric-ginger-capsules",
		name: "turmeric + ginger capsules",
		category: "Herbal Blends",
		price: 15.99,
		rating: 5,
		reviews: 143,
		image: "/images/hero20.png",
		description:
			"A bright herbal pairing for customers who like warm, familiar ingredients in a modern routine.",
		longDescription:
			"Turmeric and ginger are a classic combination, reintroduced here in a capsule format that feels contemporary, convenient, and easy to make part of an everyday ritual.",
		details: [
			"classic herbal pairing",
			"warm, vibrant daily ritual",
			"60 capsules per bottle",
		],
		benefits: [
			"Familiar ingredients in a shelf-friendly format",
			"A supportive addition to thoughtful wellness habits",
			"Comforting profile with premium presentation",
		],
		ritual: "Especially suited to grounding morning or evening rituals.",
		format: "Capsules",
		size: "60 count",
	},
	{
		id: 6,
		slug: "moringa-capsules",
		name: "moringa capsules",
		category: "Single Herbs",
		price: 11.99,
		rating: 4,
		reviews: 72,
		image: "/images/hero21.png",
		description:
			"A simple herbal essential chosen by customers who appreciate uncomplicated daily support.",
		longDescription:
			"Moringa offers a clean and approachable way to build a routine around familiar plant-based ingredients. This format keeps the experience minimal, polished, and easy to return to.",
		details: [
			"single-herb classic",
			"minimal daily routine support",
			"60 capsules per bottle",
		],
		benefits: [
			"Straightforward, focused herbal option",
			"Designed for lightweight everyday routines",
			"Neat presentation for organized wellness shelves",
		],
		ritual: "Ideal for customers who prefer clean, uncomplicated rituals.",
		format: "Capsules",
		size: "60 count",
	},
	{
		id: 7,
		slug: "moringa-capsules",
		name: "moringa capsules",
		category: "Single Herbs",
		price: 11.99,
		rating: 4,
		reviews: 72,
		image: "/images/hero21.png",
		description:
			"A simple herbal essential chosen by customers who appreciate uncomplicated daily support.",
		longDescription:
			"Moringa offers a clean and approachable way to build a routine around familiar plant-based ingredients. This format keeps the experience minimal, polished, and easy to return to.",
		details: [
			"single-herb classic",
			"minimal daily routine support",
			"60 capsules per bottle",
		],
		benefits: [
			"Straightforward, focused herbal option",
			"Designed for lightweight everyday routines",
			"Neat presentation for organized wellness shelves",
		],
		ritual: "Ideal for customers who prefer clean, uncomplicated rituals.",
		format: "Capsules",
		size: "60 count",
	},
	{
		id: 8,
		slug: "moringa-capsules",
		name: "moringa capsules",
		category: "Single Herbs",
		price: 11.99,
		rating: 4,
		reviews: 72,
		image: "/images/hero21.png",
		description:
			"A simple herbal essential chosen by customers who appreciate uncomplicated daily support.",
		longDescription:
			"Moringa offers a clean and approachable way to build a routine around familiar plant-based ingredients. This format keeps the experience minimal, polished, and easy to return to.",
		details: [
			"single-herb classic",
			"minimal daily routine support",
			"60 capsules per bottle",
		],
		benefits: [
			"Straightforward, focused herbal option",
			"Designed for lightweight everyday routines",
			"Neat presentation for organized wellness shelves",
		],
		ritual: "Ideal for customers who prefer clean, uncomplicated rituals.",
		format: "Capsules",
		size: "60 count",
	},
];

export const productCategories = [
	"All",
	...new Set(products.map((product) => product.category)),
];

export function getProductBySlug(slug: string) {
	return products.find((product) => product.slug === slug);
}
