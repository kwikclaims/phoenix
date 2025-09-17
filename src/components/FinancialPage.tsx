import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { DollarSign, TrendingUp, RefreshCw, TrendingDown, Building, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { loadRowsBySheetName, type Row } from '../lib/sheetLoader';
import { GOOGLE_SHEET } from '../config/sheets';

interface FinancialMetrics {
  totalRevenue: string;
  totalProfit: string;
  companyProfit: string;
  leoProfit: string;
  zachProfit: string;
  lossesZachAbsorbed: string;
  totalPaidOut: string;
  totalDue: string;
}

interface FinancialPageProps {
  onNavigate?: (page: string) => void;
}

export const FinancialPage: React.FC<FinancialPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('prcs_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'phxrcs7') {
      localStorage.setItem('prcs_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-[#FF0000]/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">PRCS Finances Access</h1>
            <p className="text-gray-400">Enter password to access PRCS financial data</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError('');
                }}
                className={`w-full px-4 py-3 bg-gray-900/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-white placeholder-gray-500 ${
                  authError ? 'border-red-500' : 'border-gray-700 hover:border-blue-500/50'
                }`}
                placeholder="Enter PRCS password"
                autoFocus
              />
              {authError && (
                <p className="text-red-400 text-sm mt-2 animate-pulse">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95"
            >
              Access PRCS Finances
            </button>
          </form>
        </div>
      </div>
    );
  }

  const extractFinancialMetrics = (rows: Row[]): FinancialMetrics => {
    console.log("[FinancialPage] ===== STARTING METRIC EXTRACTION =====");
    console.log("[FinancialPage] Input rows for extraction:", JSON.stringify(rows, null, 2));
    
    if (!rows.length) {
      console.log("[FinancialPage] No rows to process");
      return {
        totalRevenue: '',
        totalProfit: '',
        companyProfit: '',
        leoProfit: '',
        zachProfit: '',
        lossesZachAbsorbed: '',
        totalPaidOut: '',
        totalDue: ''
      };
    }

    // Get the actual column names from the first row (which Papa.parse uses as headers)
    const columnNames = Object.keys(rows[0]);
    console.log("[FinancialPage] Detected column names:", columnNames);
    
    // The first column contains the metric names, second column contains the values
    const metricColumn = columnNames[0]; // This will be "Total Revenue: " based on your data
    const valueColumn = columnNames[1];  // This will be "$109,779.77" based on your data
    
    console.log(`[FinancialPage] Using metric column: "${metricColumn}"`);
    console.log(`[FinancialPage] Using value column: "${valueColumn}"`);

    // Extract Total Revenue from the column header itself (it's stored there in your sheet)
    const totalRevenueFromHeader = valueColumn; // The Total Revenue value is actually the column header
    console.log(`[FinancialPage] Total Revenue extracted from header: "${totalRevenueFromHeader}"`);

    const metrics: FinancialMetrics = {
      totalRevenue: totalRevenueFromHeader, // Use the value from the column header
      totalProfit: '',
      companyProfit: '',
      leoProfit: '',
      zachProfit: '',
      lossesZachAbsorbed: '',
      totalPaidOut: '',
      totalDue: ''
    };

    console.log("[FinancialPage] Initialized empty metrics object");
    
    // With range E2:F10, we expect rows with "Metric" and "Value" columns
    rows.forEach((row, rowIndex) => {
      console.log(`[FinancialPage] === PROCESSING ROW ${rowIndex + 1} ===`);
      const metric = (row[metricColumn] || '').toString().trim();
      const value = (row[valueColumn] || '').toString().trim();
      
      console.log(`[FinancialPage] Row ${rowIndex + 1}: Metric="${metric}", Value="${value}"`);
      
      if (!metric) return;
      
      const metricLower = metric.toLowerCase();
      
      if (metricLower.includes('total revenue') || metricLower === 'total revenue:') {
        metrics.totalRevenue = value;
        console.log(`[FinancialPage] Found Total Revenue: "${value}"`);
      } else if (metricLower.includes('total profit') || metricLower === 'total profit:') {
        metrics.totalProfit = value;
        console.log(`[FinancialPage] Found Total Profit: "${value}"`);
      } else if (metricLower.includes('company profit') || metricLower === 'company profit:') {
        metrics.companyProfit = value;
        console.log(`[FinancialPage] Found Company Profit: "${value}"`);
      } else if (metricLower.includes('leo profit') || metricLower === 'leo profit:') {
        metrics.leoProfit = value;
        console.log(`[FinancialPage] Found Leo Profit: "${value}"`);
      } else if (metricLower.includes('zach profit') || metricLower === 'zach profit:') {
        metrics.zachProfit = value;
        console.log(`[FinancialPage] Found Zach Profit: "${value}"`);
      } else if (metricLower.includes('losses zach') && (metricLower.includes('absorbed') || metricLower.includes('asborbed')) || metricLower === 'losses zach absorbed:' || metricLower === 'losses zach asborbed:') {
        metrics.lossesZachAbsorbed = value;
        console.log(`[FinancialPage] Found Losses Zach Absorbed: "${value}"`);
      } else if (metricLower.includes('total paid out') || metricLower === 'total paid out:') {
        metrics.totalPaidOut = value;
        console.log(`[FinancialPage] Found Total Paid Out: "${value}"`);
      } else if (metricLower.includes('total due') || metricLower === 'total due:') {
        metrics.totalDue = value;
        console.log(`[FinancialPage] Found Total Due: "${value}"`);
      } else {
        console.log(`[FinancialPage] ⚠️  Unmatched metric: "${metric}" (lowercase: "${metricLower}")`);
      }
    });

    console.log("[FinancialPage] ===== FINAL EXTRACTION RESULTS =====");
    Object.entries(metrics).forEach(([key, value]) => {
      console.log(`[FinancialPage] ${key}: "${value}"`);
      if (String(value).includes('X')) {
        console.log(`[FinancialPage] ⚠️  XXXXX ISSUE DETECTED in ${key}`);
      }
    });
    console.log("[FinancialPage] ===== END EXTRACTION RESULTS =====");
    
    console.log("[FinancialPage] Final extracted metrics:", metrics);
    return metrics;
  };

  const fetchFinancialData = async () => {
    setLoading(true);
    setError("");

    try {
      const targetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET.PRCS_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=PHOENIX NUMBERS&range=E1:F10`;
      console.log("[FinancialPage] Fetching data from exact URL:", targetUrl);
      const rows = await loadRowsBySheetName("PHOENIX NUMBERS", 'E1:F10');
      console.log("[FinancialPage] ===== RAW CSV DATA DEBUG =====");
      console.log("[FinancialPage] Number of rows received:", rows.length);
      console.log("[FinancialPage] Raw rows from PHOENIX NUMBERS sheet (E1:F10):", JSON.stringify(rows, null, 2));
      
      if (!rows.length) {
        throw new Error("No data found in PHOENIX NUMBERS sheet range E1:F10");
      }

      // Enhanced DEBUG: Show exactly what we're getting from the sheet
      console.log("[FinancialPage] ===== DETAILED CELL-BY-CELL ANALYSIS =====");
      const headers = Object.keys(rows[0] || {});
      console.log("[FinancialPage] Column headers detected:", headers);
      
      rows.forEach((row, index) => {
        console.log(`[FinancialPage] === ROW ${index + 1} (${index === 0 ? 'HEADER' : 'DATA'}) ===`);
        console.log(`[FinancialPage] Full row object:`, row);
        Object.entries(row).forEach(([key, value]) => {
          console.log(`[FinancialPage]   Column "${key}": "${value}" (type: ${typeof value}, length: ${String(value).length})`);
          if (String(value).includes('X')) {
            console.log(`[FinancialPage]   ⚠️  XXXXX DETECTED in column "${key}"`);
          }
        });
      });
      console.log("[FinancialPage] ===== END DETAILED ANALYSIS =====");

      const extractedMetrics = extractFinancialMetrics(rows);
      console.log("[FinancialPage] ===== EXTRACTED METRICS =====");
      console.log("[FinancialPage] Final extracted metrics:", JSON.stringify(extractedMetrics, null, 2));
      console.log("[FinancialPage] ===== END EXTRACTED METRICS =====");
      
      setMetrics(extractedMetrics);
      setLastUpdated(new Date());
      
      console.log("[FinancialPage] Successfully loaded financial metrics");
      
    } catch (err: any) {
      console.error("[FinancialPage] Failed to load financial data:", err);
      setError(err.message || "Failed to load financial data");
      toast.error("Failed to load financial data from PHOENIX NUMBERS sheet range E1:F10");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const handleRefresh = async () => {
    try {
      await fetchFinancialData();
      toast.success("Financial data refreshed successfully");
    } catch (err) {
      toast.error("Failed to refresh financial data");
    }
  };

  const formatCurrency = (value: string): string => {
    if (!value || value.trim() === '') return '$0.00';
    
    // If it already contains a dollar sign, return as-is
    if (value.includes('$')) {
      return value;
    }
    
    // Try to format as currency if it's a number
    const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
    if (!isNaN(numericValue)) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(numericValue);
    }
    
    return value || '$0.00';
  };

  const getValueColor = (value: string): string => {
    if (value.includes('-') && !value.includes('$0')) {
      return 'text-red-400';
    }
    return 'text-green-400';
  };

  const MetricCard: React.FC<{ 
    title: string; 
    value: string; 
    icon?: React.ReactNode;
    colorClass?: string;
  }> = ({ title, value, icon, colorClass }) => (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-[#FF0000]/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className={`text-2xl font-bold ${colorClass || getValueColor(value)}`}>
        {value ? formatCurrency(value) : 'No data'}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-4">
            <DollarSign className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Failed to Load Financial Data</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => onNavigate?.('portal')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portal</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Financial Dashboard</h1>
          <p className="text-gray-400 mb-4">Real-time financial metrics from PHOENIX NUMBERS sheet (E1:F10)</p>
          <div className="flex items-center justify-center space-x-4">
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            )}
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-3 py-1 text-[#FF0000] hover:bg-[#FF0000]/10 rounded-lg transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {metrics && (
          <div className="space-y-8">
            {/* Revenue & Total Profit */}
            <section>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
                <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Revenue & Total Profit</h2>
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MetricCard 
                      title="Total Revenue" 
                      value={metrics.totalRevenue}
                      colorClass="text-green-400"
                    />
                    <MetricCard 
                      title="Total Profit" 
                      value={metrics.totalProfit}
                      colorClass="text-green-400"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Profit Distribution */}
            <section>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
                <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
                  <h2 className="text-2xl font-bold text-white">Profit Distribution</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard 
                      title="Company Profit" 
                      value={metrics.companyProfit}
                      icon={<Building className="w-5 h-5" />}
                      colorClass="text-blue-400"
                    />
                    <MetricCard 
                      title="Leo Profit" 
                      value={metrics.leoProfit}
                      colorClass="text-purple-400"
                    />
                    <MetricCard 
                      title="Zach Profit" 
                      value={metrics.zachProfit}
                      colorClass="text-cyan-400"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Losses & Expenses */}
            <section>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
                <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Losses & Expenses</h2>
                    <TrendingDown className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MetricCard 
                      title="Losses Zach Absorbed" 
                      value={metrics.lossesZachAbsorbed}
                      colorClass="text-red-400"
                    />
                    <MetricCard 
                      title="Total Paid Out" 
                      value={metrics.totalPaidOut}
                      colorClass="text-orange-400"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Current Balance */}
            <section>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
                <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
                  <h2 className="text-2xl font-bold text-white">Current Balance</h2>
                </div>
                
                <div className="p-6">
                  <div className="bg-gray-900/50 rounded-2xl p-8 text-center border border-gray-700/50">
                    <h3 className="text-lg font-medium text-gray-400 mb-4 uppercase tracking-wide">Total Due</h3>
                    <p className={`text-5xl font-bold ${getValueColor(metrics.totalDue)}`}>
                      {formatCurrency(metrics.totalDue)}
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      {metrics.totalDue.includes('-') ? 'Amount owed' : 'Amount receivable'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary Stats */}
            <section>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-6">Financial Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Data Source</p>
                      <p className="text-xl font-bold text-[#FF0000]">PHOENIX NUMBERS Sheet</p>
                      <p className="text-xs text-gray-500 mt-1">Range: E1:F10</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Metrics Tracked</p>
                      <p className="text-xl font-bold text-white">10 Fields</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Last Refresh</p>
                      <p className="text-sm text-[#FF0000] font-medium">
                        {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Empty State */}
        {!loading && !metrics && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-12 h-12 text-[#FF0000]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No financial data found</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Unable to load financial metrics from the PHOENIX NUMBERS sheet range E1:F10.
            </p>
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-[#FF0000] text-white rounded-xl hover:bg-[#FF0000]/80 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};