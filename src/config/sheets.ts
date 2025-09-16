// src/config/sheets.ts
export const GOOGLE_SHEET = {
  // Kwik Claims spreadsheet ID (extracted from the pubhtml URL)
  SPREADSHEET_ID: "1QN8cgRZwsRXgem9SGt948NK_sGYAsH8r9I09xv9PQbw",

  // PRCS spreadsheet ID (extracted from the pubhtml URL)
  PRCS_SPREADSHEET_ID: "1QN8cgRZwsRXgem9SGt948NK_sGYAsH8r9I09xv9PQbw",

  // Page -> Sheet name mapping (no GIDs needed)
  SHEET_NAMES: {
    PROJECTS_AND_JOBS: "Kwik Deals",
    PRCS_PROJECTS: "PHOENIX DEALS",
    FINANCIALS: "PHOENIX NUMBERS", // This will use the same spreadsheet but different sheet
    KWIK_FINANCIALS: "KWIK NUMBERS", // Kwik Claims financial data
    PROCESS: "PROCESS",
    TODO: "TODO",
    UPDATES: "UPDATES",
  } as const,
} as const;

export type SheetKey = keyof typeof GOOGLE_SHEET.SHEET_NAMES;