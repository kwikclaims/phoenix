import React, { useState, useEffect } from 'react';
import { CheckSquare, RefreshCw, User, MapPin, Clock, Calendar, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { loadRowsBySheetName, type Row } from '../lib/sheetLoader';
import { GOOGLE_SHEET } from '../config/sheets';

interface TodoItem {
  id: string;
  task: string;
  customer: string;
  address: string;
  action: string;
}

interface AdjusterMeeting {
  id: string;
  meetingInfo: string;
  customer: string;
  date: string;
}

interface TodoPageProps {
  onNavigate?: (page: string) => void;
}

export const TodoPage: React.FC<TodoPageProps> = ({ onNavigate }) => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [adjusterMeetings, setAdjusterMeetings] = useState<AdjusterMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const parseTodoFromRow = (row: Row, index: number): TodoItem | null => {
    // Get all values from the row to find todo items
    const allValues = Object.values(row);
    const allKeys = Object.keys(row);
    
    console.log(`[TodoPage] Row ${index + 1} keys:`, allKeys);
    console.log(`[TodoPage] Row ${index + 1} values:`, allValues);
    
    // Look for any cell that contains "To-Do" or "TODO"
    let todoText = '';
    let todoColumnKey = '';
    
    for (const [key, value] of Object.entries(row)) {
      const cellValue = (value || '').toString().trim();
      if (cellValue.toLowerCase().includes('to-do') || cellValue.toLowerCase().includes('todo')) {
        todoText = cellValue;
        todoColumnKey = key;
        console.log(`[TodoPage] Found todo in column "${key}": "${cellValue}"`);
        break;
      }
    }
    
    if (!todoText) {
      console.log(`[TodoPage] No todo found in row ${index + 1}`);
      return null;
    }

    console.log(`[TodoPage] Found todo item in row ${index + 1}:`, todoText);
    
    // Parse the format: "To-Do: [Action] for [Customer] at [Address]"
    const cleanText = todoText.replace(/^To-Do\s*:?\s*/i, '').trim();
    const todoMatch = cleanText.match(/^(.+?)\s+for\s+(.+?)\s+at\s+(.+?)\.?$/i);
    
    if (todoMatch) {
      const [, action, customer, address] = todoMatch;
      console.log(`[TodoPage] Parsed - Action: "${action}", Customer: "${customer}", Address: "${address}"`);
      return {
        id: `todo-${index + 1}`,
        task: todoText,
        customer: customer.trim(),
        address: address.trim(),
        action: action.trim()
      };
    }

    // If it doesn't match the expected format but starts with "To-Do:", include it with fallback values
    console.log(`[TodoPage] Todo item doesn't match expected format, using fallback for:`, todoText);
    return {
      id: `todo-${index + 1}`,
      task: todoText,
      customer: 'Unknown',
      address: 'Unknown',
      action: cleanText || 'Unknown action'
    };
  };

  const parseAdjusterMeetingFromRow = (row: Row, index: number): AdjusterMeeting | null => {
    // Look for any cell that contains "meeting" or "adjuster"
    let meetingText = '';
    let meetingColumnKey = '';
    
    for (const [key, value] of Object.entries(row)) {
      const cellValue = (value || '').toString().trim();
      if (cellValue.toLowerCase().includes('meeting') || cellValue.toLowerCase().includes('adjuster')) {
        meetingText = cellValue;
        meetingColumnKey = key;
        console.log(`[TodoPage] Found meeting in column "${key}": "${cellValue}"`);
        break;
      }
    }
    
    if (!meetingText) {
      console.log(`[TodoPage] No meeting found in row ${index + 1}`);
      return null;
    }

    console.log(`[TodoPage] Found adjuster meeting in row ${index + 1}:`, meetingText);
    
    // Parse the format: try to extract customer and date information from any text in Column C
    // Format could be: "Meeting with [Customer] on [Date]" or any other meeting-related text
    const meetingMatch = meetingText.match(/meeting\s+with\s+(.+?)\s+on\s+(.+?)$/i);
    
    if (meetingMatch) {
      const [, customer, date] = meetingMatch;
      console.log(`[TodoPage] Parsed meeting - Customer: "${customer}", Date: "${date}"`);
      return {
        id: `meeting-${index + 1}`,
        meetingInfo: meetingText,
        customer: customer.trim(),
        date: date.trim()
      };
    }

    // If it doesn't match the expected format but has content in Column C, include it as a meeting
    console.log(`[TodoPage] Meeting doesn't match expected format, using fallback for:`, meetingText);
    return {
      id: `meeting-${index + 1}`,
      meetingInfo: meetingText,
      customer: '',
      date: ''
    };
  };

  const fetchTodoData = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("[TodoPage] Fetching from TODO sheet...");
      const rows = await loadRowsBySheetName(GOOGLE_SHEET.SHEET_NAMES.TODO);
      console.log("[TodoPage] Raw rows:", rows);
      
      if (!rows.length) {
        throw new Error("No data found in TODO sheet");
      }
      
      // Debug: Show the structure of the first few rows
      console.log("[TodoPage] ===== SHEET STRUCTURE DEBUG =====");
      rows.slice(0, 3).forEach((row, index) => {
        console.log(`[TodoPage] Row ${index + 1} structure:`, row);
        console.log(`[TodoPage] Row ${index + 1} keys:`, Object.keys(row));
        console.log(`[TodoPage] Row ${index + 1} values:`, Object.values(row));
      });
      console.log("[TodoPage] ===== END STRUCTURE DEBUG =====");
      
      // If no data found, show what we got
      if (rows.length === 0) {
        console.error("[TodoPage] No rows returned from TODO sheet");
        throw new Error("TODO sheet appears to be empty");
      }

      // Parse rows into todo items
      const parsedTodos = rows
        .map((row, index) => {
          console.log(`[TodoPage] Processing row ${index + 1}:`, row);
          return parseTodoFromRow(row, index);
        })
        .filter((item): item is TodoItem => item !== null);

      // Parse rows into adjuster meetings
      const parsedMeetings = rows
        .map((row, index) => {
          console.log(`[TodoPage] Checking Column C in row ${index + 1} for meetings:`, row);
          return parseAdjusterMeetingFromRow(row, index);
        })
        .filter((item): item is AdjusterMeeting => item !== null);

      console.log(`[TodoPage] Found ${parsedTodos.length} todo items:`, parsedTodos);
      console.log(`[TodoPage] Found ${parsedMeetings.length} adjuster meetings:`, parsedMeetings);
      setTodoItems(parsedTodos);
      setAdjusterMeetings(parsedMeetings);
      setLastUpdated(new Date());
      
    } catch (err: any) {
      console.error("[TodoPage] Failed to load todo data:", err);
      setError(err.message || "Failed to load todo data");
      toast.error("Failed to load todo data from Google Sheets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  const handleRefresh = async () => {
    try {
      await fetchTodoData();
      toast.success("Todo list refreshed successfully");
    } catch (err) {
      toast.error("Failed to refresh todo list");
    }
  };

  const getActionIcon = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('payment') || actionLower.includes('track')) {
      return '💰';
    }
    if (actionLower.includes('follow up') || actionLower.includes('review')) {
      return '📞';
    }
    if (actionLower.includes('guide') || actionLower.includes('choose') || actionLower.includes('materials')) {
      return '🏗️';
    }
    return '📋';
  };

  const getActionColor = (action: string) => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('payment') || actionLower.includes('track')) {
      return 'text-green-400';
    }
    if (actionLower.includes('follow up') || actionLower.includes('review')) {
      return 'text-blue-400';
    }
    if (actionLower.includes('guide') || actionLower.includes('choose') || actionLower.includes('materials')) {
      return 'text-purple-400';
    }
    return 'text-[#FF0000]';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading to-do list...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-4">
            <CheckSquare className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Failed to Load To-Do List</h2>
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
      <div className="max-w-4xl mx-auto">
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
            <CheckSquare className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">To-Do List</h1>
          <p className="text-gray-400 mb-4">Current tasks from Google Sheets</p>
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

        {/* To-Do Items */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden mb-8">
          <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Active Tasks</h2>
              <span className="text-[#FF0000] font-semibold">{todoItems.length} items</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-700/50">
            {todoItems.map((item, index) => (
              <div
                key={item.id}
                className="p-6 hover:bg-[#FF0000]/5 transition-colors"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#FF0000]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg">{getActionIcon(item.action)}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className={`text-lg font-semibold ${getActionColor(item.action)} mb-1`}>
                        {item.action}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {item.task}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-white font-medium">{item.customer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{item.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Pending</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Adjuster Meetings */}
        <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden mb-8">
          <div className="bg-black/40 border-b border-[#FF0000]/20 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Upcoming Adjuster Meetings</h2>
              <span className="text-[#FF0000] font-semibold">{adjusterMeetings.length} meetings</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-700/50">
            {adjusterMeetings.map((meeting, index) => (
              <div
                key={meeting.id}
                className="p-6 hover:bg-[#FF0000]/5 transition-colors"
                style={{
                  animationDelay: `${(todoItems.length + index) * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-lg">🤝</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-400 mb-1">
                        Adjuster Meeting
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {meeting.meetingInfo}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {meeting.customer && (
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-white font-medium">{meeting.customer}</span>
                        </div>
                      )}
                      {meeting.date && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{meeting.date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Scheduled</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty state for meetings */}
          {adjusterMeetings.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Upcoming Meetings</h3>
              <p className="text-gray-400">No adjuster meetings found in Column C of the TODO sheet.</p>
            </div>
          )}
        </div>
        {/* Empty State */}
        {todoItems.length === 0 && adjusterMeetings.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckSquare className="w-12 h-12 text-[#FF0000]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No tasks or meetings found</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              No to-do items or adjuster meetings could be loaded from the Google Sheet.
            </p>
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-[#FF0000] text-white rounded-xl hover:bg-[#FF0000]/80 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        )}

        {/* Summary */}
        <div className="mt-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Task Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-[#FF0000]">{todoItems.length}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Adjuster Meetings</p>
                <p className="text-2xl font-bold text-blue-400">{adjusterMeetings.length}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Data Source</p>
                <p className="text-xl font-bold text-white">Google Sheets</p>
              </div>
            </div>
            <div className="mt-4 bg-gray-900/50 rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">TODO Sheet Column A</p>
                  <p className="text-white font-medium">Active Tasks</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">TODO Sheet Column C</p>
                  <p className="text-white font-medium">Adjuster Meetings</p>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-900/50 rounded-xl p-4 text-center">
              <div>
                <p className="text-gray-400 text-sm">Last Refresh</p>
                <p className="text-sm text-[#FF0000] font-medium">
                  {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};