import { NextResponse } from "next/server";
import {
	createGoogleSheetsClient,
	getGoogleSheetAppendRange,
	getGoogleSheetId,
} from "@/lib/googleSheets";

export const runtime = "nodejs";

const NEWSLETTER_SHEET_COLUMNS = [
	"Subscription ID",
	"Subscribed At",
	"Email",
] as const;

type NewsletterSubmissionPayload = {
	email: string;
};

function createSubscriptionId() {
	return `SUB-${Date.now()}`;
}

function isValidNewsletterSubmission(
	value: unknown,
): value is NewsletterSubmissionPayload {
	if (!value || typeof value !== "object") {
		return false;
	}

	const payload = value as Partial<NewsletterSubmissionPayload>;

	return typeof payload.email === "string" && payload.email.trim().length > 0;
}

function createNewsletterRow({
	subscriptionId,
	subscribedAt,
	payload,
}: {
	subscriptionId: string;
	subscribedAt: string;
	payload: NewsletterSubmissionPayload;
}) {
	return [subscriptionId, subscribedAt, payload.email.trim()];
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

		if (!isValidNewsletterSubmission(requestBody)) {
			return NextResponse.json(
				{ error: "Invalid newsletter payload." },
				{ status: 400 },
			);
		}

		const subscriptionId = createSubscriptionId();
		const subscribedAt = new Date().toISOString();
		const row = createNewsletterRow({
			subscriptionId,
			subscribedAt,
			payload: requestBody,
		});

		const googleSheets = createGoogleSheetsClient();

		await googleSheets.spreadsheets.values.append({
			spreadsheetId: sheetId,
			range: getGoogleSheetAppendRange(
				"newsletter",
				NEWSLETTER_SHEET_COLUMNS.length,
			),
			valueInputOption: "USER_ENTERED",
			insertDataOption: "OVERWRITE",
			requestBody: {
				values: [row],
			},
		});

		return NextResponse.json({ success: true, subscriptionId });
	} catch (error) {
		console.error(
			"Unable to save newsletter subscription to Google Sheets.",
			error,
		);

		return NextResponse.json(
			{ error: "Unable to subscribe right now." },
			{ status: 500 },
		);
	}
}
