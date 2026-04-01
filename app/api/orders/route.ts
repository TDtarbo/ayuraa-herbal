import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

const ORDER_SHEET_COLUMNS = [
	"Order ID",
	"Placed At",
	"Customer Name",
	"Phone Number",
	"Address",
	"Email",
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
	email?: string;
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
		.map(
			(item) =>
				`${item.name} (${item.slug}) x${item.quantity} = $${(
					item.price * item.quantity
				).toFixed(2)}`,
		)
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

function isSubmittedOrderPayload(value: unknown): value is SubmittedOrderPayload {
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
		(payload.email === undefined || typeof payload.email === "string") &&
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
	const totalUnits = payload.items.reduce((sum, item) => sum + item.quantity, 0);

	return [
		orderId,
		placedAt,
		payload.customerName.trim(),
		payload.phoneNumber.trim(),
		payload.address.trim(),
		getOptionalValue(payload.email),
		getOptionalValue(payload.notes),
		payload.items.length,
		totalUnits,
		formatItemsForSheet(payload),
		payload.subtotal.toFixed(2),
		payload.shipping.toFixed(2),
		payload.total.toFixed(2),
	];
}

function getColumnLetter(columnNumber: number) {
	let column = "";
	let current = columnNumber;

	while (current > 0) {
		const remainder = (current - 1) % 26;
		column = String.fromCharCode(65 + remainder) + column;
		current = Math.floor((current - 1) / 26);
	}

	return column;
}

function getSheetsAuth() {
	const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
	const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

	if (privateKey && clientEmail) {
		return new google.auth.GoogleAuth({
			credentials: {
				client_email: clientEmail,
				private_key: privateKey,
			},
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});
	}

	return new google.auth.GoogleAuth({
		keyFile: "secret.json",
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});
}

export async function POST(request: Request) {
	try {
		const sheetId = process.env.GOOGLE_SHEET_ID;
		const sheetName = process.env.GOOGLE_SHEET_NAME || "Sheet1";

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

		const auth = getSheetsAuth();
		const client = await auth.getClient();
		const googleSheets = google.sheets({ version: "v4", auth: client as any });

		await googleSheets.spreadsheets.values.append({
			spreadsheetId: sheetId,
			range: `${sheetName}!A:${getColumnLetter(ORDER_SHEET_COLUMNS.length)}`,
			valueInputOption: "USER_ENTERED",
			insertDataOption: "INSERT_ROWS",
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
