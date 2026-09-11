import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const key = process.env.GOOGLE_PRIVATE_KEY;
console.log("RAW KEY (first 100 chars):", key.substring(0, 100));
console.log("Includes actual newline?", key.includes('\n'));
console.log("Includes literal \\n?", key.includes('\\n'));

const processedKey = key.replace(/\\n/g, '\n');
console.log("PROCESSED KEY (first 100 chars):", processedKey.substring(0, 100));
console.log("Processed includes actual newline?", processedKey.includes('\n'));
