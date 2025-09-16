// src/lib/sheetLoader.ts
import Papa from "papaparse";
import { GOOGLE_SHEET } from "../config/sheets";

export type Row = Record<string, string>;

const BASE = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET.SPREADSHEET_ID}`;
const ACCEPT_CSV = "text/csv,text/plain,*/*";

// Helper function to get the correct spreadsheet base URL
const getSpreadsheetBase = (sheetName: string) => {
  // Use PRCS spreadsheet for PHOENIX DEALS and PRCS Finances sheets
  if (sheetName === "PHOENIX DEALS" || sheetName === "PHOENIX NUMBERS") {
    return `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET.PRCS_SPREADSHEET_ID}`;
  }
  // Use default spreadsheet for all other sheets
  return `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET.SPREADSHEET_ID}`;
};

// Utility
const buster = (u: string) => {
  const url = new URL(u);
  url.searchParams.set("_", String(Date.now()));
  return url.toString();
};

const isHtml = (t: string) => /^\s*</.test(t);

// --- GViz CSV by sheet name (most reliable with "Anyone with link: Viewer") ---
function gvizCsvUrl(sheetName: string, range?: string) {
  // GViz accepts sheet=<tab name> so we avoid GIDs entirely
  const base = getSpreadsheetBase(sheetName);
  const params: Record<string, string> = { "tqx": "out:csv", "sheet": sheetName };
  if (range) {
    params.range = range;
  }
  const q = new URLSearchParams(params);
  return `${base}/gviz/tq?${q.toString()}`;
}

// Optional JSON (useful for debugging/headers, not required)
function gvizJsonUrl(sheetName: string, range?: string) {
  const base = getSpreadsheetBase(sheetName);
  const params: Record<string, string> = { "tqx": "out:json", "sheet": sheetName };
  if (range) {
    params.range = range;
  }
  const q = new URLSearchParams(params);
  return `${base}/gviz/tq?${q.toString()}`;
}

async function fetchText(url: string, accept?: string): Promise<string> {
  const res = await fetch(buster(url), {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: accept ? { Accept: accept } : {},
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} :: ${text.slice(0, 500)}`);
  }
  if (!text.trim()) throw new Error("Empty response");
  return text;
}

function parseCsv(text: string): Row[] {
  const parsed = Papa.parse<Row>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });
  if (parsed.errors?.length) {
    console.warn("[SheetLoader] CSV parse warnings:", parsed.errors);
  }
  return (parsed.data || []).filter(Boolean);
}

// Public API: load rows by sheet name
export async function loadRowsBySheetName(sheetName: string, range?: string): Promise<Row[]> {
  // Try GViz CSV (sheet=<name>)
  console.log("[SheetLoader] GViz CSV:", gvizCsvUrl(sheetName, range));
  try {
    const csv = await fetchText(gvizCsvUrl(sheetName, range), ACCEPT_CSV);
    if (isHtml(csv)) throw new Error("GViz CSV returned HTML");
    const rows = parseCsv(csv);
    if (!rows.length) throw new Error("CSV parsed but no rows");
    console.log(`[SheetLoader] Loaded ${rows.length} rows from "${sheetName}"${range ? ` (range: ${range})` : ''}`);
    console.debug("[SheetLoader] Headers:", Object.keys(rows[0] || {}));
    return rows;
  } catch (e) {
    console.error(`[SheetLoader] GViz CSV failed for "${sheetName}"${range ? ` (range: ${range})` : ''}:`, e);
  }

  // Optional: Surface helpful JSON error if CSV path fails
  try {
    const jsonTxt = await fetchText(gvizJsonUrl(sheetName, range));
    console.warn(`[SheetLoader] GViz JSON reached for "${sheetName}"${range ? ` (range: ${range})` : ''} (for debugging)`);
    // GViz JSON is wrapped: google.visualization.Query.setResponse(...)
    const start = jsonTxt.indexOf("{");
    const end = jsonTxt.lastIndexOf("}");
    if (start >= 0 && end > start) {
      const meta = JSON.parse(jsonTxt.slice(start, end + 1));
      console.warn("[SheetLoader] GViz JSON meta:", meta?.table?.cols?.map((c: any) => c?.label));
    }
  } catch (e) {
    console.warn(`[SheetLoader] GViz JSON also failed for "${sheetName}"${range ? ` (range: ${range})` : ''}:`, e);
  }

  throw new Error(
    `Failed to load sheet "${sheetName}"${range ? ` (range: ${range})` : ''}. ` +
    `Make sure: Share → General access → Anyone with the link → Viewer.`
  );
}