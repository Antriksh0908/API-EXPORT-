import React, { useState } from 'react';

interface ActivityLogItem {
  id: string;
  time: string;
  category: 'CRAWLER' | 'QUALITY' | 'OUTREACH' | 'EXPORT';
  operator: string;
  title: string;
  detail: string;
  badgeColor: string;
}

export const ActivityLogView: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'CRAWLER' | 'QUALITY' | 'OUTREACH' | 'EXPORT'>('ALL');

  const [logs] = useState<ActivityLogItem[]>([
    {
      id: 'log-1',
      time: '14:22:04 (2 mins ago)',
      category: 'CRAWLER',
      operator: 'Autonomous Daemon',
      title: 'Discovered Pure Resonance Studio via LinkedIn Sales Nav',
      detail: 'Parsed Julian Vance (Purchasing Director) in Austin, TX. Direct email verified deliverable via SMTP handshake.',
      badgeColor: 'bg-[#0077b5]/10 text-[#0077b5] border-[#0077b5]/20'
    },
    {
      id: 'log-2',
      time: '14:15:30 (9 mins ago)',
      category: 'QUALITY',
      operator: 'Pema T. (Ops)',
      title: 'Batch Quality Verified: 6 North American Studios Approved',
      detail: 'Passed 5-point verification check for The Sound Space NYC, Sage & Sound LA, and Himalayan Arts CO.',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'log-3',
      time: '13:40:12 (44 mins ago)',
      category: 'OUTREACH',
      operator: 'Pema T. (Ops)',
      title: 'Personalized AI Outreach Sequence Dispatched',
      detail: 'Sent Day-0 Patan 432Hz Provenance pitch to Elena Rostova (The Sound Space NYC). Open tracked at 13:44.',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'log-4',
      time: '12:10:00 (2.2 hrs ago)',
      category: 'EXPORT',
      operator: 'Kathmandu Warehouse',
      title: 'Physical Master Sample Dispatched via DHL Express',
      detail: 'Waybill #DHL-KTM-992182: 8" Patan 432Hz Master Singing Bowl dispatched to Sedona Sacred Resonance, AZ.',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'log-5',
      time: '11:30:45 (3 hrs ago)',
      category: 'CRAWLER',
      operator: 'Autonomous Daemon',
      title: 'Shopify SKU Margin Scanner Completed Colorado Sweep',
      detail: 'Analyzed 42 metaphysical storefronts along the Front Range. Average retail markup over Nepal FOB: 3.4x.',
      badgeColor: 'bg-[#0077b5]/10 text-[#0077b5] border-[#0077b5]/20'
    },
    {
      id: 'log-6',
      time: '09:15:20 (5.2 hrs ago)',
      category: 'QUALITY',
      operator: 'Pema T. (Ops)',
      title: 'State Business Registry Scrub (CA & NY)',
      detail: 'Verified LLC standing for 84 active wholesale leads. Removed 2 inactive entities.',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ]);

  const displayedLogs = filter === 'ALL' ? logs : logs.filter((l) => l.category === filter);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 tracking-wider">
            <span>Audit Trail & Operations</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#9b4500]">Apprentice & Operator Workflow</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 mt-1">
            Internship Activity & Audit Log
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Immutable audit record of crawler executions, lead verification reviews, outbound outreach sequences, and physical sample shipments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert('Exporting audit log report as CSV...')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2 text-xs">
        <button
          type="button"
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'ALL' ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All Activity ({logs.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('CRAWLER')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'CRAWLER' ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Crawler Ingest
        </button>
        <button
          type="button"
          onClick={() => setFilter('QUALITY')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'QUALITY' ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Quality Audits
        </button>
        <button
          type="button"
          onClick={() => setFilter('OUTREACH')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'OUTREACH' ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          AI Sequences
        </button>
        <button
          type="button"
          onClick={() => setFilter('EXPORT')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
            filter === 'EXPORT' ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Export Shipments
        </button>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 divide-y divide-slate-100">
        {displayedLogs.map((item) => (
          <div key={item.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-[#9b4500]">
              <span className="material-symbols-outlined text-[18px]">
                {item.category === 'CRAWLER'
                  ? 'radar'
                  : item.category === 'QUALITY'
                  ? 'verified'
                  : item.category === 'OUTREACH'
                  ? 'forward_to_inbox'
                  : 'local_shipping'}
              </span>
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${item.badgeColor}`}>
                    {item.category}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{item.time}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>

              <div className="text-[10px] text-slate-400 font-mono pt-0.5">
                Logged by: <strong className="text-slate-700">{item.operator}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
