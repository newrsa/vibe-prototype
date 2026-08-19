import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function testConnection() {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const spreadsheetId = process.env.DEFAULT_SPREADSHEET_ID;

    if (!email || !privateKey) {
      throw new Error('Missing credentials in .env');
    }

    console.log('Authenticating as:', email);

    const authClient = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: authClient });

    console.log('Fetching spreadsheet:', spreadsheetId);
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId,
    });

    console.log('✅ Connection Successful!');
    console.log('Spreadsheet Title:', response.data.properties?.title);
    console.log('Tabs:', response.data.sheets?.map(s => s.properties?.title).join(', '));
  } catch (error) {
    console.error('❌ Connection Failed:', error.message);
    if (error.message.includes('403')) {
      console.error('Make sure you have shared the spreadsheet with', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    }
  }
}

testConnection();
