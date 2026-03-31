import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type SubmittedOrderItem = {
	name: string;
	slug: string;
	price: number;
	quantity: number;
};

type SubmittedOrderPayload = {
	customerName: string;
	phoneNumber: string;
	address: string;
	email?: string;
	notes?: string;
	items: SubmittedOrderItem[];
	subtotal: number;
	shipping: number;
	total: number;
};

function formatOrderForText({
	orderId,
	payload,
	placedAt,
}: {
	orderId: string;
	payload: SubmittedOrderPayload;
	placedAt: string;
}) {
	const itemLines = payload.items
		.map(
			(item, index) =>
				`${index + 1}. ${item.name} (${item.slug}) x${item.quantity} - $${(
					item.price * item.quantity
				).toFixed(2)}`,
		)
		.join("\n");

	return [
		"============================================================",
		`Order ID: ${orderId}`,
		`Placed At: ${placedAt}`,
		"",
		"Customer Details",
		`Name: ${payload.customerName}`,
		`Phone: ${payload.phoneNumber}`,
		`Address: ${payload.address}`,
		`Email: ${payload.email?.trim() || "Not provided"}`,
		`Notes: ${payload.notes?.trim() || "None"}`,
		"",
		"Items",
		itemLines,
		"",
		"Totals",
		`Subtotal: $${payload.subtotal.toFixed(2)}`,
		`Shipping: $${payload.shipping.toFixed(2)}`,
		`Total: $${payload.total.toFixed(2)}`,
		"============================================================",
		"",
	].join("\n");
}

export async function POST(request: Request) {
	try {
		const payload = (await request.json()) as SubmittedOrderPayload;

		if (
			!payload.customerName?.trim() ||
			!payload.phoneNumber?.trim() ||
			!payload.address?.trim() ||
			!Array.isArray(payload.items) ||
			payload.items.length === 0
		) {
			return NextResponse.json(
				{ error: "Missing required order details." },
				{ status: 400 },
			);
		}

		const orderId = `AY-${Date.now()}`;
		const placedAt = new Date().toISOString();
		const ordersDirectory = path.join(process.cwd(), "data");
		const ordersFile = path.join(ordersDirectory, "orders.txt");

		await mkdir(ordersDirectory, { recursive: true });
		await appendFile(
			ordersFile,
			formatOrderForText({ orderId, payload, placedAt }),
			"utf8",
		);

		return NextResponse.json({ success: true, orderId });
	} catch {
		return NextResponse.json(
			{ error: "Unable to save the order right now." },
			{ status: 500 },
		);
	}
}
