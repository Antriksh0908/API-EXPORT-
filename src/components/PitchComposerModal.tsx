import React, { useState, useEffect } from 'react';
import { BuyerLead } from '../types';
import { sendGmail, DEFAULT_USER_EMAIL, DEFAULT_USER_NAME } from '../services/auth';

interface PitchComposerModalProps {
  lead: BuyerLead | null;
  isOpen: boolean;
  onClose: () => void;
  onSendOutreach: (leadId: string, emailSubject: string, emailBody: string, sentViaRealGmail?: boolean) => void;
  currentUserEmail?: string | null;
  onSignInWithGoogle?: () => void;
}

export const PitchComposerModal: React.FC<PitchComposerModalProps> = ({
  lead,
  isOpen,
  onClose,
  onSendOutreach,
  currentUserEmail = DEFAULT_USER_EMAIL,
  onSignInWithGoogle,
}) => {
  const [templateType, setTemplateType] = useState<'provenance' | 'wholesale_margin' | 'custom_branding'>('provenance');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSendingRealEmail, setIsSendingRealEmail] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; msg: string } | null>(null);

  useEffect(() => {
    if (!lead) return;
    setRecipientEmail(lead.contactEmail);
    setSendResult(null);

    const senderEmail = currentUserEmail || DEFAULT_USER_EMAIL;
    const senderName = DEFAULT_USER_NAME;

    if (templateType === 'provenance') {
      setSubject(`Direct Kathmandu Forge Provenance: 432Hz Master Sound Bath Bowls for ${lead.name}`);
      setBody(
`Hi ${lead.contactName.split(' ')[0]},

I noticed ${lead.name}'s focus on acoustic sound healing in ${lead.city}, ${lead.state}.

We forge certified 7-Metal Alloy Tibetan singing bowls directly in Patan, Kathmandu Valley. Each bowl is tuned accurately to 432Hz harmonic fundamental frequencies (root through crown notes) and individually hand-hammered by master artisans whose lineage dates back four generations.

Unlike mass-cast brass alternatives, our bell-metal alloy retains a sustained acoustic resonance of 90+ seconds, which studio clients consistently praise during deep theta meditations.

${lead.aiPitch}

Could I dispatch a 60-second acoustic audio recording and our US wholesale specification sheet (with direct FOB Kathmandu pricing and landed DHL door-to-door rates to ${lead.city})?

Warm regards,
${senderName}
Resonance Export • Himalayan Artisan Trade
Email: ${senderEmail}`
      );
    } else if (templateType === 'wholesale_margin') {
      setSubject(`Wholesale Himalayan Singing Bowls FOB Kathmandu — Direct Studio Pricing for ${lead.name}`);
      setBody(
`Hi ${lead.contactName.split(' ')[0]},

Reaching out from Resonance Export in Kathmandu. We supply North American sound studios and metaphysical storefronts with direct artisan forge shipments.

Based on our analysis of your product retail shelf, our direct forge pricing offers a 65%+ gross margin:
- Master Grade 7-Chakra sets: $120-$280 USD FOB Kathmandu (retails at $450-$890 USD in the US)
- Hand-stitched brocade silk ring cushions + rosewood felt mallets included with every bowl
- Consolidated DHL express air courier: 4-6 business days direct to ${lead.address}

Would you be open to reviewing our wholesale price grid and MOQ terms for your next studio stocking wave?

Best regards,
${senderName}
Resonance Export
Email: ${senderEmail}`
      );
    } else {
      setSubject(`Custom Laser Engraving & Studio Branding on 7-Metal Bronze Bowls for ${lead.name}`);
      setBody(
`Hi ${lead.contactName.split(' ')[0]},

For ${lead.name}'s sound therapy programs in ${lead.city}, we provide customized laser engraving along the outer bronze rim (e.g. your studio seal, sacred geometry yantras, or specific frequency numbers like 432Hz / 528Hz).

Each custom set includes individual acoustic frequency verification certificates and artisan forging logs from our Patan forge.

Would you like to see examples of custom engraved sets we recently dispatched to top US sound healing studios?

Best regards,
${senderName}
Resonance Export
Email: ${senderEmail}`
      );
    }
  }, [lead, templateType, currentUserEmail]);

  if (!isOpen || !lead) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendViaRealGmail = async () => {
    if (!recipientEmail) return;
    setIsSendingRealEmail(true);
    setSendResult(null);

    const senderEmail = currentUserEmail || DEFAULT_USER_EMAIL;
    const res = await sendGmail(recipientEmail, subject, body, senderEmail);

    setIsSendingRealEmail(false);
    if (res.success) {
      setSendResult({
        success: true,
        msg: `Email successfully sent via Gmail to ${recipientEmail}! Message ID: ${res.messageId}`,
      });
      onSendOutreach(lead.id, subject, body, true);
      setTimeout(() => {
        onClose();
      }, 2200);
    } else {
      if (res.error === 'AUTH_REQUIRED') {
        setSendResult({
          success: false,
          msg: 'Please connect your Google account using the "Connect Real Gmail" button first to authorize real-time sending.',
        });
      } else {
        setSendResult({
          success: false,
          msg: `Send error: ${res.error}`,
        });
      }
    }
  };

  const handleQueueOnly = () => {
    onSendOutreach(lead.id, subject, body, false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b4500] text-[20px]">
              mail
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Real-Time Buyer Outreach & Email Dispatch
              </h3>
              <p className="text-[11px] text-slate-500">
                Sender: <strong className="text-slate-800">{DEFAULT_USER_NAME} &lt;{currentUserEmail || DEFAULT_USER_EMAIL}&gt;</strong>
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
          {/* Recipient Input + Test Send toggle */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-600 uppercase">
                Recipient Email Address
              </label>
              <button
                type="button"
                onClick={() => setRecipientEmail(currentUserEmail || DEFAULT_USER_EMAIL)}
                className="text-[10px] text-[#0077b5] hover:underline font-semibold"
              >
                Send Test To My Email ({currentUserEmail || DEFAULT_USER_EMAIL})
              </button>
            </div>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="buyer@soundstudio.com"
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-900 font-medium outline-none focus:border-[#0f172a]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-900 font-medium outline-none focus:border-[#0f172a]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1 flex items-center justify-between">
              <span>Personalized Email Body</span>
              <span className="text-emerald-700 font-mono text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Signed with your verified address
              </span>
            </label>
            <textarea
              rows={11}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg text-slate-900 font-sans text-xs leading-relaxed outline-none focus:border-[#0f172a]"
            />
          </div>

          {sendResult && (
            <div
              className={`p-3 rounded-lg text-xs font-semibold flex items-center justify-between ${
                sendResult.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              <span>{sendResult.msg}</span>
              {!sendResult.success && onSignInWithGoogle && (
                <button
                  type="button"
                  onClick={onSignInWithGoogle}
                  className="px-2.5 py-1 bg-amber-600 text-white rounded font-bold text-[11px] hover:bg-amber-700 ml-2 shrink-0"
                >
                  Connect Now
                </button>
              )}
            </div>
          )}

          {/* Quick Details Callout */}
          <div className="p-2.5 bg-[#f2f4f6] rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
            <span className="text-slate-600">
              Sender Mailbox: <strong className="text-slate-900">{currentUserEmail || DEFAULT_USER_EMAIL}</strong>
            </span>
            <span className="text-emerald-700 font-semibold font-mono">
              OAuth Protocol: Gmail REST API v1
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
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQueueOnly}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-200 text-xs font-medium"
            >
              Queue in App
            </button>
            <button
              type="button"
              disabled={isSendingRealEmail}
              onClick={handleSendViaRealGmail}
              className={`px-4 py-1.5 rounded-lg bg-[#9b4500] hover:bg-[#763300] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all ${
                isSendingRealEmail ? 'opacity-70 cursor-wait' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isSendingRealEmail ? 'sync' : 'send'}
              </span>
              <span>
                {isSendingRealEmail
                  ? 'Sending via Gmail API...'
                  : 'Send Real Email via Gmail'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
