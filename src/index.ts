#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { GoogleSheetsClient } from './sheets-client.js';
import { setupHandlers } from './mcp-handlers.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function main() {
  const server = new Server(
    {
      name: 'google-sheets-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  const sheetsClient = new GoogleSheetsClient();
  setupHandlers(server, sheetsClient);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Google Sheets MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
