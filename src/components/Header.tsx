import React, { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  harvesterActive: boolean;
  onForceCrawlWave: () => void;
  isCrawlingWave: boolean;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  harvesterActive,
  onForceCrawlWave,
  isCrawlingWave,
  unreadCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-[#f7f9fb]/90 backdrop-blur-xl z-40 border-b border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 w-full px-6 flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#76777d] text-[18px]">
              search
            </span>
            <input
              className="w-full pl-9 pr-3 py-1.5 bg-[#ffffff] text-[#191c1e] text-xs rounded-lg outline-none border border-[#e2e8f0] focus:border-[#0f172a] placeholder:text-[#c6c6cd] shadow-[0_1px_3px_0_rgba(15,23,42,0.05)] transition-colors"
              placeholder="Search real-time parsed buyer web profiles (LinkedIn, Mindbody, Shopify, Google Places)..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Status Badges & Quick Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-[#f2f4f6] rounded-lg border border-[#e2e8f0]">
            <span className="material-symbols-outlined text-[#76777d] text-[16px]">
              sync_alt
            </span>
            <span className="text-[11px] text-[#191c1e] font-semibold">
              USD / FOB Kathmandu & Delhi
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
            <span
              className={`w-2 h-2 rounded-full ${
                harvesterActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
              }`}
            />
            <span className="text-[11px] font-semibold">
              {harvesterActive ? 'Autonomous Web Stream: Live' : 'Web Stream: Paused'}
            </span>
          </div>

          <button
            type="button"
            disabled={isCrawlingWave}
            onClick={onForceCrawlWave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all shadow-sm ${
              isCrawlingWave
                ? 'bg-[#fd8a42] text-white opacity-80 cursor-wait'
                : 'bg-[#9b4500] hover:bg-[#763300] text-white'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                isCrawlingWave ? 'animate-spin' : ''
              }`}
            >
              sync
            </span>
            <span>{isCrawlingWave ? 'Crawling 50 States...' : 'Force Crawl Wave'}</span>
          </button>

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex items-center justify-center p-1.5 text-[#45464d] hover:text-[#191c1e] rounded-lg hover:bg-[#f2f4f6] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#9b4500] rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Autonomous Inflow Alerts
                  </span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold">
                    Socket Connected
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-semibold text-slate-900">
                      New High-Intent Buyer Discovered
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Pure Resonance Studio in Austin, TX was parsed from LinkedIn Sales Nav with 97% affinity.
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      2 mins ago
                    </span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-semibold text-slate-900">
                      MX Record Verified
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Elena Rostova (The Sound Space NYC) direct corporate mailbox verified via SMTP handshake.
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      15 mins ago
                    </span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-semibold text-slate-900">
                      Shopify Catalog Margin Mapped
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Himalayan Arts & Crystals sells 10" Frosted Bowls at $320 retail ($95 FOB wholesale potential).
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                      32 mins ago
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1.5 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] text-[#9b4500] font-semibold hover:underline"
                  >
                    Close Alerts
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#0f172a] flex items-center justify-center shrink-0 border border-slate-300 shadow-sm">
            <span className="material-symbols-outlined text-white text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
