import React, { useState } from 'react';
import { OutreachMessage } from '../types';
import { sendGmail, DEFAULT_USER_EMAIL, DEFAULT_USER_NAME } from '../services/auth';

interface OutreachStagingViewProps {
  messages: OutreachMessage[];
  onSendMessage: (msgId: string) => void;
  onNewCampaign: () => void;
  currentUserEmail?: string | null;
  onSignInWithGoogle?: () => void;
}

export const OutreachStagingView: React.FC<OutreachStagingViewProps> = ({
  messages,
  onSendMessage,
  onNewCampaign,
  currentUserEmail = DEFAULT_USER_EMAIL,
  onSignInWithGoogle,
}) => {
  const [selectedMsgId, setSelectedMsgId] = useState<string>(messages[0]?.id || '');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<{ id: string; success: boolean; text: string } | null>(null);

  const activeMsg = messages.find((m) => m.id === selectedMsgId) || messages[0];
  const senderEmail = currentUserEmail || DEFAULT_USER_EMAIL;

  const handleDispatchViaGmail = async (msg: OutreachMessage) => {
    setIsSending(true);
    setFeedback(null);

    const res = await sendGmail(msg.recipientEmail, msg.subject, msg.body, senderEmail);
    setIsSending(false);

    if (res.success) {
      setFeedback({
        id: msg.id,
        success: true,
        text: `Real email dispatched to ${msg.recipientEmail} via Gmail API (ID: ${res.messageId})!`,
      });
      onSendMessage(msg.id);
    } else {
      if (res.error === 'AUTH_REQUIRED') {
        setFeedback({
          id: msg.id,
          success: false,
          text: 'Google authentication required. Click "Connect Real Gmail" to authorize direct outbound sending.',
        });
      } else {
        setFeedback({
          id: msg.id,
          success: false,
          text: `Failed to send email: ${res.error}`,
        });
      }
    }
  };

  const handleSendTestToSelf = async (msg: OutreachMessage) => {
    setIsSending(true);
    setFeedback(null);

    const res = await sendGmail(senderEmail, `[TEST RUN] ${msg.subject}`, msg.body, senderEmail);
    setIsSending(false);

    if (res.success) {
      setFeedback({
        id: msg.id,
        success: true,
        text: `Test copy dispatched to your inbox (${senderEmail})! Message ID: ${res.messageId}`,
      });
    } else {
      if (res.error === 'AUTH_REQUIRED') {
        setFeedback({
          id: msg.id,
          success: false,
          text: 'Google authentication required. Click "Connect Real Gmail" first.',
        });
      } else {
        setFeedback({
          id: msg.id,
          success: false,
          text: `Send error: ${res.error}`,
        });
      }
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 tracking-wider">
            <span>Campaigns & Multi-Touch Outreach</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#9b4500]">Gmail Native Sequence Engine</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900 mt-1">
            AI Outreach Staging & Sequence Hub
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Sending personalized Himalayan wholesale sequences directly from{' '}
            <strong className="text-slate-900">{DEFAULT_USER_NAME} &lt;{senderEmail}&gt;</strong> to verified US buyers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Gmail Connected: {senderEmail}</span>
          </div>
          <button
            type="button"
            onClick={onNewCampaign}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs bg-[#9b4500] hover:bg-[#763300] text-white shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Draft Buyer Sequence</span>
          </button>
        </div>
      </div>

      {/* Sequence Cadence Visual */}
      <div className="p-4 bg-white rounded-xl shadow-xs border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Active Multi-Touch Sequence: "Himalayan 432Hz Provenance for US Sound Studios"
          </h3>
          <span className="text-xs text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Sender: {senderEmail}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-[#0077b5]">
            <span className="text-[10px] font-bold text-sky-700 uppercase font-mono">Step 1 • Day 0 (Immediate)</span>
            <p className="text-xs font-semibold text-slate-900 mt-1">Artisan Forge Lineage & 432Hz Sound Wave</p>
            <p className="text-[11px] text-slate-500 mt-0.5">60s studio binaural sound audio file + Patan metalmaster history</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-amber-500">
            <span className="text-[10px] font-bold text-amber-700 uppercase font-mono">Step 2 • Day 4 (+96 hrs)</span>
            <p className="text-xs font-semibold text-slate-900 mt-1">Wholesale FOB Spec Sheet & Margin Gap</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Breakdown showing 65%+ gross margin vs US domestic wholesale distributors</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-emerald-500">
            <span className="text-[10px] font-bold text-emerald-700 uppercase font-mono">Step 3 • Day 8 (+192 hrs)</span>
            <p className="text-xs font-semibold text-slate-900 mt-1">Complimentary Studio Sample Dispatch</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Offer 8-inch Patan bronze bowl sent directly to studio door via DHL Express</p>
          </div>
        </div>
      </div>

      {/* Main Staging Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden divide-y divide-slate-100">
          <div className="p-3 bg-slate-50 font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Staged & Active Sequences ({messages.length})</span>
            <span className="text-[10px] text-slate-400 font-mono">Auto-Personalized</span>
          </div>

          <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-100">
            {messages.map((msg) => {
              const isSelected = msg.id === selectedMsgId;
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMsgId(msg.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-amber-50/70 border-l-4 border-[#9b4500]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{msg.companyName}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        msg.status === 'Replied'
                          ? 'bg-emerald-100 text-emerald-800'
                          : msg.status === 'Opened'
                          ? 'bg-blue-100 text-blue-800'
                          : msg.status === 'Sent'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium truncate mt-1">
                    {msg.subject}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
                    <span>To: {msg.recipientName}</span>
                    <span>{msg.sentAt || 'Queued'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Preview Drawer (7 cols) */}
        {activeMsg && (
          <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#9b4500] uppercase tracking-wider block">
                  Sequence Email Preview • Step {activeMsg.step}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                  {activeMsg.subject}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {activeMsg.status}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 font-mono text-slate-600 border border-slate-200">
              <div className="flex justify-between">
                <span>From (Real Sender):</span>
                <span className="text-[#9b4500] font-bold">{DEFAULT_USER_NAME} &lt;{senderEmail}&gt;</span>
              </div>
              <div className="flex justify-between">
                <span>Recipient:</span>
                <span className="text-slate-900 font-semibold">{activeMsg.recipientName} &lt;{activeMsg.recipientEmail}&gt;</span>
              </div>
              <div className="flex justify-between">
                <span>Account:</span>
                <span className="text-slate-900">{activeMsg.companyName}</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line">
              {activeMsg.body}
            </div>

            {feedback && feedback.id === activeMsg.id && (
              <div
                className={`p-3 rounded-lg text-xs font-semibold flex items-center justify-between ${
                  feedback.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                <span>{feedback.text}</span>
                {!feedback.success && onSignInWithGoogle && (
                  <button
                    type="button"
                    onClick={onSignInWithGoogle}
                    className="px-2.5 py-1 bg-amber-600 text-white rounded font-bold text-[11px] hover:bg-amber-700 ml-2"
                  >
                    Connect Real Gmail
                  </button>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleSendTestToSelf(activeMsg)}
                disabled={isSending}
                className="text-xs text-[#0077b5] hover:underline font-semibold text-left"
              >
                Send Test Copy to My Email ({senderEmail})
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(activeMsg.body);
                    alert('Copied outreach text to clipboard!');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Copy Text
                </button>
                <button
                  type="button"
                  disabled={isSending}
                  onClick={() => handleDispatchViaGmail(activeMsg)}
                  className={`px-4 py-1.5 rounded-lg bg-[#9b4500] hover:bg-[#763300] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all ${
                    isSending ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isSending ? 'sync' : 'send'}
                  </span>
                  <span>{isSending ? 'Sending Real Email...' : 'Send Real Email via Gmail'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
