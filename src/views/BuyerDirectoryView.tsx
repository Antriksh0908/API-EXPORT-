import React, { useState, useMemo } from 'react';
import { BuyerLead } from '../types';

interface BuyerDirectoryViewProps {
  leads: BuyerLead[];
  onSelectLeadForInspection: (leadId: string) => void;
  onOpenPitchModal: (lead: BuyerLead) => void;
  onExportDirectory: () => void;
}

export const BuyerDirectoryView: React.FC<BuyerDirectoryViewProps> = ({
  leads,
  onSelectLeadForInspection,
  onOpenPitchModal,
  onExportDirectory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchSearch =
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.archetype.toLowerCase().includes(searchTerm.toLowerCase());

      const matchState = stateFilter === 'ALL' || l.state === stateFilter;

      return matchSearch && matchState;
    });
  }, [leads, searchTerm, stateFilter]);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 tracking-wider">
            <span>Enterprise Master Records</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#9b4500]">North American Wholesale Network</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 mt-1">
            Buyer Master Directory
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Verified master database of 1,488 US wellness sanctuaries, sound bath studios, and holistic retail chains.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportDirectory}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Buyer Database (CSV)</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full md:max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by studio name, buyer contact, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 text-slate-900 text-xs rounded-lg border border-slate-200 outline-none focus:bg-white focus:border-slate-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-slate-500 uppercase text-[11px]">State:</span>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white outline-none"
            >
              <option value="ALL">All States</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="CO">Colorado</option>
              <option value="AZ">Arizona</option>
              <option value="WA">Washington</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
              title="Table View"
            >
              <span className="material-symbols-outlined text-[18px]">table_rows</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
              title="Card View"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
          </div>
        </div>
      </div>

      {/* Directory Content */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-semibold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-3 pl-4">Company & Location</th>
                  <th className="p-3">Primary Buyer Contact</th>
                  <th className="p-3">Business Archetype</th>
                  <th className="p-3">Estimated Monthly Intake</th>
                  <th className="p-3">FOB Budget Tolerance</th>
                  <th className="p-3 text-right">Affinity</th>
                  <th className="p-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 pl-4">
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#9b4500]">
                          location_on
                        </span>
                        {lead.address}
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="font-medium text-slate-900">{lead.contactName}</div>
                      <div className="text-[11px] text-slate-500">{lead.contactTitle}</div>
                      <div className="text-[11px] text-emerald-700 font-mono">{lead.contactEmail}</div>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {lead.archetype}
                      </span>
                    </td>

                    <td className="p-3 font-medium text-slate-900 font-tabular-data">
                      {lead.estimatedDemand}
                    </td>

                    <td className="p-3 font-semibold text-[#9b4500] font-tabular-data">
                      {lead.fobTolerance}
                    </td>

                    <td className="p-3 text-right font-bold text-slate-900 font-tabular-data">
                      {lead.affinityScore}%
                    </td>

                    <td className="p-3 pr-4 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => onSelectLeadForInspection(lead.id)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold"
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenPitchModal(lead)}
                        className="px-2.5 py-1 rounded bg-[#9b4500] hover:bg-[#763300] text-white text-[11px] font-semibold shadow-xs"
                      >
                        Sequence
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="p-4 bg-white rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-all space-y-3"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{lead.name}</h3>
                    <p className="text-[11px] text-slate-500">{lead.location}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {lead.affinityScore}% Match
                  </span>
                </div>

                <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact:</span>
                    <span className="text-slate-900 font-semibold">{lead.contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-emerald-700 font-mono truncate max-w-[180px]">{lead.contactEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">FOB Target:</span>
                    <span className="text-[#9b4500] font-bold">{lead.fobTolerance}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectLeadForInspection(lead.id)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  View Trace
                </button>
                <button
                  type="button"
                  onClick={() => onOpenPitchModal(lead)}
                  className="px-3 py-1.5 rounded-lg bg-[#9b4500] text-white text-xs font-semibold hover:bg-[#763300] shadow-xs"
                >
                  Draft Sequence
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
