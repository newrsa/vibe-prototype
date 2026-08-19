import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function readSheet() {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const spreadsheetId = process.env.DEFAULT_SPREADSHEET_ID;

    const authClient = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: authClient });

    console.log('Fetching data from Sheet1...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1',
    });

    await fs.writeFile('sheet-data.json', JSON.stringify(response.data.values, null, 2));
    console.log('✅ Successfully saved sheet data to sheet-data.json!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

readSheet();
