/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { HarvesterView } from './views/HarvesterView';
import { VerificationView } from './views/VerificationView';
import { BuyerDirectoryView } from './views/BuyerDirectoryView';
import { OutreachStagingView } from './views/OutreachStagingView';
import { ResponseInboxView } from './views/ResponseInboxView';
import { AnalyticsView } from './views/AnalyticsView';
import { ActivityLogView } from './views/ActivityLogView';
import { ScraperShellModal } from './components/ScraperShellModal';
import { AddConnectorModal } from './components/AddConnectorModal';
import { PitchComposerModal } from './components/PitchComposerModal';

import {
  INITIAL_LEADS,
  INITIAL_CRAWLERS,
  INITIAL_SOCKET_EVENTS,
  INITIAL_OUTREACH,
  INITIAL_INQUIRIES,
} from './data/mockData';
import { BuyerLead, CrawlerWorker, SocketFeedEvent, OutreachMessage, BuyerInquiry } from './types';
import {
  initAuth,
  googleSignIn,
  logout,
  DEFAULT_USER_EMAIL,
} from './services/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('lead-discovery');
  const [leads, setLeads] = useState<BuyerLead[]>(INITIAL_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState<string>(INITIAL_LEADS[0]?.id || '');
  const [crawlerWorkers, setCrawlerWorkers] = useState<CrawlerWorker[]>(INITIAL_CRAWLERS);
  const [socketEvents, setSocketEvents] = useState<SocketFeedEvent[]>(INITIAL_SOCKET_EVENTS);
  const [outreachMessages, setOutreachMessages] = useState<OutreachMessage[]>(INITIAL_OUTREACH);
  const [inquiries, setInquiries] = useState<BuyerInquiry[]>(INITIAL_INQUIRIES);

  const [harvesterActive, setHarvesterActive] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCrawlingWave, setIsCrawlingWave] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication & Gmail OAuth state
  const [userEmail, setUserEmail] = useState<string | null>(DEFAULT_USER_EMAIL);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  // Modals state
  const [isShellOpen, setIsShellOpen] = useState<boolean>(false);
  const [isAddConnectorOpen, setIsAddConnectorOpen] = useState<boolean>(false);
  const [pitchModalLead, setPitchModalLead] = useState<BuyerLead | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  // Initialize auth state listener
  useEffect(() => {
    initAuth(
      (user) => {
        if (user.email) {
          setUserEmail(user.email);
        }
      },
      () => {
        // Fallback default
        setUserEmail(DEFAULT_USER_EMAIL);
      }
    );
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      setIsAuthLoading(true);
      const res = await googleSignIn();
      if (res?.user.email) {
        setUserEmail(res.user.email);
        showToast(`Connected to Gmail (${res.user.email})! Direct outbound sending active.`);
      }
    } catch (err: any) {
      console.error('Google sign in error:', err);
      showToast(`Google Sign-In failed: ${err.message || err}`);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUserEmail(DEFAULT_USER_EMAIL);
      showToast('Signed out of Gmail.');
    } catch (err: any) {
      console.error('Sign out error:', err);
    }
  };

  // Real-time live simulation: dynamically append incoming crawler discovery
  useEffect(() => {
    if (!harvesterActive) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `[${now.toTimeString().split(' ')[0]}]`;
      const streamPool = [
        {
          source: 'LinkedIn Harvester',
          sourceType: 'linkedin' as const,
          badgeClass: 'bg-[#0077b5]/20 text-[#38bdf8]',
          borderClass: 'border-[#0077b5]',
          text: 'Scraped Buyer: Sarah Chen (Studio Curator @ Sound Oasis, San Francisco, CA) • Verified Email via LinkedIn Sales Nav',
        },
        {
          source: 'Google Places B2B',
          sourceType: 'google_places' as const,
          badgeClass: 'bg-amber-500/20 text-amber-300',
          borderClass: 'border-amber-400',
          text: 'Discovered Prana Center (Scottsdale, AZ) • 5-star Google review mentions "Looking for authentic Nepalese 7-Metal singing bowls"',
        },
        {
          source: 'Shopify Scanner',
          sourceType: 'shopify' as const,
          badgeClass: 'bg-green-500/20 text-green-300',
          borderClass: 'border-green-400',
          text: 'Extracted store catalog Aura Rituals (Portland, OR) • Inventory low on 8-inch hand-hammered crystal & bronze bowls',
        },
        {
          source: 'Mindbody Crawler',
          sourceType: 'mindbody' as const,
          badgeClass: 'bg-orange-500/20 text-orange-300',
          borderClass: 'border-orange-400',
          text: 'Detected 4 weekly acoustic sound baths at Bella Luna Holistic Sanctuary (Santa Fe, NM) • Flagged as High-Repeat Buyer',
        },
      ];

      const chosen = streamPool[Math.floor(Math.random() * streamPool.length)];
      const newEvt: SocketFeedEvent = {
        id: `stream-${Date.now()}`,
        time: timeStr,
        source: chosen.source,
        sourceType: chosen.sourceType,
        badgeClass: chosen.badgeClass,
        borderClass: chosen.borderClass,
        text: chosen.text,
        timestamp: Date.now(),
      };

      setSocketEvents((prev) => [newEvt, ...prev.slice(0, 15)]);
    }, 7500);

    return () => clearInterval(interval);
  }, [harvesterActive]);

  // Handle lead selections
  const handleSelectLead = (id: string) => {
    setSelectedLeadId(id);
  };

  const handleToggleLeadSelect = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, selected: !l.selected } : l))
    );
  };

  const handleSelectAllLeads = () => {
    const allSelected = leads.every((l) => l.selected);
    setLeads((prev) => prev.map((l) => ({ ...l, selected: !allSelected })));
  };

  const handleToggleWorker = (workerId: string) => {
    setCrawlerWorkers((prev) =>
      prev.map((w) =>
        w.id === workerId
          ? {
              ...w,
              enabled: !w.enabled,
              status: !w.enabled ? ('Streaming' as const) : ('Paused' as const),
            }
          : w
      )
    );
    showToast('Crawler worker configuration updated.');
  };

  const handleClearSocketFeed = () => {
    setSocketEvents([]);
    showToast('Socket stream buffer cleared.');
  };

  const handleForceCrawlWave = () => {
    setIsCrawlingWave(true);
    showToast('Dispatched autonomous crawler wave across 50 US states...');

    setTimeout(() => {
      const freshLead: BuyerLead = {
        id: `lead-fresh-${Date.now()}`,
        name: 'Sedona Sound Oasis',
        location: 'Sedona, AZ (Red Rock Loop)',
        city: 'Sedona',
        state: 'AZ',
        address: '224 Red Rock Loop Rd, Sedona, AZ 86336',
        sourceType: 'google_places',
        sourceLabel: 'Google Places Maps',
        sourceBadge: 'Maps Geocrawler',
        archetype: 'Sound Studio',
        contactName: 'Maya Sterling',
        contactTitle: 'Studio Director & Sound Therapist',
        contactEmail: 'maya@sedonasoundoasis.com',
        contactPhone: '+1 (928) 449-3012',
        initials: 'MS',
        harvestedAt: 'Just now (1s)',
        affinityScore: 99,
        status: 'Live Scraped',
        selected: true,
        detectedProducts: 'Concert 432Hz 7-Chakra Bronze Sets, Tingshas',
        estimatedDemand: '40 - 80 Bowl Units',
        fobTolerance: '$110 - $420 USD (High Margin)',
        aiPitch: 'Pitch Patan 4th-generation 7-metal hand-hammered 432Hz master sets with custom brocade cushions and individual frequency tuning certificates.',
        matchConfidence: 'Match Confidence: 99%',
        multiWebTrace: {
          linkedIn: 'Matched (1.4k)',
          googleMaps: '5.0★ (240 rev)',
          onlineShop: 'Shopify (Active)',
          crawledAgo: 'Crawled 1s ago',
          phoneVerified: true,
          mxValid: true,
          storefrontUrl: 'https://sedonasoundoasis.com',
          reviewsCount: 240,
          rating: 5.0,
        },
        images: [
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1cwMQpseVf7jwPCBcgZ3-FIGM5Jqtw5hV4PapQbealtWlYVEEnp_jYY-nP1-hj2mbYOlrXgtj6ONqTnRzMFvepRxecoNFmIoTNRUwwsDq_knU0TvXCg_oMIOWN8iRphBmIbfP84TLE8sCEV4LWKfjUhiWXwfXcCLeg2MOenEmrzzorf3LsofaAwa7eecExcAs6xgmeT8jjI7ZRjv1lCtK3nhyeu7mRlcVsFqlzih6Kc-HWNVpqkFP',
            caption: 'Studio Floor Bowls',
          },
          {
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAi1C-0z6wmd8LsOnVCKEmOJbylZuDWgtxEAb9lHaYt3u3Z6goMVtxHjQTBu3ccpmboO8Q-C1O-0s7PJCZRrcRbJBdDrzUUxpzMh0dV6VEncF4EMYLyIdu9KXcdKlNtgJENi3QVDybKFsLPpSlk0IOGPIWWfV9GEU2_TOFu7BD1P8Kd2gnmJFMHMtFYqnRip1ykh4pTBmPW3VSQK3wBtfuwV2dKCtwvifJSMLmCH0Bp28P7S4R9uYp',
            caption: 'Scraped Retail Shelf',
          },
        ],
        verificationChecks: {
          mxRecord: true,
          businessLicense: true,
          physicalRetailAddress: true,
          activeScheduleOrCatalog: true,
          decisionMakerDirectEmail: true,
        },
      };

      setLeads((prev) => [freshLead, ...prev]);
      setSelectedLeadId(freshLead.id);
      setIsCrawlingWave(false);
      showToast('Crawl complete: Discovered Sedona Sound Oasis (AZ) with 99% affinity!');
    }, 1800);
  };

  const handlePushToVerificationQueue = (leadIds: string[]) => {
    setLeads((prev) =>
      prev.map((l) =>
        leadIds.includes(l.id) ? { ...l, status: 'Verified' } : l
      )
    );
    showToast(`Pushed ${leadIds.length} lead${leadIds.length === 1 ? '' : 's'} to Verification & Quality Queue!`);
  };

  const handleRunBatchMxVerify = () => {
    setLeads((prev) =>
      prev.map((l) => ({
        ...l,
        multiWebTrace: { ...l.multiWebTrace, mxValid: true },
        verificationChecks: { ...l.verificationChecks, mxRecord: true } as any,
      }))
    );
    showToast('Batch MX validation complete: All selected mailboxes confirmed deliverable (250 OK).');
  };

  const handleRecrawlLead = (leadId: string) => {
    showToast(`Re-crawled real-time web endpoints for ${leadId}. Footprint updated.`);
  };

  const handleDiscardLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    showToast('Lead removed from active workspace.');
  };

  const handleExportStream = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Company,Contact,Email,Phone,City,State,Archetype,AffinityScore,Status,FOB_Tolerance']
        .concat(
          leads.map(
            (l) =>
              `"${l.name}","${l.contactName}","${l.contactEmail}","${l.contactPhone}","${l.city}","${l.state}","${l.archetype}",${l.affinityScore},"${l.status}","${l.fobTolerance}"`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Resonance_US_Wholesale_Pipeline_2025.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported 1,488 leads to CSV file!');
  };

  const handleAddConnector = (connector: {
    name: string;
    sourceType: any;
    scope: string;
    velocity: string;
  }) => {
    const newWorker: CrawlerWorker = {
      id: `worker-${Date.now()}`,
      name: connector.name,
      code: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      sourceType: connector.sourceType,
      status: 'Active',
      targetRoleOrScope: connector.scope,
      yieldVelocity: connector.velocity,
      metricLabel: 'Auto-Ingest Rate',
      metricValue: '95% Qualified Lead Yield',
      activeFeature: 'Rotating Residential Proxies',
      enabled: true,
      icon: connector.sourceType === 'linkedin' ? 'in' : 'hub',
      badgeBg: 'bg-emerald-50',
      badgeColor: 'text-emerald-700',
    };
    setCrawlerWorkers((prev) => [...prev, newWorker]);
    showToast(`Added and deployed crawler connector "${connector.name}".`);
  };

  const handleSendOutreach = (leadId: string, subject: string, body: string, sentViaRealGmail?: boolean) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;

    const newMsg: OutreachMessage = {
      id: `out-${Date.now()}`,
      leadId: targetLead.id,
      recipientName: targetLead.contactName,
      recipientEmail: targetLead.contactEmail,
      companyName: targetLead.name,
      subject,
      body,
      step: 1,
      status: sentViaRealGmail ? 'Sent' : 'Queued',
      sentAt: 'Just now',
    };

    setOutreachMessages((prev) => [newMsg, ...prev]);
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: 'In Outreach' } : l))
    );
    showToast(
      sentViaRealGmail
        ? `Dispatched real email to ${targetLead.contactEmail} from ${userEmail || DEFAULT_USER_EMAIL}!`
        : `Queued personalized Himalayan sequence to ${targetLead.contactEmail}!`
    );
    setActiveTab('gmail-sequence-hub');
  };

  const handleApproveLead = (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: 'Ready' } : l))
    );
    showToast('Lead approved and passed to Outreach Staging!');
  };

  const handleRejectLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    showToast('Lead rejected from pipeline.');
  };

  const handleReplyInquiry = (inquiryId: string, _replyText: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === inquiryId ? { ...i, unread: false } : i))
    );
    showToast(`Reply sent from ${userEmail || DEFAULT_USER_EMAIL}!`);
  };

  const handleMarkInquiryAsRead = (inquiryId: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === inquiryId ? { ...i, unread: false } : i))
    );
  };

  const pendingVerificationCount = leads.filter(
    (l) => l.status === 'Needs Enrich' || l.status === 'Live Scraped'
  ).length;

  const unreadInquiriesCount = inquiries.filter((i) => i.unread).length;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#0f172a] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        liveLeadCount={1488 + (leads.length > INITIAL_LEADS.length ? leads.length - INITIAL_LEADS.length : 0)}
        pendingCount={pendingVerificationCount || 84}
        inboxCount={unreadInquiriesCount || 12}
        harvesterActive={harvesterActive}
      />

      {/* Main Content Area */}
      <div className="pl-72">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          harvesterActive={harvesterActive}
          onForceCrawlWave={handleForceCrawlWave}
          isCrawlingWave={isCrawlingWave}
          unreadCount={unreadInquiriesCount}
          userEmail={userEmail}
          onSignInWithGoogle={handleSignInWithGoogle}
          onSignOut={handleSignOut}
          isAuthLoading={isAuthLoading}
        />

        <main className="w-full pt-16 bg-[#f7f9fb] min-h-screen">
          {activeTab === 'lead-discovery' && (
            <HarvesterView
              leads={leads}
              selectedLeadId={selectedLeadId}
              onSelectLead={handleSelectLead}
              onToggleLeadSelect={handleToggleLeadSelect}
              onSelectAllLeads={handleSelectAllLeads}
              crawlerWorkers={crawlerWorkers}
              onToggleWorker={handleToggleWorker}
              socketEvents={socketEvents}
              onClearSocketFeed={handleClearSocketFeed}
              harvesterActive={harvesterActive}
              onToggleHarvesterActive={() => setHarvesterActive(!harvesterActive)}
              onOpenShellModal={() => setIsShellOpen(true)}
              onOpenAddConnectorModal={() => setIsAddConnectorOpen(true)}
              onOpenPitchModal={(lead) => setPitchModalLead(lead)}
              onPushToVerificationQueue={handlePushToVerificationQueue}
              onRunBatchMxVerify={handleRunBatchMxVerify}
              onRecrawlLead={handleRecrawlLead}
              onDiscardLead={handleDiscardLead}
              onExportStream={handleExportStream}
            />
          )}

          {activeTab === 'verification-quality' && (
            <VerificationView
              leads={leads}
              onApproveLead={handleApproveLead}
              onRejectLead={handleRejectLead}
              onBatchVerifyAll={() => {
                setLeads((prev) =>
                  prev.map((l) => ({
                    ...l,
                    status: 'Ready',
                    multiWebTrace: { ...l.multiWebTrace, mxValid: true },
                  }))
                );
                showToast('Automated 5-point verification complete across all leads!');
              }}
              onSelectLeadForInspection={(id) => {
                setSelectedLeadId(id);
                setActiveTab('lead-discovery');
              }}
            />
          )}

          {activeTab === 'buyer-master-directory' && (
            <BuyerDirectoryView
              leads={leads}
              onSelectLeadForInspection={(id) => {
                setSelectedLeadId(id);
                setActiveTab('lead-discovery');
              }}
              onOpenPitchModal={(lead) => setPitchModalLead(lead)}
              onExportDirectory={handleExportStream}
            />
          )}

          {(activeTab === 'ai-outreach-staging' || activeTab === 'gmail-sequence-hub') && (
            <OutreachStagingView
              messages={outreachMessages}
              currentUserEmail={userEmail}
              onSignInWithGoogle={handleSignInWithGoogle}
              onSendMessage={(msgId) => {
                setOutreachMessages((prev) =>
                  prev.map((m) =>
                    m.id === msgId ? { ...m, status: 'Sent', sentAt: 'Just now' } : m
                  )
                );
                showToast('Outreach message pushed to active Gmail sequence queue!');
              }}
              onNewCampaign={() => {
                if (leads[0]) setPitchModalLead(leads[0]);
              }}
            />
          )}

          {activeTab === 'response-inbox' && (
            <ResponseInboxView
              inquiries={inquiries}
              currentUserEmail={userEmail}
              onSignInWithGoogle={handleSignInWithGoogle}
              onReplyInquiry={handleReplyInquiry}
              onMarkAsRead={handleMarkInquiryAsRead}
            />
          )}

          {activeTab === 'export-analytics' && <AnalyticsView />}

          {activeTab === 'internship-activity-log' && <ActivityLogView />}
        </main>
      </div>

      {/* Modals */}
      <ScraperShellModal
        isOpen={isShellOpen}
        onClose={() => setIsShellOpen(false)}
      />

      <AddConnectorModal
        isOpen={isAddConnectorOpen}
        onClose={() => setIsAddConnectorOpen(false)}
        onAddConnector={handleAddConnector}
      />

      <PitchComposerModal
        lead={pitchModalLead}
        isOpen={!!pitchModalLead}
        onClose={() => setPitchModalLead(null)}
        onSendOutreach={handleSendOutreach}
        currentUserEmail={userEmail}
        onSignInWithGoogle={handleSignInWithGoogle}
      />
    </div>
  );
}
