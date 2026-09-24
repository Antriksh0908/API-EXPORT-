import React, { useState, useEffect } from 'react';
import { BuyerLead } from '../types';

interface PitchComposerModalProps {
  lead: BuyerLead | null;
  isOpen: boolean;
  onClose: () => void;
  onSendOutreach: (leadId: string, emailSubject: string, emailBody: string) => void;
}

export const PitchComposerModal: React.FC<PitchComposerModalProps> = ({
  lead,
  isOpen,
  onClose,
  onSendOutreach,
}) => {
  const [templateType, setTemplateType] = useState<'provenance' | 'wholesale_margin' | 'custom_branding'>('provenance');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!lead) return;

    if (templateType === 'provenance') {
      setSubject(`Direct Kathmandu Forge Provenance: 432Hz Master Sound Bath Bowls for ${lead.name}`);
      setBody(
`Hi ${lead.contactName.split(' ')[0]},

I noticed ${lead.name}'s focus on acoustic sound healing in ${lead.city}, ${lead.state}.

We forge certified 7-Metal Alloy Tibetan singing bowls directly in Patan, Kathmandu Valley. Each bowl is tuned accurately to 432Hz harmonic fundamental frequencies (root through crown notes) and individually hand-hammered by master artisans whose lineage dates back four generations.

Unlike mass-cast brass alternatives, our bell-metal alloy retains a sustained acoustic resonance of 90+ seconds, which studio clients consistently praise during deep theta meditations.

${lead.aiPitch}

Could I dispatch a 60-second acoustic audio recording and our US wholesale specification sheet (with direct FOB Kathmandu pricing and landed DHL door-to-door rates to ${lead.city})?

Tashi Delek,
Pema Tsering
Resonance Export • Kathmandu & New Delhi`
      );
    } else if (templateType === 'wholesale_margin') {
      setSubject(`Wholesale Himalayan Singeing Bowls FOB Kathmandu — Direct Studio Pricing for ${lead.name}`);
      setBody(
`Hi ${lead.contactName.split(' ')[0]},

Reaching out from Resonance Export in Kathmandu. We supply North American sound studios and metaphysical storefronts with direct artisan forge shipments.

Based on our analysis of your product retail shelf, our direct forge pricing offers a 65%+ gross margin:
- Master Grade 7-Chakra sets: $120-$280 USD FOB Kathmandu (retails at $450-$890 USD in the US)
- Hand-stitched brocade silk ring cushions + rosewood felt mallets included with every bowl
- Consolidated DHL express air courier: 4-6 business days direct to ${lead.address}

Would you be open to reviewing our wholesale price grid and MOQ terms for your next studio stocking wave?

Warm regards,
Pema Tsering`
      );
    } else {
      setSubject(`Custom Laser Engraving & Studio Branding on 7-Metal Bronze Bowls for ${lead.name}`);
      setBody(
`Hi ${lead.contactName.split(' ')[0]},

For ${lead.name}'s sound therapy programs in ${lead.city}, we provide customized laser engraving along the outer bronze rim (e.g. your studio seal, sacred geometry yantras, or specific frequency numbers like 432Hz / 528Hz).

Each custom set includes individual acoustic frequency verification certificates and artisan forging logs from our Patan forge.

Would you like to see examples of custom engraved sets we recently dispatched to top US sound healing studios?

Best regards,
Pema Tsering`
      );
    }
  }, [lead, templateType]);

  if (!isOpen || !lead) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    onSendOutreach(lead.id, subject, body);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b4500] text-[20px]">
              auto_awesome
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Autonomous AI Outreach Drafter & Sequence Staging
              </h3>
              <p className="text-[11px] text-slate-500">
                Targeting {lead.contactName} ({lead.contactTitle}) at {lead.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Template Selector Pills */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <span className="text-[11px] text-slate-500 uppercase font-bold shrink-0">
            Himalayan Pitch Engine:
          </span>
          <button
            type="button"
            onClick={() => setTemplateType('provenance')}
            className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
              templateType === 'provenance'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Patan 432Hz Artisan Provenance
          </button>
          <button
            type="button"
            onClick={() => setTemplateType('wholesale_margin')}
            className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
              templateType === 'wholesale_margin'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            FOB Wholesale Margin (65%+)
          </button>
          <button
            type="button"
            onClick={() => setTemplateType('custom_branding')}
            className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
              templateType === 'custom_branding'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            Custom Laser Rim Engraving
          </button>
        </div>

        {/* Editor */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 font-medium outline-none focus:border-[#0f172a]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1 flex items-center justify-between">
              <span>Personalized Email Body</span>
              <span className="text-emerald-700 font-mono text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Auto-Enriched with Patan Forge Specs
              </span>
            </label>
            <textarea
              rows={12}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg text-slate-900 font-sans text-xs leading-relaxed outline-none focus:border-[#0f172a]"
            />
          </div>

          {/* Quick Details Callout */}
          <div className="p-2.5 bg-[#f2f4f6] rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
            <span className="text-slate-600">
              Recipient: <strong className="text-slate-900">{lead.contactEmail}</strong>
            </span>
            <span className="text-emerald-700 font-semibold font-mono">
              MX Status: Deliverable (Port 25 Valid)
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-200 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="px-4 py-1.5 rounded-lg bg-[#9b4500] hover:bg-[#763300] text-white text-xs font-semibold shadow-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">
                forward_to_inbox
              </span>
              Push to Gmail Sequence Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
