import { google } from "googleapis";

type SheetTarget = "orders" | "contact" | "newsletter";

const DEFAULT_SHEET_NAMES: Record<SheetTarget, string> = {
	orders: process.env.GOOGLE_ORDERS_SHEET_NAME || process.env.GOOGLE_SHEET_NAME || "Sheet1",
	contact: process.env.GOOGLE_CONTACT_SHEET_NAME || "Sheet2",
	newsletter: process.env.GOOGLE_NEWSLETTER_SHEET_NAME || "Sheet3",
};

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

export function getGoogleSheetId() {
	return process.env.GOOGLE_SHEET_ID;
}

export function getGoogleSheetName(target: SheetTarget) {
	return DEFAULT_SHEET_NAMES[target];
}

export function getGoogleSheetAppendRange(
	target: SheetTarget,
	columnCount: number,
) {
	return `${getGoogleSheetName(target)}!A2:${getColumnLetter(columnCount)}`;
}

export function createGoogleSheetsClient() {
	const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
	const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
	if (!privateKey || !clientEmail) {
		throw new Error(
			"Google Sheets credentials are not fully configured in environment variables.",
		);
	}

	const auth = new google.auth.GoogleAuth({
		credentials: {
			type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE || "service_account",
			project_id: process.env.GOOGLE_PROJECT_ID,
			private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
			private_key: privateKey,
			client_email: clientEmail,
			client_id: process.env.GOOGLE_CLIENT_ID,
			auth_uri: process.env.GOOGLE_AUTH_URI,
			token_uri: process.env.GOOGLE_TOKEN_URI,
			auth_provider_x509_cert_url:
				process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
			client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
			universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
		},
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});

	return google.sheets({ version: "v4", auth });
}
