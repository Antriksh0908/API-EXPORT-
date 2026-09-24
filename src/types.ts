export type WebSourceType = 
  | 'linkedin' 
  | 'google_places' 
  | 'mindbody' 
  | 'shopify' 
  | 'instagram' 
  | 'dorking'
  | 'yoga_alliance';

export type BuyerArchetype = 
  | 'Sound Studio' 
  | 'Yoga Center' 
  | 'Metaphysical' 
  | 'Spa / Resort'
  | 'Acupuncture & Holistic';

export type LeadStatus = 'Live Scraped' | 'Verified' | 'Ready' | 'Needs Enrich' | 'In Outreach' | 'Sample Sent' | 'Closed Won';

export interface MultiWebTrace {
  linkedIn: string;
  googleMaps: string;
  onlineShop: string;
  crawledAgo: string;
  phoneVerified: boolean;
  mxValid: boolean;
  storefrontUrl?: string;
  reviewsCount?: number;
  rating?: number;
}

export interface BuyerLead {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  address: string;
  sourceType: WebSourceType;
  sourceLabel: string;
  sourceBadge: string;
  archetype: BuyerArchetype;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  initials: string;
  harvestedAt: string;
  affinityScore: number;
  status: LeadStatus;
  selected?: boolean;
  
  // Trade & Craft profile
  detectedProducts: string;
  estimatedDemand: string;
  fobTolerance: string;
  aiPitch: string;
  matchConfidence: string;
  multiWebTrace: MultiWebTrace;
  
  // Visuals
  images: {
    url: string;
    caption: string;
  }[];

  // Quality check details
  verificationChecks?: {
    mxRecord: boolean;
    businessLicense: boolean;
    physicalRetailAddress: boolean;
    activeScheduleOrCatalog: boolean;
    decisionMakerDirectEmail: boolean;
  };
}

export interface CrawlerWorker {
  id: string;
  name: string;
  code: string;
  sourceType: WebSourceType;
  status: 'Streaming' | 'Active' | 'Live Scan' | 'Listening' | 'Automated' | 'Paused';
  targetRoleOrScope: string;
  yieldVelocity: string;
  metricLabel: string;
  metricValue: string;
  activeFeature: string;
  enabled: boolean;
  icon: string;
  badgeBg: string;
  badgeColor: string;
}

export interface SocketFeedEvent {
  id: string;
  time: string;
  source: string;
  sourceType: WebSourceType;
  badgeClass: string;
  borderClass: string;
  text: string;
  timestamp: number;
}

export interface OutreachMessage {
  id: string;
  leadId: string;
  recipientName: string;
  recipientEmail: string;
  companyName: string;
  subject: string;
  body: string;
  step: number;
  status: 'Draft' | 'Queued' | 'Sent' | 'Opened' | 'Replied';
  sentAt?: string;
  openedAt?: string;
}

export interface BuyerInquiry {
  id: string;
  leadId: string;
  fromName: string;
  fromEmail: string;
  company: string;
  subject: string;
  message: string;
  time: string;
  unread: boolean;
  estimatedDealValue: string;
  productInterest: string;
}
