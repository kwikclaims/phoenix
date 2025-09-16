// src/config/sheets.ts
export const GOOGLE_SHEET = {
  // editor/shared URL uses this ID:
  SPREADSHEET_ID: "2PACX-1vSKwqARGG-Efbtgxgwx6rnVry4GtEgVenW7t4lzGkYRZZ6zi9N5FQwc2MDbcmV7Ppvyt8vKjYfKNw0Y",

  // Page -> Sheet name mapping (no GIDs needed)
  SHEET_NAMES: {
    PROJECTS_AND_JOBS: "Kwik Deals",
    FINANCIALS: "NUMBERS",
    PROCESS: "PROCESS",
    TODO: "TODO",
    UPDATES: "UPDATES",
  } as const,
} as const;

export type SheetKey = keyof typeof GOOGLE_SHEET.SHEET_NAMES;