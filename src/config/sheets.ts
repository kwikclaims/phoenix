// src/config/sheets.ts
export const GOOGLE_SHEET = {
  // editor/shared URL uses this ID:
  SPREADSHEET_ID: "1QN8cgRZwsRXgem9SGt948NK_sGYAsH8r9I09xv9PQbw",

  // Page -> Sheet name mapping (no GIDs needed)
  SHEET_NAMES: {
    PROJECTS_AND_JOBS: "DEALS",
    FINANCIALS: "NUMBERS",
    PROCESS: "PROCESS",
    TODO: "TODO",
    UPDATES: "UPDATES",
  } as const,
} as const;

export type SheetKey = keyof typeof GOOGLE_SHEET.SHEET_NAMES;