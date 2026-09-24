import React, { useState, useMemo } from 'react';
import { BuyerLead, CrawlerWorker, SocketFeedEvent, BuyerArchetype } from '../types';

interface HarvesterViewProps {
  leads: BuyerLead[];
  selectedLeadId: string;
  onSelectLead: (id: string) => void;
  onToggleLeadSelect: (id: string) => void;
  onSelectAllLeads: () => void;
  crawlerWorkers: CrawlerWorker[];
  onToggleWorker: (id: string) => void;
  socketEvents: SocketFeedEvent[];
  onClearSocketFeed: () => void;
  harvesterActive: boolean;
  onToggleHarvesterActive: () => void;
  onOpenShellModal: () => void;
  onOpenAddConnectorModal: () => void;
  onOpenPitchModal: (lead: BuyerLead) => void;
  onPushToVerificationQueue: (leadIds: string[]) => void;
  onRunBatchMxVerify: () => void;
  onRecrawlLead: (leadId: string) => void;
  onDiscardLead: (leadId: string) => void;
  onExportStream: () => void;
}

export const HarvesterView: React.FC<HarvesterViewProps> = ({
  leads,
  selectedLeadId,
  onSelectLead,
  onToggleLeadSelect,
  onSelectAllLeads,
  crawlerWorkers,
  onToggleWorker,
  socketEvents,
  onClearSocketFeed,
  harvesterActive,
  onToggleHarvesterActive,
  onOpenShellModal,
  onOpenAddConnectorModal,
  onOpenPitchModal,
  onPushToVerificationQueue,
  onRunBatchMxVerify,
  onRecrawlLead,
  onDiscardLead,
  onExportStream,
}) => {
  // Local filter states
  const [searchSeed, setSearchSeed] = useState('LinkedIn: Sound Healer, Studio Buyer, Wholesale');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedArchetypes, setSelectedArchetypes] = useState<Record<string, boolean>>({
    'Sound Studio': true,
    'Yoga Center': true,
    'Metaphysical': true,
    'Spa / Resort': true,
  });
  const [minOrderThreshold, setMinOrderThreshold] = useState<number>(5000);
  const [autoEnrichmentActive, setAutoEnrichmentActive] = useState(true);

  // Selected lead details
  const activeLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId) || leads[0] || null;
  }, [leads, selectedLeadId]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // State filter
      if (selectedState !== 'ALL' && lead.state !== selectedState) {
        return false;
      }
      // Archetype filter
      if (!selectedArchetypes[lead.archetype]) {
        return false;
      }
      return true;
    });
  }, [leads, selectedState, selectedArchetypes]);

  const selectedCount = leads.filter((l) => l.selected).length;

  const toggleArchetype = (arch: string) => {
    setSelectedArchetypes((prev) => ({
      ...prev,
      [arch]: !prev[arch],
    }));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* 1. LIVE AUTONOMOUS MULTI-WEB ENGINE REAL-TIME STATUS BAR */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-4 shadow-md border border-slate-800 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              {harvesterActive ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
              )}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                <span>Autonomous Multi-Web Harvester</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${harvesterActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {harvesterActive ? 'Real-Time Active' : 'Suspended'}
                </span>
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Socket: <span className="text-slate-100 font-semibold">wss://engine.resonance-export.io/live-stream</span>
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-700 hidden md:block" />

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 font-mono text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                Active Crawlers
              </span>
              <span className="text-slate-100 font-semibold text-sm">
                {crawlerWorkers.filter((w) => w.enabled).length}/6 Engines Streaming
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                Real-Time Ingestion
              </span>
              <span className="text-emerald-400 font-semibold text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                {harvesterActive ? '24 leads/min' : '0 leads/min'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                Last Extracted
              </span>
              <span className="text-slate-200 font-semibold text-sm">
                1.8s ago (LinkedIn)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">
                Multi-Web Reach
              </span>
              <span className="text-[#ffdbca] text-sm font-semibold">
                LinkedIn • Maps • Mindbody • Shopify
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleHarvesterActive}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium border border-slate-700 transition-colors"
          >
            <span className={`material-symbols-outlined text-[15px] ${harvesterActive ? 'text-amber-400' : 'text-emerald-400'}`}>
              {harvesterActive ? 'pause_circle' : 'play_circle'}
            </span>
            <span>{harvesterActive ? 'Pause Harvester' : 'Resume Harvester'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenShellModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium border border-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px] text-[#9b4500]">tune</span>
            <span>Configure Workers</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddConnectorModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#9b4500] text-white hover:bg-[#682c00] text-xs font-semibold shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">add_link</span>
            <span>+ Add Web Connector</span>
          </button>
        </div>
      </div>

      {/* Top Context & Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[#45464d] text-[11px] font-semibold uppercase tracking-wider">
            <span>Autonomous Operations</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#9b4500]">Multi-Web Crawler & Live Ingestion Hub</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#191c1e] tracking-tight">
              Autonomous US Buyer Web Harvester
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#e6e8ea] text-[#45464d] text-xs font-semibold font-tabular-data">
              Autonomous Stream: 50 US States
            </span>
          </div>

          {/* Status chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f2f4f6] text-[#191c1e] text-[11px] font-medium border border-slate-200/60">
              <span className="material-symbols-outlined text-[14px] text-[#0a66c2]">badge</span>
              <span>LinkedIn Autonomous Profile Crawl: <strong>Active</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f2f4f6] text-[#191c1e] text-[11px] font-medium border border-slate-200/60">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">travel_explore</span>
              <span>Google Places B2B Geoscanner: <strong>50 States</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f2f4f6] text-[#191c1e] text-[11px] font-medium border border-slate-200/60">
              <span className="material-symbols-outlined text-[14px] text-[#9b4500]">shopping_cart</span>
              <span>Shopify & Mindbody Wholesalers: <strong>Connected</strong></span>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenShellModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-[#191c1e] font-semibold text-xs shadow-xs hover:bg-[#e6e8ea] transition-colors border border-slate-200/80"
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span>Live Scraper Shell</span>
          </button>

          <button
            type="button"
            onClick={onRunBatchMxVerify}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-[#191c1e] font-semibold text-xs shadow-xs hover:bg-[#e6e8ea] transition-colors border border-slate-200/80"
          >
            <span className="material-symbols-outlined text-[18px] text-[#9b4500]">auto_awesome</span>
            <span>Auto-Enrich MX Records</span>
          </button>

          <button
            type="button"
            onClick={onExportStream}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-[#191c1e] font-semibold text-xs shadow-xs hover:bg-[#e6e8ea] transition-colors border border-slate-200/80"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Real-Time Stream</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddConnectorModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#9b4500] text-white font-semibold text-xs shadow-sm hover:bg-[#682c00] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">stream</span>
            <span>+ New Web Harvester Rule</span>
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME MULTI-WEB SOURCES & CRAWLER WORKERS MATRIX */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b4500] text-[20px]">hub</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#191c1e]">
              Active Autonomous Web Crawlers & Connector Feeds
            </h2>
          </div>
          <span className="text-xs text-[#45464d] font-mono">
            Engine Workers: {crawlerWorkers.filter((w) => w.enabled).length}/6 Healthy • 0 Rate-Limits
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {crawlerWorkers.map((worker) => (
            <div
              key={worker.id}
              className={`p-4 bg-white rounded-xl shadow-xs border transition-all flex flex-col justify-between ${
                worker.enabled ? 'border-slate-200 hover:border-[#9b4500]' : 'border-slate-200/60 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-lg ${worker.badgeBg} ${worker.badgeColor} flex items-center justify-center font-bold text-sm border border-slate-200/60`}>
                    {worker.icon === 'in' ? (
                      <span className="font-bold text-sm">in</span>
                    ) : (
                      <span className="material-symbols-outlined text-[20px]">{worker.icon}</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#191c1e] text-xs sm:text-sm">
                        {worker.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#45464d] font-mono">
                      Live Session ID: {worker.code}
                    </span>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                  worker.enabled
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {worker.enabled && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
                  {worker.enabled ? worker.status : 'Paused'}
                </span>
              </div>

              <div className="my-3 space-y-1.5 bg-[#f2f4f6]/80 p-2.5 rounded-lg text-xs font-mono">
                <div className="flex justify-between text-[#45464d]">
                  <span>Scope:</span>
                  <span className="text-[#191c1e] font-semibold truncate max-w-[180px]">
                    {worker.targetRoleOrScope}
                  </span>
                </div>
                <div className="flex justify-between text-[#45464d]">
                  <span>Yield Velocity:</span>
                  <span className="text-[#9b4500] font-bold">{worker.yieldVelocity}</span>
                </div>
                <div className="flex justify-between text-[#45464d]">
                  <span>{worker.metricLabel}:</span>
                  <span className="text-emerald-700 font-semibold">{worker.metricValue}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#45464d]">
                <span className="flex items-center gap-1 text-[11px]">
                  <span className={`material-symbols-outlined text-[13px] ${worker.enabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                    check_circle
                  </span>
                  {worker.activeFeature}
                </span>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={worker.enabled}
                    onChange={() => onToggleWorker(worker.id)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#9b4500]" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. REAL-TIME STREAMING INGESTION FEED & TERMINAL CARD */}
      <div className="bg-slate-950 text-slate-200 rounded-xl p-4 shadow-md border border-slate-800 space-y-2 font-mono relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Live Multi-Web Extraction Stream (Incoming Real-Time Events)
            </span>
            <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">
              WebSocket: Streaming 18 events/sec
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AUTO-SCRAPING ACTIVE
            </span>
            <button
              type="button"
              onClick={onClearSocketFeed}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Clear Stream
            </button>
          </div>
        </div>

        <div className="space-y-1.5 text-xs pt-1 max-h-36 overflow-y-auto">
          {socketEvents.map((evt) => (
            <div
              key={evt.id}
              className={`flex items-baseline gap-2 py-1 px-2 rounded bg-slate-900/60 border-l-2 ${evt.borderClass} text-slate-300`}
            >
              <span className="text-slate-500 text-[11px] shrink-0 font-mono">
                {evt.time}
              </span>
              <span className={`px-1.5 py-0.2 rounded ${evt.badgeClass} text-[10px] uppercase font-bold shrink-0`}>
                {evt.source}
              </span>
              <span className="truncate">{evt.text}</span>
              <span className="ml-auto text-[10px] text-slate-500 shrink-0 font-mono">
                Live
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. INTELLIGENCE RIBBON (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-white rounded-xl shadow-xs flex flex-col justify-between border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wider">
              Multi-Web Live Harvested
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-tabular-data text-[11px] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              +308 today
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-1.5">
            <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#191c1e]">
              1,488
            </span>
            <span className="text-xs text-[#45464d]">live buyer records</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-[#45464d]">
              <span>Web Breakdown</span>
              <span className="font-tabular-data text-[#191c1e] font-medium">
                LinkedIn (42%), Maps (30%), Shopify (28%)
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#f2f4f6] rounded-full flex overflow-hidden">
              <div className="h-full bg-[#0077b5]" style={{ width: '42%' }} />
              <div className="h-full bg-emerald-500" style={{ width: '30%' }} />
              <div className="h-full bg-[#9b4500]" style={{ width: '18%' }} />
              <div className="h-full bg-purple-500" style={{ width: '10%' }} />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 bg-white rounded-xl shadow-xs flex flex-col justify-between border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wider">
              Autonomous Profile Depth
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#9b4500]">
              pie_chart
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-1.5">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#191c1e]">
              94.8%
            </span>
            <span className="text-xs text-[#45464d]">Multi-Web Verified</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
            <div className="flex items-center justify-between text-[#45464d]">
              <span className="truncate">LinkedIn Matched</span>
              <span className="font-tabular-data text-[#191c1e] font-semibold">912</span>
            </div>
            <div className="flex items-center justify-between text-[#45464d]">
              <span className="truncate">Physical Address</span>
              <span className="font-tabular-data text-[#191c1e] font-semibold">1,390</span>
            </div>
            <div className="flex items-center justify-between text-[#45464d]">
              <span className="truncate">Wholesale Price Map</span>
              <span className="font-tabular-data text-[#191c1e] font-semibold">410</span>
            </div>
            <div className="flex items-center justify-between text-[#45464d]">
              <span className="truncate">Active Studio Schedule</span>
              <span className="font-tabular-data text-[#191c1e] font-semibold">685</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 bg-white rounded-xl shadow-xs flex flex-col justify-between border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wider">
              Direct Buyer Email Yield
            </span>
            <span className="material-symbols-outlined text-[18px] text-[#9b4500]">
              verified_user
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-1.5">
            <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#191c1e]">
              86.4%
            </span>
            <span className="text-xs text-[#45464d]">direct owner mailbox</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#45464d] pt-1">
            <span>MX & SMTP Live Handshake</span>
            <span className="font-tabular-data text-emerald-700 font-semibold">
              99.1% Deliverable
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 bg-white rounded-xl shadow-xs flex flex-col justify-between border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#45464d] uppercase tracking-wider">
              Live Himalayan Export Fit
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#f2f4f6] text-[#9b4500] text-[11px] font-semibold">
              High Margin
            </span>
          </div>
          <div className="my-3 flex items-baseline gap-1.5">
            <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#9b4500]">
              89<span className="text-xl text-[#45464d]">/100</span>
            </span>
            <span className="text-xs text-[#45464d]">Avg AI Score</span>
          </div>
          <p className="text-xs text-[#45464d] truncate">
            Singing Bowl, Gongs & Sound Healing Retail demand
          </p>
        </div>
      </div>

      {/* 5. SCRAPER CONTROL & DYNAMIC QUERY BUILDER STRIP */}
      <div className="p-4 bg-white rounded-xl shadow-xs space-y-4 border border-slate-200/80">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b4500] text-[20px]">
              manage_search
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#191c1e]">
              Autonomous Multi-Web Scraper & Ingestion Filters
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#45464d]">Active Scraping Jobs:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#f2f4f6] text-[#191c1e] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9b4500] animate-pulse" />
              LinkedIn "Sound Bath" US Buyers (Live Streaming)
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#f2f4f6] text-[#45464d]">
              Google Places FL & TX Studios (Active)
            </span>
          </div>
        </div>

        {/* Controls Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Target Keywords */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#45464d] uppercase">
              Real-Time Search Seeds & Roles
            </label>
            <div className="relative">
              <input
                className="w-full bg-[#f2f4f6] text-[#191c1e] text-xs px-3 py-2 rounded-lg outline-none focus:bg-white border border-transparent focus:border-slate-300"
                type="text"
                value={searchSeed}
                onChange={(e) => setSearchSeed(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#76777d] text-[18px]">
                tune
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="px-1.5 py-0.5 rounded bg-[#0077b5]/10 text-[#0077b5] text-[10px] font-semibold">
                + LinkedIn Titles
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                + Google Places Maps
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#e6e8ea] text-[#45464d] text-[10px]">
                + 7 Chakra Retail
              </span>
            </div>
          </div>

          {/* US State Multi-Select */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#45464d] uppercase">
              State / Metro Hotspots
            </label>
            <div className="flex items-center justify-between px-3 py-2 bg-[#f2f4f6] rounded-lg text-[#191c1e] text-xs">
              <span className="truncate">
                {selectedState === 'ALL' ? 'Showing All States (50)' : `Filter: ${selectedState} Metro`}
              </span>
              <button
                type="button"
                onClick={() => setSelectedState('ALL')}
                className="text-[10px] text-[#9b4500] font-semibold underline ml-1"
              >
                Reset
              </button>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-0.5">
              {['CA', 'NY', 'TX', 'CO', 'FL', 'AZ', 'WA'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedState(selectedState === st ? 'ALL' : st)}
                  className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    selectedState === st
                      ? 'bg-[#0f172a] text-white'
                      : 'bg-[#e6e8ea] text-[#191c1e] hover:bg-slate-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Archetype Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#45464d] uppercase">
              Buyer Business Archetype
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['Sound Studio', 'Yoga Center', 'Metaphysical', 'Spa / Resort'].map((arch) => (
                <label
                  key={arch}
                  className="flex items-center gap-1.5 px-2 py-1.5 bg-[#f2f4f6] rounded-lg cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={!!selectedArchetypes[arch]}
                    onChange={() => toggleArchetype(arch)}
                    className="accent-[#9b4500] h-3.5 w-3.5 rounded"
                  />
                  <span className="truncate text-[#191c1e]">{arch}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Financial & Scale Filters */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-[#45464d] uppercase">
              Real-Time Ingestion Threshold
            </label>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#45464d]">
                <span>Min Est. Order Value</span>
                <span className="font-tabular-data text-[#191c1e] font-semibold">
                  ${minOrderThreshold.toLocaleString()}+ FOB
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="15000"
                step="500"
                value={minOrderThreshold}
                onChange={(e) => setMinOrderThreshold(Number(e.target.value))}
                className="w-full h-1.5 bg-[#e6e8ea] accent-[#9b4500] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#45464d] pt-1">
                <span>Autonomous Auto-Enrichment</span>
                <button
                  type="button"
                  onClick={() => setAutoEnrichmentActive(!autoEnrichmentActive)}
                  className={`font-semibold flex items-center gap-1 ${
                    autoEnrichmentActive ? 'text-emerald-700' : 'text-slate-500'
                  }`}
                >
                  {autoEnrichmentActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
                  {autoEnrichmentActive ? 'Live Active' : 'Off'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. MAIN TABLE WORKSPACE & SIDE INSPECTOR SPLIT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Primary Ingestion Table (8 cols on large screens) */}
        <div className="xl:col-span-8 bg-white rounded-xl shadow-xs overflow-hidden flex flex-col border border-slate-200/80">
          {/* Table Subheader Bar */}
          <div className="p-4 flex flex-wrap items-center justify-between gap-3 bg-white border-b border-slate-200/70">
            <div className="flex items-center gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#191c1e] flex items-center gap-2">
                <span>Autonomous Lead Inflow Stream</span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-tabular-data text-xs font-semibold border border-emerald-200">
                {filteredLeads.length} Leads In Focus
              </span>
              <span className="text-xs text-[#45464d] hidden sm:inline">
                Harvesting from LinkedIn, Google Places & Web
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onSelectAllLeads}
                className="px-2.5 py-1 rounded bg-[#f2f4f6] text-[#191c1e] text-xs font-medium hover:bg-[#e6e8ea]"
              >
                Select All ({leads.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedState('ALL')}
                className="px-2.5 py-1 rounded bg-[#f2f4f6] text-[#191c1e] text-xs font-medium hover:bg-[#e6e8ea] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">tune</span>
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Table Responsive Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f4f6] text-[#45464d] text-[11px] font-semibold uppercase tracking-wider">
                  <th className="p-3 pl-4 w-8">
                    <input
                      type="checkbox"
                      checked={selectedCount === leads.length && leads.length > 0}
                      onChange={onSelectAllLeads}
                      className="accent-[#9b4500] rounded"
                    />
                  </th>
                  <th className="p-3">Company & Location</th>
                  <th className="p-3">Autonomous Web Source</th>
                  <th className="p-3">Decision Maker & Email</th>
                  <th className="p-3">Harvested At</th>
                  <th className="p-3 text-right">Affinity</th>
                  <th className="p-3">Live Status</th>
                  <th className="p-3 pr-4 text-right">Trace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredLeads.map((lead) => {
                  const isSelectedLead = lead.id === selectedLeadId;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => onSelectLead(lead.id)}
                      className={`transition-colors cursor-pointer ${
                        isSelectedLead
                          ? 'bg-blue-50/70 border-l-4 border-[#0077b5]'
                          : 'hover:bg-[#f2f4f6]/70'
                      }`}
                    >
                      <td className="p-3 pl-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={!!lead.selected}
                          onChange={() => onToggleLeadSelect(lead.id)}
                          className="accent-[#9b4500] rounded"
                        />
                      </td>

                      <td className="p-3">
                        <div className="font-semibold text-[#191c1e] flex items-center gap-1.5">
                          <span>{lead.name}</span>
                          {lead.affinityScore >= 97 && (
                            <span className="px-1 py-0.2 bg-blue-100 text-[#0077b5] text-[10px] rounded font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#45464d] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-[#9b4500]">
                            location_on
                          </span>
                          {lead.location}
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#0077b5]/10 text-[#0077b5] font-semibold text-[11px] border border-[#0077b5]/20">
                            {lead.sourceType === 'linkedin' && <span className="font-bold">in</span>}
                            {lead.sourceLabel}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#45464d] font-medium mt-0.5 truncate max-w-[150px]">
                          {lead.archetype}
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="font-medium text-[#191c1e] flex items-center gap-1">
                          <span>{lead.contactName}</span>
                          <span className="material-symbols-outlined text-[13px] text-[#0077b5]">
                            verified
                          </span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-tabular-data flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {lead.contactEmail}
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="text-[11px] text-emerald-700 font-mono font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          {lead.harvestedAt}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <span className="font-tabular-data font-bold text-[#9b4500] text-sm">
                          {lead.affinityScore}%
                        </span>
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            lead.status === 'Live Scraped'
                              ? 'bg-emerald-100 text-emerald-800'
                              : lead.status === 'Verified'
                              ? 'bg-[#ffdbca] text-[#331200]'
                              : lead.status === 'Ready'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      <td className="p-3 pr-4 text-right">
                        <button
                          type="button"
                          className="p-1 rounded text-[#45464d] hover:text-[#191c1e] hover:bg-[#e6e8ea]"
                          title="Review Lead Details"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            chevron_right
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination & Bulk Dispatch Bar */}
          <div className="p-4 bg-[#f2f4f6] flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto border-t border-slate-200/70">
            <div className="flex items-center gap-3 text-xs text-[#45464d]">
              <span>
                Selected: <strong className="text-[#191c1e] font-tabular-data">{selectedCount} of {leads.length} leads</strong>
              </span>
              <span>•</span>
              <span>
                Auto-Enriched by Multi-Web Engine: <strong className="text-emerald-700">100%</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onRunBatchMxVerify}
                className="px-3 py-1.5 rounded-lg bg-white text-[#191c1e] text-xs font-medium hover:bg-[#e6e8ea] shadow-xs border border-slate-200"
              >
                Run Real-Time MX Verify
              </button>

              <button
                type="button"
                onClick={() => {
                  const idsToPush = leads.filter((l) => l.selected).map((l) => l.id);
                  onPushToVerificationQueue(idsToPush.length ? idsToPush : [activeLead.id]);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#9b4500] text-white text-xs font-semibold hover:bg-[#682c00] shadow-xs flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">fast_forward</span>
                <span>Push {selectedCount || 1} Lead{selectedCount === 1 ? '' : 's'} to Verification Queue</span>
              </button>
            </div>
          </div>
        </div>

        {/* 7. DETAIL INSPECTOR PANEL (RIGHT PANE) WITH DEEP MULTI-WEB REAL-TIME TRACE */}
        {activeLead && (
          <div className="xl:col-span-4 space-y-4">
            {/* Lead Inspector Card */}
            <div className="p-4 bg-white rounded-xl shadow-xs space-y-4 border border-slate-200/80">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#e6e8ea] text-[#9b4500] text-[10px] font-semibold uppercase">
                      Inspection Profile
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[#0077b5] font-mono text-[10px] font-bold border border-blue-200 flex items-center gap-1">
                      {activeLead.sourceBadge}
                    </span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#191c1e]">
                    {activeLead.name}
                  </h3>
                  <p className="text-xs text-[#45464d]">
                    {activeLead.address}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#f2f4f6] flex items-center justify-center shrink-0 border border-slate-200">
                  <span className="material-symbols-outlined text-[#9b4500] text-[22px]">
                    hearing
                  </span>
                </div>
              </div>

              {/* REAL-TIME MULTI-WEB FOOTPRINT TRACE */}
              <div className="p-3 bg-slate-900 text-slate-100 rounded-lg space-y-2 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Multi-Web Real-Time Trace
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {activeLead.multiWebTrace.crawledAgo}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-mono">
                  <div className="p-1.5 rounded bg-slate-800/80 border border-slate-700">
                    <span className="text-slate-400 block text-[9px] uppercase">LinkedIn</span>
                    <span className="text-emerald-400 font-bold">
                      {activeLead.multiWebTrace.linkedIn}
                    </span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-800/80 border border-slate-700">
                    <span className="text-slate-400 block text-[9px] uppercase">Google Maps</span>
                    <span className="text-emerald-400 font-bold">
                      {activeLead.multiWebTrace.googleMaps}
                    </span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-800/80 border border-slate-700">
                    <span className="text-slate-400 block text-[9px] uppercase">Online Shop</span>
                    <span className="text-emerald-400 font-bold">
                      {activeLead.multiWebTrace.onlineShop}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Stocking & Export Visual Match */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-[#45464d] uppercase">
                  Multi-Web Scraped Visuals
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeLead.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-lg overflow-hidden h-28 bg-[#e6e8ea] border border-slate-200 group"
                    >
                      <img
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        alt={img.caption}
                        src={img.url}
                      />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-medium">
                        {img.caption}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wholesale Trade Signals */}
              <div className="p-3 bg-[#f2f4f6] rounded-lg space-y-1.5 border border-slate-200/60 text-xs">
                <span className="text-[11px] font-semibold text-[#9b4500] uppercase block">
                  Autonomous Diagnostic Profile
                </span>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#45464d]">Detected Products:</span>
                    <span className="text-[#191c1e] font-medium text-right truncate max-w-[190px]">
                      {activeLead.detectedProducts}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45464d]">Est. Monthly Intake:</span>
                    <span className="text-[#191c1e] font-semibold font-tabular-data">
                      {activeLead.estimatedDemand}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45464d]">FOB Unit Tolerance:</span>
                    <span className="text-[#9b4500] font-bold font-tabular-data">
                      {activeLead.fobTolerance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45464d]">Real-Time Verification:</span>
                    <span className="text-emerald-700 font-semibold">
                      100% Passed • Verified Buyer
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Decision Maker with Live LinkedIn Link */}
              <div className="p-3 bg-white rounded-lg shadow-xs space-y-1 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#45464d] uppercase">
                    Decision Maker (Parsed from Web)
                  </span>
                  <a
                    className="text-xs text-[#0077b5] hover:underline flex items-center gap-1 font-semibold"
                    href={`https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(activeLead.contactName + ' ' + activeLead.name)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>in LinkedIn Profile</span>
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  </a>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <div className="w-8 h-8 rounded-full bg-[#ffdbca] text-[#331200] font-bold flex items-center justify-center text-xs">
                    {activeLead.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#191c1e] truncate">
                      {activeLead.contactName}
                    </p>
                    <p className="text-[11px] text-[#45464d] truncate">
                      {activeLead.contactTitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenPitchModal(activeLead)}
                    className="text-[#9b4500] hover:text-[#682c00] p-1.5 rounded hover:bg-[#f2f4f6]"
                    title="Compose Sequence"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      alternate_email
                    </span>
                  </button>
                </div>
              </div>

              {/* Quick Operational Actions */}
              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => onPushToVerificationQueue([activeLead.id])}
                  className="w-full py-2 rounded-lg bg-[#9b4500] text-white font-semibold text-xs hover:bg-[#682c00] transition-colors flex items-center justify-center gap-1 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Push Instantly to Verification & Quality Hub</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onRecrawlLead(activeLead.id)}
                    className="py-1.5 rounded-lg bg-[#f2f4f6] text-[#191c1e] font-semibold text-xs hover:bg-[#e6e8ea] transition-colors flex items-center justify-center gap-1 border border-slate-200"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#9b4500]">sync</span>
                    <span>Re-crawl Web Target</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDiscardLead(activeLead.id)}
                    className="py-1.5 rounded-lg bg-[#f2f4f6] text-red-700 font-semibold text-xs hover:bg-red-50 transition-colors flex items-center justify-center gap-1 border border-slate-200"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                    <span>Discard Lead</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Himalayan Export Pitch Assist Widget */}
            <div className="p-4 bg-white rounded-xl shadow-xs space-y-2 border border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#9b4500] text-[18px]">
                  auto_awesome
                </span>
                <span className="text-[11px] font-bold text-[#9b4500] uppercase tracking-wider">
                  Autonomous AI Pitch Recommendation
                </span>
              </div>
              <p className="text-xs text-[#191c1e] leading-relaxed">
                "{activeLead.aiPitch}"
              </p>
              <div className="pt-1 flex items-center justify-between text-xs text-[#45464d]">
                <span className="font-medium">{activeLead.matchConfidence}</span>
                <button
                  type="button"
                  onClick={() => onOpenPitchModal(activeLead)}
                  className="text-[#9b4500] font-semibold hover:underline flex items-center gap-0.5"
                >
                  <span>Draft Real-Time Sequence</span>
                  <span className="text-[14px]">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
