import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { DollarSign, TrendingUp, RefreshCw, TrendingDown, Building, Zap, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { loadRowsBySheetName, type Row } from '../lib/sheetLoader';
import { GOOGLE_SHEET } from '../config/sheets';

interface KwikFinancialMetrics {
  totalRevenue: string;
  totalProfit: string;
  totalExpenses: string;
  zachProfit: string;
  companyProfit: string;
  totalPaidOut: string;
  totalDue: string;
}

interface KwikClaimsFinancialPageProps {
  onNavigate?: (page: string) => void;
}

export const KwikClaimsFinancialPage: React.FC<KwikClaimsFinancialPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('kwik_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [metrics, setMetrics] = useState<KwikFinancialMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'Ihave2Ms') {
      localStorage.setItem('kwik_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen p-4">
        {/* Back Button */}
        <button
          onClick={() => onNavigate?.('portal')}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portal</span>
        </button>

        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-8 border border-[#FF0000]/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-[#FF0000]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Kwik Claims Finances Access</h1>
            <p className="text-gray-400">Enter password to access Kwik Claims financial data</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#FF0000] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError('');
                }}
                className={`w-full px-4 py-3 bg-gray-900/50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] transition-all duration-300 text-white placeholder-gray-500 ${
                  authError ? 'border-red-500' : 'border-gray-700 hover:border-[#FF0000]/50'
                }`}
                placeholder="Enter Kwik Claims password"
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
              className="w-full bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white py-3 rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold transform hover:scale-105 active:scale-95"
            >
              Access Kwik Claims Finances
            </button>
          </form>
        </div>
      </div>
        </div>
    );
  }

  const extractFinancialMetrics = (rows: Row[]): KwikFinancialMetrics => {
    console.log("[KwikClaimsFinancialPage] ===== STARTING METRIC EXTRACTION =====");
    console.log("[KwikClaimsFinancialPage] Input rows for extraction:", JSON.stringify(rows, null, 2));
    
    if (!rows.length) {
      console.log("[KwikClaimsFinancialPage] No rows to process");
      return {
        totalRevenue: '',
        totalProfit: '',
        totalExpenses: '',
        zachProfit: '',
        companyProfit: '',
        totalPaidOut: '',
        totalDue: ''
      };
    }

    // Get the actual column names from the first row (which Papa.parse uses as headers)
    const columnNames = Object.keys(rows[0]);
    console.log("[KwikClaimsFinancialPage] Detected column names:", columnNames);
    
    // The first column contains the metric names, second column contains the values
    const metricColumn = columnNames[0]; // This will be "Kwik Claims Inc." based on your data
    const valueColumn = columnNames[1];  // This will contain the values
    
    console.log(`[KwikClaimsFinancialPage] Using metric column: "${metricColumn}"`);
    console.log(`[KwikClaimsFinancialPage] Using value column: "${valueColumn}"`);

    // Extract Total Revenue from the column header itself if it's stored there
    const totalRevenueFromHeader = valueColumn.includes('Total Revenue:') ? valueColumn : '';
    console.log(`[KwikClaimsFinancialPage] Total Revenue from header: "${totalRevenueFromHeader}"`);

    const metrics: KwikFinancialMetrics = {
      totalRevenue: totalRevenueFromHeader,
      totalProfit: '',
      totalExpenses: '',
      zachProfit: '',
      companyProfit: '',
      totalPaidOut: '',
      totalDue: ''
    };

    console.log("[KwikClaimsFinancialPage] Initialized empty metrics object");
    
    // Process each row to extract metrics
    rows.forEach((row, rowIndex) => {
      console.log(`[KwikClaimsFinancialPage] === PROCESSING ROW ${rowIndex + 1} ===`);
      const metric = (row[metricColumn] || '').toString().trim();
      const value = (row[valueColumn] || '').toString().trim();
      
      console.log(`[KwikClaimsFinancialPage] Row ${rowIndex + 1}: Metric="${metric}", Value="${value}"`);
      
      if (!metric) return;
      
      const metricLower = metric.toLowerCase();
      
      if (metricLower.includes('total revenue') || metricLower === 'total revenue:') {
        metrics.totalRevenue = value;
        console.log(`[KwikClaimsFinancialPage] Found Total Revenue: "${value}"`);
      } else if (metricLower.includes('total profit') || metricLower === 'total profit:') {
        metrics.totalProfit = value;
        console.log(`[KwikClaimsFinancialPage] Found Total Profit: "${value}"`);
      } else if (metricLower.includes('total expenses') || metricLower === 'total expenses:') {
        metrics.totalExpenses = value;
        console.log(`[KwikClaimsFinancialPage] Found Total Expenses: "${value}"`);
      } else if (metricLower.includes('zach profit') || metricLower === 'zach profit:') {
        metrics.zachProfit = value;
        console.log(`[KwikClaimsFinancialPage] Found Zach Profit: "${value}"`);
      } else if (metricLower.includes('company profit') || metricLower === 'company profit:') {
        metrics.companyProfit = value;
        console.log(`[KwikClaimsFinancialPage] Found Company Profit: "${value}"`);
      } else if (metricLower.includes('total paid out') || metricLower === 'total paid out') {
        metrics.totalPaidOut = value;
        console.log(`[KwikClaimsFinancialPage] Found Total Paid Out: "${value}"`);
      } else if (metricLower.includes('total due') || metricLower === 'total due:') {
        metrics.totalDue = value;
        console.log(`[KwikClaimsFinancialPage] Found Total Due: "${value}"`);
      } else {
        console.log(`[KwikClaimsFinancialPage] ⚠️  Unmatched metric: "${metric}" (lowercase: "${metricLower}")`);
      }
    });

    console.log("[KwikClaimsFinancialPage] ===== FINAL EXTRACTION RESULTS =====");
    Object.entries(metrics).forEach(([key, value]) => {
      console.log(`[KwikClaimsFinancialPage] ${key}: "${value}"`);
    });
    console.log("[KwikClaimsFinancialPage] ===== END EXTRACTION RESULTS =====");
    
    return metrics;
  };

  const fetchFinancialData = async () => {
    setLoading(true);
    setError("");

    try {
      const targetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET.PRCS_SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=KWIK NUMBERS&range=E1:F10`;
      console.log("[KwikClaimsFinancialPage] Fetching data from exact URL:", targetUrl);
      const rows = await loadRowsBySheetName("KWIK NUMBERS", 'E1:F10');
      console.log("[KwikClaimsFinancialPage] ===== RAW CSV DATA DEBUG =====");
      console.log("[KwikClaimsFinancialPage] Number of rows received:", rows.length);
      console.log("[KwikClaimsFinancialPage] Raw rows from KWIK NUMBERS sheet (E1:F10):", JSON.stringify(rows, null, 2));
      
      if (!rows.length) {
        throw new Error("No data found in KWIK NUMBERS sheet range E1:F10");
      }

      // Enhanced DEBUG: Show exactly what we're getting from the sheet
      console.log("[KwikClaimsFinancialPage] ===== DETAILED CELL-BY-CELL ANALYSIS =====");
      const headers = Object.keys(rows[0] || {});
      console.log("[KwikClaimsFinancialPage] Column headers detected:", headers);
      
      rows.forEach((row, index) => {
        console.log(`[KwikClaimsFinancialPage] === ROW ${index + 1} (${index === 0 ? 'HEADER' : 'DATA'}) ===`);
        console.log(`[KwikClaimsFinancialPage] Full row object:`, row);
        Object.entries(row).forEach(([key, value]) => {
          console.log(`[KwikClaimsFinancialPage]   Column "${key}": "${value}" (type: ${typeof value}, length: ${String(value).length})`);
        });
      });
      console.log("[KwikClaimsFinancialPage] ===== END DETAILED ANALYSIS =====");

      const extractedMetrics = extractFinancialMetrics(rows);
      console.log("[KwikClaimsFinancialPage] ===== EXTRACTED METRICS =====");
      console.log("[KwikClaimsFinancialPage] Final extracted metrics:", JSON.stringify(extractedMetrics, null, 2));
      console.log("[KwikClaimsFinancialPage] ===== END EXTRACTED METRICS =====");
      
      setMetrics(extractedMetrics);
      setLastUpdated(new Date());
      
      console.log("[KwikClaimsFinancialPage] Successfully loaded financial metrics");
      
    } catch (err: any) {
      console.error("[KwikClaimsFinancialPage] Failed to load financial data:", err);
      setError(err.message || "Failed to load financial data");
      toast.error("Failed to load financial data from KWIK NUMBERS sheet range E1:F10");
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
      toast.success("Kwik Claims financial data refreshed successfully");
    } catch (err) {
      toast.error("Failed to refresh Kwik Claims financial data");
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
          <p className="text-white text-lg">Loading Kwik Claims financial data...</p>
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
          <h2 className="text-xl font-bold text-red-800 mb-2">Failed to Load Kwik Claims Financial Data</h2>
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
            <Zap className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Kwik Claims Financial Dashboard</h1>
          <p className="text-gray-400 mb-4">Real-time financial metrics from KWIK NUMBERS sheet (E1:F10)</p>
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

            {/* Expenses */}
            <section>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
                <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Expenses</h2>
                    <TrendingDown className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <MetricCard 
                      title="Total Expenses" 
                      value={metrics.totalExpenses}
                      colorClass="text-red-400"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MetricCard 
                      title="Zach Profit" 
                      value={metrics.zachProfit}
                      colorClass="text-cyan-400"
                    />
                    <MetricCard 
                      title="Company Profit" 
                      value={metrics.companyProfit}
                      icon={<Building className="w-5 h-5" />}
                      colorClass="text-blue-400"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payments */}
            <section>
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden">
                <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
                  <h2 className="text-2xl font-bold text-white">Payments</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
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
                      <p className="text-xl font-bold text-[#FF0000]">KWIK NUMBERS Sheet</p>
                      <p className="text-xs text-gray-500 mt-1">Range: E1:F10</p>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4">
                      <p className="text-gray-400 text-sm">Metrics Tracked</p>
                      <p className="text-xl font-bold text-white">7 Fields</p>
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
              <Zap className="w-12 h-12 text-[#FF0000]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Kwik Claims financial data found</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Unable to load financial metrics from the KWIK NUMBERS sheet range E1:F10.
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