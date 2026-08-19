import { google, sheets_v4 } from 'googleapis';

export class GoogleSheetsClient {
  private sheets: sheets_v4.Sheets | null = null;
  private authClient: any = null;

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
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

  private ensureAuth() {
    if (!this.sheets) {
      throw new Error('Google Sheets client is not authenticated. Check your environment variables.');
    }
  }

  public async listTabs(spreadsheetId: string): Promise<string[]> {
    this.ensureAuth();
    const response = await this.sheets!.spreadsheets.get({
      spreadsheetId,
    });
    return response.data.sheets?.map(sheet => sheet.properties?.title || 'Unknown') || [];
  }

  public async readRange(spreadsheetId: string, range: string): Promise<any[][]> {
    this.ensureAuth();
    const response = await this.sheets!.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values || [];
  }

  public async writeRange(spreadsheetId: string, range: string, values: any[][]): Promise<void> {
    this.ensureAuth();
    await this.sheets!.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  }

  public async appendRow(spreadsheetId: string, range: string, values: any[][]): Promise<void> {
    this.ensureAuth();
    await this.sheets!.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
  }
}
