// src/config/sheets.ts
export const GOOGLE_SHEET = {
  // Kwik Claims spreadsheet ID (extracted from the pubhtml URL)
  SPREADSHEET_ID: "1QN8cgRZwsRXgem9SGt948NK_sGYAsH8r9I09xv9PQbw",

  // PRCS Finances spreadsheet ID (extracted from the new pubhtml URL)
  PRCS_FINANCES_SPREADSHEET_ID: "2PACX-1vSKwqARGG-Efbtgxgwx6rnVry4GtEgVenW7t4lzGkYRZZ6zi9N5FQwc2MDbcmV7Ppvyt8vKjYfKNw0Y",

  // Page -> Sheet name mapping (no GIDs needed)
  SHEET_NAMES: {
    PROJECTS_AND_JOBS: "Kwik Deals",
    PRCS_PROJECTS: "PHOENIX DEALS",
    FINANCIALS: "PHOENIX DEALS", // This will use the PRCS_FINANCES_SPREADSHEET_ID
    PROCESS: "PROCESS",
    TODO: "TODO",
    UPDATES: "UPDATES",
  } as const,
} as const;

export type SheetKey = keyof typeof GOOGLE_SHEET.SHEET_NAMES;