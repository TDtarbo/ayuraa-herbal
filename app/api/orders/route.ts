import { NextResponse } from "next/server";
import {
	createGoogleSheetsClient,
	getGoogleSheetAppendRange,
	getGoogleSheetId,
} from "@/lib/googleSheets";
import { formatLkr } from "@/lib/currency";

export const runtime = "nodejs";

const ORDER_SHEET_COLUMNS = [
	"Order ID",
	"Placed At",
	"Customer Name",
	"Phone Number",
	"Address",
	"City",
	"Payment Method",
	"Notes",
	"Distinct Items",
	"Total Units",
	"Item Summary",
	"Subtotal",
	"Shipping",
	"Total",
] as const;

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
	city: string;
	paymentMethod: "Cash on Delivery" | "Card Payment";
	notes?: string;
	items: SubmittedOrderItem[];
	subtotal: number;
	shipping: number;
	total: number;
};

function getOptionalValue(value?: string) {
	return value?.trim() || "";
}

function formatItemsForSheet(payload: SubmittedOrderPayload) {
	return payload.items
		.map((item) => `${item.name} x${item.quantity}`)
		.join(" | ");
}

function createOrderId() {
	return `ORD-${Date.now()}`;
}

function isValidItem(item: unknown): item is SubmittedOrderItem {
	if (!item || typeof item !== "object") {
		return false;
	}

	const candidate = item as Partial<SubmittedOrderItem>;

	return (
		typeof candidate.name === "string" &&
		candidate.name.trim().length > 0 &&
		typeof candidate.slug === "string" &&
		candidate.slug.trim().length > 0 &&
		typeof candidate.price === "number" &&
		Number.isFinite(candidate.price) &&
		typeof candidate.quantity === "number" &&
		Number.isInteger(candidate.quantity) &&
		candidate.quantity > 0
	);
}

function isSubmittedOrderPayload(
	value: unknown,
): value is SubmittedOrderPayload {
	if (!value || typeof value !== "object") {
		return false;
	}

	const payload = value as Partial<SubmittedOrderPayload>;

	return (
		typeof payload.customerName === "string" &&
		payload.customerName.trim().length > 0 &&
		typeof payload.phoneNumber === "string" &&
		payload.phoneNumber.trim().length > 0 &&
		typeof payload.address === "string" &&
		payload.address.trim().length > 0 &&
		typeof payload.city === "string" &&
		payload.city.trim().length > 0 &&
		(payload.paymentMethod === "Cash on Delivery" ||
			payload.paymentMethod === "Card Payment") &&
		(payload.notes === undefined || typeof payload.notes === "string") &&
		Array.isArray(payload.items) &&
		payload.items.length > 0 &&
		payload.items.every(isValidItem) &&
		typeof payload.subtotal === "number" &&
		Number.isFinite(payload.subtotal) &&
		typeof payload.shipping === "number" &&
		Number.isFinite(payload.shipping) &&
		typeof payload.total === "number" &&
		Number.isFinite(payload.total)
	);
}

function createSheetRow({
	orderId,
	payload,
	placedAt,
}: {
	orderId: string;
	payload: SubmittedOrderPayload;
	placedAt: string;
}) {
	const totalUnits = payload.items.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	return [
		orderId,
		placedAt,
		payload.customerName.trim(),
		payload.phoneNumber.trim(),
		payload.address.trim(),
		payload.city.trim(),
		payload.paymentMethod,
		getOptionalValue(payload.notes),
		payload.items.length,
		totalUnits,
		formatItemsForSheet(payload),
		formatLkr(payload.subtotal),
		formatLkr(payload.shipping),
		formatLkr(payload.total),
	];
}

export async function POST(request: Request) {
	try {
		const sheetId = getGoogleSheetId();

		if (!sheetId) {
			return NextResponse.json(
				{ error: "GOOGLE_SHEET_ID is not configured." },
				{ status: 500 },
			);
		}

		const requestBody = (await request.json()) as unknown;

		if (!isSubmittedOrderPayload(requestBody)) {
			return NextResponse.json(
				{ error: "Invalid order payload." },
				{ status: 400 },
			);
		}

		const orderId = createOrderId();
		const placedAt = new Date().toISOString();
		const row = createSheetRow({
			orderId,
			payload: requestBody,
			placedAt,
		});

		const googleSheets = createGoogleSheetsClient();

		await googleSheets.spreadsheets.values.append({
			spreadsheetId: sheetId,
			range: getGoogleSheetAppendRange("orders", ORDER_SHEET_COLUMNS.length),
			valueInputOption: "USER_ENTERED",
			insertDataOption: "OVERWRITE",
			requestBody: {
				values: [row],
			},
		});

		return NextResponse.json({ orderId });
	} catch (error) {
		console.error("Unable to save order to Google Sheets.", error);

		return NextResponse.json(
			{ error: "Unable to save the order right now." },
			{ status: 500 },
		);
	}
}
