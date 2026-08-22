import { google } from 'googleapis';
export class GoogleSheetsClient {
    sheets = null;
    authClient = null;
    constructor() {
        this.initializeAuth();
    }
    initializeAuth() {
        const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        if (!email || !privateKey) {
            console.warn('Google Sheets credentials not found in environment variables. Setup incomplete.');
            return;
        }
        this.authClient = new google.auth.JWT({
            email,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        this.sheets = google.sheets({ version: 'v4', auth: this.authClient });
    }
    ensureAuth() {
        if (!this.sheets) {
            throw new Error('Google Sheets client is not authenticated. Check your environment variables.');
        }
    }
    async listTabs(spreadsheetId) {
        this.ensureAuth();
        const response = await this.sheets.spreadsheets.get({
            spreadsheetId,
        });
        return response.data.sheets?.map(sheet => sheet.properties?.title || 'Unknown') || [];
    }
    async readRange(spreadsheetId, range) {
        this.ensureAuth();
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        return response.data.values || [];
    }
    async writeRange(spreadsheetId, range, values) {
        this.ensureAuth();
        await this.sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });
    }
    async appendRow(spreadsheetId, range, values) {
        this.ensureAuth();
        await this.sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });
    }
}
