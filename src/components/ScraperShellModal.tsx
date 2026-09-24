import React, { useState } from 'react';

interface ScraperShellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScraperShellModal: React.FC<ScraperShellModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Resonance Autonomous Multi-Web Orchestrator v4.2.1 initialized',
    '[CONFIG] Loaded 6 crawler microservices. Bounding box: US_50_STATES',
    '[NETWORK] Rotating residential proxy pool active: 8,400 clean US IPs',
    '[ENGINE-1: LINKEDIN] Socket session LK-US-8821 active. Parsed 34 profiles in last 60m',
    '[ENGINE-2: PLACES] B2B Geoscanner querying "sound healing studio" in Austin, Miami, NYC, Denver',
    '[ENGINE-3: MINDBODY] Schedule scraper matched 6 weekly 432Hz Tibetan bowl sound baths at Sedona Sacred Resonance',
    '[ENGINE-4: SHOPIFY] Extracting product catalog: Crystal & Sound Haven (Sells 10" Frosted Bowls @ $320)',
    '[PROVENANCE] Matching against Patan, Kathmandu 7-Metal forge export catalog specs (MOQ 15 sets)',
    '[MX_CHECK] Handshake with julian@pureresonancestudio.com: STATUS_DELIVERABLE_250_OK',
    '[LIVE_STREAM] Real-time lead ingest packet #1488 committed to active workspace'
  ]);
  const [command, setCommand] = useState('');

  if (!isOpen) return null;

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const cmd = command.trim();
    const newLogs = [...logs, `$ ${cmd}`];

    if (cmd === 'clear') {
      setLogs(['[SHELL] Console cleared. Resonance crawler daemon streaming...']);
      setCommand('');
      return;
    }

    if (cmd.includes('status')) {
      newLogs.push('[STATUS] 6 engines running at 100% capacity. 0 rate-limits encountered.');
    } else if (cmd.includes('crawl') || cmd.includes('sweep')) {
      newLogs.push('[RUN] Dispatched force crawler wave across CA, NY, TX, CO, FL. 14 new candidates identified.');
    } else if (cmd.includes('ping')) {
      newLogs.push('[PING] engine.resonance-export.io (Kathmandu-LAX tunnel): 84ms latency.');
    } else {
      newLogs.push(`[EXEC] Command "${cmd}" processed by Autonomous Harvester Worker.`);
    }

    setLogs(newLogs);
    setCommand('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-950 text-slate-200 w-full max-w-3xl rounded-xl shadow-2xl border border-slate-800 overflow-hidden font-mono flex flex-col h-[520px]">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <span className="text-xs text-slate-300 font-semibold ml-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-emerald-400">terminal</span>
              Resonance Scraper Shell — autonomous-harvester-worker-01 (KTM-US)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLogs(['[SHELL] Console cleared. Resonance crawler daemon streaming...'])}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Terminal Logs Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-xs text-slate-300 font-mono select-text bg-slate-950/90">
          {logs.map((log, i) => {
            let colorClass = 'text-slate-300';
            if (log.startsWith('$')) colorClass = 'text-emerald-400 font-bold';
            else if (log.includes('[MX_CHECK]') || log.includes('STATUS_DELIVERABLE')) colorClass = 'text-emerald-400';
            else if (log.includes('[ENGINE-1')) colorClass = 'text-sky-300';
            else if (log.includes('[PROVENANCE]')) colorClass = 'text-amber-300';
            else if (log.includes('[CONFIG]') || log.includes('[INIT]')) colorClass = 'text-slate-400';

            return (
              <div key={i} className={`leading-relaxed ${colorClass}`}>
                {log}
              </div>
            );
          })}
        </div>

        {/* Command Line Input */}
        <form onSubmit={handleRunCommand} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-xs">resonance:crawler$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type 'crawl', 'status', 'ping', or 'clear'..."
            className="flex-1 bg-transparent text-xs text-slate-100 outline-none placeholder:text-slate-600 font-mono"
            autoFocus
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors"
          >
            Execute
          </button>
        </form>
      </div>
    </div>
  );
};
