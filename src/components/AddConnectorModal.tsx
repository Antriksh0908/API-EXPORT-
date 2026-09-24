import React, { useState } from 'react';
import { WebSourceType } from '../types';

interface AddConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddConnector: (connector: {
    name: string;
    sourceType: WebSourceType;
    scope: string;
    velocity: string;
  }) => void;
}

export const AddConnectorModal: React.FC<AddConnectorModalProps> = ({
  isOpen,
  onClose,
  onAddConnector,
}) => {
  const [name, setName] = useState('');
  const [sourceType, setSourceType] = useState<WebSourceType>('linkedin');
  const [scope, setScope] = useState('US West Coast Luxury Spas & Holistic Centers');
  const [velocity, setVelocity] = useState('45 leads/hr');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddConnector({
      name: name.trim(),
      sourceType,
      scope,
      velocity,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b4500] text-[20px]">
              hub
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Add Autonomous Web Connector / Scraping Worker
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
              Connector Worker Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Etsy & Faire Himalayan Wholesalers Scanner"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#0f172a]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Data Source Type
              </label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as WebSourceType)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#0f172a] bg-white"
              >
                <option value="linkedin">LinkedIn & Sales Nav</option>
                <option value="google_places">Google Places & Maps B2B</option>
                <option value="mindbody">Mindbody & ClassPass</option>
                <option value="shopify">Shopify & eCommerce</option>
                <option value="instagram">Instagram Bio & Linktree</option>
                <option value="dorking">Automated Google Dorking</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Expected Ingestion Velocity
              </label>
              <input
                type="text"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                placeholder="e.g. 40 profiles/hr"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#0f172a]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
              Target Geographic / Search Keywords Scope
            </label>
            <textarea
              rows={2}
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="e.g. Sound healing studios, acupuncture centers in California, Colorado, Texas"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 outline-none focus:border-[#0f172a]"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <p className="font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              Auto-Enrichment Pipeline Active
            </p>
            <p className="mt-0.5 text-amber-800">
              Ingested targets will automatically execute MX deliverability handshakes, extract owner phone lines, and match product catalog with Kathmandu forge export specifications.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#9b4500] hover:bg-[#763300] text-white font-semibold shadow-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">add_link</span>
              Deploy Connector
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
