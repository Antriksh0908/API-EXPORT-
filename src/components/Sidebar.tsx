import React from 'react';

export type NavTab = 
  | 'lead-discovery' 
  | 'verification-quality' 
  | 'buyer-master-directory' 
  | 'ai-outreach-staging' 
  | 'gmail-sequence-hub' 
  | 'response-inbox' 
  | 'export-analytics' 
  | 'internship-activity-log';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  liveLeadCount: number;
  pendingCount: number;
  inboxCount: number;
  harvesterActive: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  liveLeadCount,
  pendingCount,
  inboxCount,
  harvesterActive,
}) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#ffffff] flex flex-col z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#e2e8f0] overflow-y-auto">
      {/* Brand Header */}
      <div className="p-4 bg-[#ffffff]">
        <div className="flex items-center gap-2">
          <img
            alt="Resonance Export Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1V_MaaGmr6xIwtP2twCZgwpqBEyo7R8-URsM4KKiRAACBQWx5hXN1xc-bkJJBNt-rSAMvKKa_R10HsrzEuCS_bp0fEylPg2F_Fdn1DC6xieQ6cCGCWDLupoxJFwbm2IQzYrb3kh8ZxO4DIEjzxc9vBKxg5zWiUdXLL9Vay78MupobUMT8lFuJYFiTh0zT0bawG-4rLUhP9FtxFHbMPzo60GxJfktlx7RcZZR8UgxzEqYly8z3-8b8fFBEQ"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#191c1e] tracking-tight truncate">
              Resonance Export
            </span>
            <span className="text-[11px] font-medium text-[#45464d] truncate">
              US Market Intelligence
            </span>
          </div>
        </div>

        {/* Workspace Switcher Card */}
        <div className="mt-3 p-2.5 bg-[#f2f4f6] rounded-lg border border-[#e2e8f0]/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[#45464d] uppercase tracking-wider">
              Active Workspace
            </span>
            <span className="material-symbols-outlined text-[#76777d] text-[16px]">
              unfold_more
            </span>
          </div>
          <p className="text-xs font-semibold text-[#191c1e] truncate mt-1">
            US Wholesale Pipeline 2025
          </p>
          <p className="text-[11px] text-[#9b4500] truncate flex items-center gap-1.5 mt-0.5 font-medium">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                harvesterActive ? 'bg-[#10b981] animate-ping' : 'bg-slate-400'
              }`}
            />
            {harvesterActive ? 'Autonomous Harvester Live' : 'Harvester Suspended'}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-5">
        {/* Group 1: Lead Operations */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase text-[#76777d] tracking-wider">
            Lead Operations
          </div>
          <button
            type="button"
            onClick={() => onTabChange('lead-discovery')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
              activeTab === 'lead-discovery'
                ? 'bg-[#0f172a] text-[#ffffff] font-semibold shadow-sm'
                : 'text-[#45464d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0">
                radar
              </span>
              <span className="text-xs truncate">Real-Time Multi-Web Harvester</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#9b4500] text-white flex items-center gap-1 font-semibold shrink-0 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {liveLeadCount.toLocaleString()} Live
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('verification-quality')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
              activeTab === 'verification-quality'
                ? 'bg-[#0f172a] text-[#ffffff] font-semibold shadow-sm'
                : 'text-[#45464d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0">
                verified
              </span>
              <span className="text-xs truncate">Verification & Quality</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ffdbca] text-[#331200] font-semibold shrink-0 ml-1">
              {pendingCount} Pending
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('buyer-master-directory')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
              activeTab === 'buyer-master-directory'
                ? 'bg-[#0f172a] text-[#ffffff] font-semibold shadow-sm'
                : 'text-[#45464d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0">
                store
              </span>
              <span className="text-xs truncate">Buyer Master Directory</span>
            </div>
          </button>
        </div>

        {/* Group 2: Campaigns & Outreach */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase text-[#76777d] tracking-wider">
            Campaigns & Outreach
          </div>
          <button
            type="button"
            onClick={() => onTabChange('ai-outreach-staging')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
              activeTab === 'ai-outreach-staging'
                ? 'bg-[#0f172a] text-[#ffffff] font-semibold shadow-sm'
                : 'text-[#45464d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0">
                auto_awesome
              </span>
              <span className="text-xs truncate">AI Outreach Staging</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('gmail-sequence-hub')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
              activeTab === 'gmail-sequence-hub'
                ? 'bg-[#0f172a] text-[#ffffff] font-semibold shadow-sm'
                : 'text-[#45464d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0">
                forward_to_inbox
              </span>
              <span className="text-xs truncate">Gmail Sequence Hub</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('response-inbox')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
              activeTab === 'response-inbox'
                ? 'bg-[#0f172a] text-[#ffffff] font-semibold shadow-sm'
                : 'text-[#45464d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0">
                mark_email_unread
              </span>
              <span className="text-xs truncate">Response Inbox</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#9b4500] text-white font-semibold shrink-0 ml-1">
              {inboxCount} New
            </span>
          </button>
        </div>

        {/* Group 3: Performance & Reporting */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase text-[#76777d] tracking-wider">
            Performance & Reporting
          </div>
          <button
            type="button"
            onClick={() => onTabChange('export-analytics')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
              activeTab === 'export-analytics'
                ? 'bg-[#0f172a] text-[#ffffff] font-semibold shadow-sm'
                : 'text-[#45464d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0">
                analytics
              </span>
              <span className="text-xs truncate">Export Analytics</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('internship-activity-log')}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition-colors text-left ${
              activeTab === 'internship-activity-log'
                ? 'bg-[#0f172a] text-[#ffffff] font-semibold shadow-sm'
                : 'text-[#45464d] hover:bg-[#e6e8ea] hover:text-[#191c1e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0">
                receipt_long
              </span>
              <span className="text-xs truncate">Internship Activity Log</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Operator Status Footer */}
      <div className="p-3 bg-[#f2f4f6] border-t border-[#e2e8f0]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0 shadow-inner font-bold text-xs">
            AS
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#191c1e] truncate">
              Antriksh Sharma
            </p>
            <span className="text-[10px] text-[#0077b5] font-mono font-semibold truncate block">
              antrikssharma09@gmail.com
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mb-2 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real Gmail Sender Active</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-[11px] text-[#45464d]">
            <span>Auto-Crawler Ingest Quota</span>
            <span className="font-tabular-data font-semibold text-[#191c1e]">
              {liveLeadCount.toLocaleString()} / 2,000 (74%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#e0e3e5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9b4500] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((liveLeadCount / 2000) * 100))}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
