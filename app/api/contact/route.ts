import { NextResponse } from "next/server";
import {
	createGoogleSheetsClient,
	getGoogleSheetAppendRange,
	getGoogleSheetId,
} from "@/lib/googleSheets";

export const runtime = "nodejs";

const CONTACT_SHEET_COLUMNS = [
	"Message ID",
	"Submitted At",
	"Name",
	"Email",
	"Subject",
	"Message",
] as const;

type ContactSubmissionPayload = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

function createMessageId() {
	return `MSG-${Date.now()}`;
}

function isValidContactSubmission(
	value: unknown,
): value is ContactSubmissionPayload {
	if (!value || typeof value !== "object") {
		return false;
	}

	const payload = value as Partial<ContactSubmissionPayload>;

	return (
		typeof payload.name === "string" &&
		payload.name.trim().length > 0 &&
		typeof payload.email === "string" &&
		payload.email.trim().length > 0 &&
		typeof payload.subject === "string" &&
		payload.subject.trim().length > 0 &&
		typeof payload.message === "string" &&
		payload.message.trim().length > 0
	);
}

function createContactRow({
	messageId,
	submittedAt,
	payload,
}: {
	messageId: string;
	submittedAt: string;
	payload: ContactSubmissionPayload;
}) {
	return [
		messageId,
		submittedAt,
		payload.name.trim(),
		payload.email.trim(),
		payload.subject.trim(),
		payload.message.trim(),
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

		if (!isValidContactSubmission(requestBody)) {
			return NextResponse.json(
				{ error: "Invalid contact message payload." },
				{ status: 400 },
			);
		}

		const messageId = createMessageId();
		const submittedAt = new Date().toISOString();
		const row = createContactRow({
			messageId,
			submittedAt,
			payload: requestBody,
		});

		const googleSheets = createGoogleSheetsClient();

		await googleSheets.spreadsheets.values.append({
			spreadsheetId: sheetId,
			range: getGoogleSheetAppendRange(
				"contact",
				CONTACT_SHEET_COLUMNS.length,
			),
			valueInputOption: "USER_ENTERED",
			insertDataOption: "OVERWRITE",
			requestBody: {
				values: [row],
			},
		});

		return NextResponse.json({ success: true, messageId });
	} catch (error) {
		console.error("Unable to save contact message to Google Sheets.", error);

		return NextResponse.json(
			{ error: "Unable to send your message right now." },
			{ status: 500 },
		);
	}
}
