import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { GoogleSheetsClient } from './sheets-client.js';

export function setupHandlers(server: Server, sheetsClient: GoogleSheetsClient) {
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'list_tabs',
        description: 'Lists all tabs (worksheets) in a given Google Sheet.',
        inputSchema: {
          type: 'object',
          properties: {
            spreadsheetId: {
              type: 'string',
              description: 'The ID of the Google Spreadsheet. If not provided, uses DEFAULT_SPREADSHEET_ID from env.',
            },
          },
        },
      },
      {
        name: 'read_range',
        description: 'Reads data from a specific range or an entire tab.',
        inputSchema: {
          type: 'object',
          properties: {
            spreadsheetId: {
              type: 'string',
              description: 'The ID of the Google Spreadsheet. If not provided, uses DEFAULT_SPREADSHEET_ID from env.',
            },
            range: {
              type: 'string',
              description: 'The A1 notation of the range to read (e.g., "Sheet1!A1:D10" or just "Sheet1").',
            },
          },
          required: ['range'],
        },
      },
      {
        name: 'write_range',
        description: 'Updates specific cells in a Google Sheet with provided values.',
        inputSchema: {
          type: 'object',
          properties: {
            spreadsheetId: {
              type: 'string',
            },
            range: {
              type: 'string',
              description: 'The A1 notation of the range to write to (e.g., "Sheet1!A1:B2").',
            },
            values: {
              type: 'array',
              description: 'A 2D array of values to write (e.g., [["A1", "B1"], ["A2", "B2"]]).',
              items: {
                type: 'array',
                items: {
                  type: ['string', 'number', 'boolean', 'null'],
                },
              },
            },
          },
          required: ['range', 'values'],
        },
      },
      {
        name: 'append_row',
        description: 'Appends a new row of data to a tab.',
        inputSchema: {
          type: 'object',
          properties: {
            spreadsheetId: {
              type: 'string',
            },
            range: {
              type: 'string',
              description: 'The sheet name or range where the row should be appended (e.g., "Sheet1").',
            },
            values: {
              type: 'array',
              description: 'A 2D array of values to append (e.g., [["Value1", "Value2"]]).',
              items: {
                type: 'array',
                items: {
                  type: ['string', 'number', 'boolean', 'null'],
                },
              },
            },
          },
          required: ['range', 'values'],
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const getSpreadsheetId = (args: any) => {
      const id = args?.spreadsheetId || process.env.DEFAULT_SPREADSHEET_ID;
      if (!id) {
        throw new McpError(ErrorCode.InvalidParams, 'spreadsheetId is required or DEFAULT_SPREADSHEET_ID must be set in env');
      }
      return id;
    };

    try {
      switch (request.params.name) {
        case 'list_tabs': {
          const spreadsheetId = getSpreadsheetId(request.params.arguments);
          const tabs = await sheetsClient.listTabs(spreadsheetId);
          return {
            content: [{ type: 'text', text: JSON.stringify(tabs, null, 2) }],
          };
        }

        case 'read_range': {
          const spreadsheetId = getSpreadsheetId(request.params.arguments);
          const range = String(request.params.arguments?.range);
          if (!range) {
            throw new McpError(ErrorCode.InvalidParams, 'range is required');
          }
          const data = await sheetsClient.readRange(spreadsheetId, range);
          return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          };
        }

        case 'write_range': {
          const spreadsheetId = getSpreadsheetId(request.params.arguments);
          const range = String(request.params.arguments?.range);
          const values = request.params.arguments?.values as any[][];
          if (!range || !values) {
            throw new McpError(ErrorCode.InvalidParams, 'range and values are required');
          }
          await sheetsClient.writeRange(spreadsheetId, range, values);
          return {
            content: [{ type: 'text', text: 'Successfully updated range.' }],
          };
        }

        case 'append_row': {
          const spreadsheetId = getSpreadsheetId(request.params.arguments);
          const range = String(request.params.arguments?.range);
          const values = request.params.arguments?.values as any[][];
          if (!range || !values) {
            throw new McpError(ErrorCode.InvalidParams, 'range and values are required');
          }
          await sheetsClient.appendRow(spreadsheetId, range, values);
          return {
            content: [{ type: 'text', text: 'Successfully appended row.' }],
          };
        }

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
      }
    } catch (error: any) {
      return {
        content: [{ type: 'text', text: `Error: ${error.message}` }],
        isError: true,
      };
    }
  });
}
