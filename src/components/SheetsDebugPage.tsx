import React, { useState } from 'react';
import { Bug, Play, Copy, ExternalLink } from 'lucide-react';
import { GOOGLE_SHEET } from '../config/sheets';
import { loadRowsBySheetName } from '../lib/sheetLoader';

export const SheetsDebugPage: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [testing, setTesting] = useState(false);

  const testAllUrls = async () => {
    setTesting(true);
    setResults([]);
    
    const tests = [
      { name: 'Projects (DEALS)', sheetName: GOOGLE_SHEET.SHEET_NAMES.PROJECTS_AND_JOBS },
      { name: 'Financial (NUMBERS)', sheetName: GOOGLE_SHEET.SHEET_NAMES.FINANCIALS },
      { name: 'Process (PROCESS)', sheetName: GOOGLE_SHEET.SHEET_NAMES.PROCESS },
      { name: 'Todo (TODO LIST)', sheetName: GOOGLE_SHEET.SHEET_NAMES.TODO },
    ];

    for (const test of tests) {
      console.log(`\n🧪 Testing ${test.name} (sheet: ${test.sheetName})...`);
      
      const result = {
        name: test.name,
        sheetName: test.sheetName,
        success: false,
        error: null as string | null,
        rowCount: 0,
        headers: [] as string[]
      };

      try {
        const rows = await loadRowsBySheetName(test.sheetName);
        result.success = true;
        result.rowCount = rows.length;
        result.headers = Object.keys(rows[0] || {});
      } catch (e: any) {
        result.error = e.message;
      }


      setResults(prev => [...prev, result]);
    }
    
    setTesting(false);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Bug className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Google Sheets Debug</h1>
          <p className="text-gray-400 mb-6">Comprehensive connection testing for all sheet URLs</p>
          
          <button
            onClick={testAllUrls}
            disabled={testing}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
          >
            <Play className="w-5 h-5" />
            <span>{testing ? 'Testing...' : 'Run All Tests'}</span>
          </button>
        </div>

        {/* Configuration Display */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Current Configuration</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[#FF0000] mb-2">Spreadsheet Configuration</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Spreadsheet ID</p>
                  <p className="text-white font-mono text-xs break-all">{GOOGLE_SHEET.SPREADSHEET_ID}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Projects Sheet</p>
                  <p className="text-white font-mono text-xs">{GOOGLE_SHEET.SHEET_NAMES.PROJECTS_AND_JOBS}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Financial Sheet</p>
                  <p className="text-white font-mono text-xs">{GOOGLE_SHEET.SHEET_NAMES.FINANCIALS}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Process Sheet</p>
                  <p className="text-white font-mono text-xs">{GOOGLE_SHEET.SHEET_NAMES.PROCESS}</p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Todo Sheet</p>
                  <p className="text-white font-mono text-xs">{GOOGLE_SHEET.SHEET_NAMES.TODO}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Results */}
        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((result, index) => (
              <div key={index} className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
                <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
                  <h3 className="text-xl font-bold text-white">{result.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">Sheet: {result.sheetName}</p>
                </div>
                
                <div className="p-6">
                  <div className={`border rounded-xl p-4 ${
                    result.success 
                      ? 'border-green-500/30 bg-green-500/10' 
                      : 'border-red-500/30 bg-red-500/10'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold ${
                        result.success ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.success ? '✅' : '❌'} Sheet Access Test
                      </h4>
                    </div>
                    
                    {result.error ? (
                      <div className="text-red-300 text-sm">
                        <strong>Error:</strong> {result.error}
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-400">Rows Loaded:</span>
                            <span className="ml-2 text-green-400 font-semibold">{result.rowCount}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Headers Found:</span>
                            <span className="ml-2 text-white">{result.headers.length}</span>
                          </div>
                        </div>
                        
                        {result.headers.length > 0 && (
                          <div>
                            <span className="text-gray-400">Column Headers:</span>
                            <div className="mt-1 p-2 bg-gray-900/50 rounded font-mono text-xs text-gray-300 max-h-32 overflow-y-auto">
                              {result.headers.join(', ')}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {testing && (
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Testing all connection strategies...</p>
          </div>
        )}
      </div>
    </div>
  );
};