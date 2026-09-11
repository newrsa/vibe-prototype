import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// .env file load karein
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function readTestSheet() {
  try {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    
    // Nayi testing sheet ki ID jo aapne .env mein daali hogi
    const spreadsheetId = process.env.TESTING_SPREADSHEET_ID;

    if (!spreadsheetId || spreadsheetId === 'yahan_apni_testing_sheet_ki_id_daalein') {
        throw new Error("Kripya pehle .env file mein TESTING_SPREADSHEET_ID update karein!");
    }

    // Google API se authenticate karein (Same as old script)
    const authClient = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth: authClient });

    console.log('Testing sheet se data fetch ho raha hai...');
    
    // Yahan hum pehli sheet ka data fetch kar rahe hain.
    // Agar aapke sheet ka naam alag hai (jaise 'Pathway-Home'), toh 'Sheet1' ko change kar sakte hain.
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1', 
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('Koi data nahi mila.');
      return;
    }

    // Excel rows array of arrays hoti hain. Hum pehli row ko "Headers" manenge.
    // Aur baki rows ko Objects (JSON) mein convert karenge taaki test runner samajh sake.
    const headers = rows[0];
    const testCasesJSON = rows.slice(1).map((row) => {
      let testCaseObj = {};
      headers.forEach((header, index) => {
        testCaseObj[header] = row[index] || "";
      });
      return testCaseObj;
    });

    // JSON file ko tests folder mein save karein
    await fs.mkdir('./client-app/tests', { recursive: true });
    await fs.writeFile('./client-app/tests/test-data.json', JSON.stringify(testCasesJSON, null, 2));
    
    console.log('✅ Successfully saved testing data to ./client-app/tests/test-data.json!');
  } catch (error) {
    console.error('Error fetching testing sheet:', error.message);
  }
}

readTestSheet();
