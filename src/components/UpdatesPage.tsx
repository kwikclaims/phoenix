import { useEffect, useMemo, useState } from "react";
import { Bell, Plus, Trash2, Calendar, ArrowLeft } from 'lucide-react';
import { loadUpdates, saveUpdates, type UpdateItem } from "../lib/storage";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const UpdatesPage: React.FC = () => {
  const [items, setItems] = useState<UpdateItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");

  // Load updates from localStorage on mount
  useEffect(() => {
    setItems(loadUpdates());
  }, []);

  // Save updates to localStorage whenever items change
  useEffect(() => {
    saveUpdates(items);
  }, [items]);

  const sorted = useMemo(
    () => [...items].sort((a, b) => b.createdAt - a.createdAt),
    [items]
  );

  function addUpdate(e: React.FormEvent) {
    e.preventDefault();
    const text = description.trim();
    if (!text) return;
    const next: UpdateItem = { id: uid(), description: text, createdAt: Date.now() };
    setItems((prev) => [next, ...prev]);
    setDescription("");
    setShowForm(false);
  }

  function deleteUpdate(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Portal</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Bell className="w-10 h-10 text-[#FF0000]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Updates</h1>
          <p className="text-gray-400 mb-4">Manage your update reminders and notifications</p>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold transform hover:scale-105 mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>{showForm ? "Cancel" : "Add Update"}</span>
          </button>
        </div>

        {/* Add Update Form */}
        {showForm && (
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6 mb-8">
            <form onSubmit={addUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#FF0000] mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe the reminder (job/system/project)"
                  className="w-full min-h-[100px] px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-gradient-to-r from-[#FF0000] to-[#C20F1F] text-white rounded-xl hover:shadow-lg hover:shadow-[#FF0000]/25 transition-all duration-300 font-semibold transform hover:scale-105"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDescription("");
                    setShowForm(false);
                  }}
                  className="px-6 py-3 bg-gray-900/50 border border-gray-700 text-white rounded-xl hover:border-red-500/50 hover:text-red-400 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Updates List */}
        {sorted.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bell className="w-12 h-12 text-[#FF0000]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No updates yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Click "Add Update" to create your first reminder.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sorted.map((update, index) => (
              <div
                key={update.id}
                className="bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 overflow-hidden hover:border-[#FF0000]/40 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FF0000]/20 to-[#C20F1F]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📢</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-3">
                          {update.description}
                        </p>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400">
                            {new Date(update.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteUpdate(update.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                      aria-label="Delete update"
                      title="Delete update"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="mt-8 bg-black/60 backdrop-blur-xl rounded-2xl border border-[#FF0000]/20 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Updates Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Total Updates</p>
                <p className="text-2xl font-bold text-[#FF0000]">{items.length}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Data Source</p>
                <p className="text-xl font-bold text-white">Local Storage</p>
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