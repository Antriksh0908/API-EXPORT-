import React, { useState } from 'react';
import { BuyerInquiry } from '../types';

interface ResponseInboxViewProps {
  inquiries: BuyerInquiry[];
  onReplyInquiry: (inquiryId: string, replyText: string) => void;
  onMarkAsRead: (inquiryId: string) => void;
}

export const ResponseInboxView: React.FC<ResponseInboxViewProps> = ({
  inquiries,
  onReplyInquiry,
  onMarkAsRead,
}) => {
  const [selectedId, setSelectedId] = useState<string>(inquiries[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const activeInquiry = inquiries.find((i) => i.id === selectedId) || inquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeInquiry) return;

    onReplyInquiry(activeInquiry.id, replyText);
    setReplyText('');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 3000);
  };

  const handleLoadTemplate = (type: 'proforma' | 'samples' | 'frequency_certs') => {
    if (!activeInquiry) return;
    if (type === 'proforma') {
      setReplyText(
`Dear ${activeInquiry.fromName},

Thank you for confirming your interest in the ${activeInquiry.productInterest}. 

Here is our direct FOB Kathmandu wholesale estimate:
- Quantity: Custom order batch
- Unit Price: Master Hand-Hammered 7-Metal Alloy @ $110 - $240 USD
- Packaging: Individual silk brocade ring cushions & rosewood felt strikers included
- Lead Time: 7 business days forging & tuning in Patan
- Air Freight: Express courier via Tribhuvan KTM -> 4 business days direct to your studio

I have generated pro-forma quotation #RE-2025-089 for your review. Would you prefer wire transfer or credit card via Stripe B2B?

Tashi Delek,
Pema Tsering`
      );
    } else if (type === 'samples') {
      setReplyText(
`Hi ${activeInquiry.fromName},

We would be delighted to dispatch a complimentary 8-inch Patan Master Singing Bowl (432Hz F-note Heart Chakra) to your studio this week so you and your practitioners can test the sustained acoustic vibration firsthand.

Please confirm your preferred shipping address and contact phone number for the DHL Air Waybill.

Warm regards,
Pema Tsering`
      );
    } else {
      setReplyText(
`Hi ${activeInquiry.fromName},

Attached are the acoustic frequency spectrum analyzer charts for our latest Patan forge batch. Each bowl shows pure fundamental resonance at 432Hz with secondary theta overtone harmonic sustains exceeding 85 seconds.

We also include individual laser engraving of your studio seal on the outer bronze rim at no additional charge for orders over 15 units.

Best regards,
Pema Tsering`
      );
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 tracking-wider">
            <span>Wholesale Communications</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#9b4500]">Direct Buyer Inquiries</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 mt-1">
            Buyer Response Inbox
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Incoming wholesale purchasing RFQs, custom forge requests, and sample inquiries from North American buyers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded bg-[#9b4500] text-white flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{inquiries.filter((i) => i.unread).length} Unread Replies</span>
          </span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inbox Inquiries List (4 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden divide-y divide-slate-100">
          <div className="p-3 bg-slate-50 font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Incoming Inquiries ({inquiries.length})</span>
            <span className="text-[10px] text-slate-400 font-mono">Real-Time Inflow</span>
          </div>

          <div className="divide-y divide-slate-100">
            {inquiries.map((inq) => {
              const isSelected = inq.id === selectedId;
              return (
                <div
                  key={inq.id}
                  onClick={() => {
                    setSelectedId(inq.id);
                    onMarkAsRead(inq.id);
                  }}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-amber-50/70 border-l-4 border-[#9b4500]'
                      : inq.unread
                      ? 'bg-white font-semibold'
                      : 'bg-slate-50/50 opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {inq.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#9b4500]" />
                      )}
                      <span className="font-bold text-xs text-slate-900">{inq.fromName}</span>
                    </div>
                    <span className="text-[11px] text-[#9b4500] font-bold font-mono">
                      {inq.estimatedDealValue}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 truncate">{inq.company}</p>
                  <p className="text-xs text-slate-800 font-medium mt-1 truncate">{inq.subject}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
                    <span>{inq.productInterest}</span>
                    <span>{inq.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Thread & Response Composer (7 cols) */}
        {activeInquiry && (
          <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">{activeInquiry.subject}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  From: <strong>{activeInquiry.fromName}</strong> &lt;{activeInquiry.fromEmail}&gt; • {activeInquiry.company}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#9b4500] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Est: {activeInquiry.estimatedDealValue}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">{activeInquiry.time}</span>
              </div>
            </div>

            {/* Inbound message */}
            <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line border border-slate-200">
              {activeInquiry.message}
            </div>

            {/* Quick response templates */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase text-slate-500">
                  Quick Export Quotation Templates:
                </span>
                <span className="text-[10px] text-emerald-700 font-mono">FOB Patan, Nepal</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleLoadTemplate('proforma')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Generate Pro-Forma FOB Quote
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadTemplate('samples')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Complimentary 8" Master Sample
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadTemplate('frequency_certs')}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  Send 432Hz Spectrum Certs
                </button>
              </div>
            </div>

            {/* Response Composer */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-2">
              <label className="block text-[11px] font-bold uppercase text-slate-700">
                Reply to {activeInquiry.fromName}
              </label>
              <textarea
                rows={7}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Draft pro-forma invoice terms, air freight schedule, or forge specifications..."
                className="w-full p-3 border border-slate-200 rounded-lg text-slate-900 font-sans text-xs leading-relaxed outline-none focus:border-[#0f172a]"
              />

              {sentNotice && (
                <div className="p-2 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200 font-semibold">
                  Reply dispatched to {activeInquiry.fromEmail} via Resonance Gmail Sequence Hub!
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Logged in operator: <strong className="text-slate-800">Pema Tsering (Export Ops)</strong>
                </span>

                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-4 py-2 rounded-lg bg-[#9b4500] hover:bg-[#763300] disabled:bg-slate-300 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Send Export Reply</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
