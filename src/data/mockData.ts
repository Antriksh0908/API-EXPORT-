import { BuyerLead, CrawlerWorker, SocketFeedEvent, BuyerInquiry, OutreachMessage } from '../types';

export const INITIAL_CRAWLERS: CrawlerWorker[] = [
  {
    id: 'worker-1',
    name: 'LinkedIn & Sales Navigator Crawler',
    code: 'LK-US-8821',
    sourceType: 'linkedin',
    status: 'Streaming',
    targetRoleOrScope: 'Studio Owner, Sound Healer, Buyer',
    yieldVelocity: '34 leads/hr (98ms ping)',
    metricLabel: 'Decision-Maker Match',
    metricValue: '91% Direct Email',
    activeFeature: 'Auto-parsing Profiles',
    enabled: true,
    icon: 'in',
    badgeBg: 'bg-[#0077b5]/10',
    badgeColor: 'text-[#0077b5]'
  },
  {
    id: 'worker-2',
    name: 'Google Places & Maps Geocrawler',
    code: 'US-50-METRO',
    sourceType: 'google_places',
    status: 'Active',
    targetRoleOrScope: 'NYC, LA, Austin, Sedona, Seattle',
    yieldVelocity: '58 studios/hr',
    metricLabel: 'Extracted Payload',
    metricValue: 'Storefront, Phone, Owner, Hours',
    activeFeature: 'Geocoding Physical Retail',
    enabled: true,
    icon: 'explore',
    badgeBg: 'bg-emerald-50',
    badgeColor: 'text-emerald-600'
  },
  {
    id: 'worker-3',
    name: 'Mindbody & ClassPass Crawler',
    code: 'MB-US-SCHEDULE',
    sourceType: 'mindbody',
    status: 'Streaming',
    targetRoleOrScope: 'Sound Bath, Singing Bowl Meditation',
    yieldVelocity: '42 hubs/hr',
    metricLabel: 'Intake Trigger',
    metricValue: '> 3 Sound events / week',
    activeFeature: 'Schedule & Teacher Mapping',
    enabled: true,
    icon: 'spa',
    badgeBg: 'bg-orange-50',
    badgeColor: 'text-orange-600'
  },
  {
    id: 'worker-4',
    name: 'Shopify Catalog & Cart Harvester',
    code: 'SHP-CAT-US',
    sourceType: 'shopify',
    status: 'Live Scan',
    targetRoleOrScope: 'Crystal bowls, 7-Metal singing bowls',
    yieldVelocity: 'Auto-calculates FOB margin gap',
    metricLabel: 'Inventory Trace',
    metricValue: 'Shopify DNS + WHOIS match',
    activeFeature: 'SKU Price Intelligence Active',
    enabled: true,
    icon: 'storefront',
    badgeBg: 'bg-green-50',
    badgeColor: 'text-green-700'
  },
  {
    id: 'worker-5',
    name: 'Instagram & Linktree Bio Harvester',
    code: 'SOC-BIO-PRACTITIONER',
    sourceType: 'instagram',
    status: 'Listening',
    targetRoleOrScope: '#soundbathla #soundhealingnyc',
    yieldVelocity: 'Direct email + Linktree forms',
    metricLabel: 'Lead Conversion',
    metricValue: '94% Certified Sound Healers',
    activeFeature: 'Practitioner Roster Synced',
    enabled: true,
    icon: 'share',
    badgeBg: 'bg-pink-50',
    badgeColor: 'text-pink-600'
  },
  {
    id: 'worker-6',
    name: 'Automated Search Engine Dorking',
    code: 'GOOG-B2B-INTENT',
    sourceType: 'dorking',
    status: 'Automated',
    targetRoleOrScope: '"wholesale singing bowls" file:pdf OR "inquiry"',
    yieldVelocity: 'Every 15 minutes',
    metricLabel: 'Anti-Captcha Tunnel',
    metricValue: 'Residential Proxy Rotated',
    activeFeature: 'Rotating 8,400 US IPs',
    enabled: true,
    icon: 'manage_search',
    badgeBg: 'bg-indigo-50',
    badgeColor: 'text-indigo-600'
  }
];

export const INITIAL_LEADS: BuyerLead[] = [
  {
    id: 'lead-0',
    name: 'Pure Resonance Studio',
    location: 'Austin, TX (South Congress Ave)',
    city: 'Austin',
    state: 'TX',
    address: '1608 S Congress Ave, Austin, TX 78704',
    sourceType: 'linkedin',
    sourceLabel: 'LinkedIn Sales Nav',
    sourceBadge: 'in LinkedIn Live',
    archetype: 'Sound Studio',
    contactName: 'Julian Vance',
    contactTitle: 'Purchasing Director & Sound Alchemist',
    contactEmail: 'julian@pureresonancestudio.com',
    contactPhone: '+1 (512) 890-4412',
    initials: 'JV',
    harvestedAt: 'Just now (2s)',
    affinityScore: 97,
    status: 'Live Scraped',
    selected: true,
    detectedProducts: 'Full 7-Chakra Bronze Sets, Tingshas',
    estimatedDemand: '30 - 60 Bowl Units',
    fobTolerance: '$90 - $380 USD (High Margin)',
    aiPitch: 'Lead with artisan hand-hammered 432Hz master sets from Patan. Mention Austin express delivery via DHL Kathmandu and personalized Tibetan brocade bags.',
    matchConfidence: 'Match Confidence: 97%',
    multiWebTrace: {
      linkedIn: 'Matched (1.8k)',
      googleMaps: '4.9★ (140 rev)',
      onlineShop: 'Shopify (Live)',
      crawledAgo: 'Crawled 2s ago',
      phoneVerified: true,
      mxValid: true,
      storefrontUrl: 'https://pureresonancestudio.com',
      reviewsCount: 140,
      rating: 4.9
    },
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1cwMQpseVf7jwPCBcgZ3-FIGM5Jqtw5hV4PapQbealtWlYVEEnp_jYY-nP1-hj2mbYOlrXgtj6ONqTnRzMFvepRxecoNFmIoTNRUwwsDq_knU0TvXCg_oMIOWN8iRphBmIbfP84TLE8sCEV4LWKfjUhiWXwfXcCLeg2MOenEmrzzorf3LsofaAwa7eecExcAs6xgmeT8jjI7ZRjv1lCtK3nhyeu7mRlcVsFqlzih6Kc-HWNVpqkFP',
        caption: 'Active Studio Bowls'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAi1C-0z6wmd8LsOnVCKEmOJbylZuDWgtxEAb9lHaYt3u3Z6goMVtxHjQTBu3ccpmboO8Q-C1O-0s7PJCZRrcRbJBdDrzUUxpzMh0dV6VEncF4EMYLyIdu9KXcdKlNtgJENi3QVDybKFsLPpSlk0IOGPIWWfV9GEU2_TOFu7BD1P8Kd2gnmJFMHMtFYqnRip1ykh4pTBmPW3VSQK3wBtfuwV2dKCtwvifJSMLmCH0Bp28P7S4R9uYp',
        caption: 'Scraped Retail Rack'
      }
    ],
    verificationChecks: {
      mxRecord: true,
      businessLicense: true,
      physicalRetailAddress: true,
      activeScheduleOrCatalog: true,
      decisionMakerDirectEmail: true
    }
  },
  {
    id: 'lead-1',
    name: 'The Sound Space NYC',
    location: 'New York, NY (Flatiron District)',
    city: 'New York',
    state: 'NY',
    address: '24 W 23rd St, 4th Fl, New York, NY 10010',
    sourceType: 'google_places',
    sourceLabel: 'Google Places + LinkedIn',
    sourceBadge: 'Maps + LinkedIn',
    archetype: 'Sound Studio',
    contactName: 'Elena Rostova',
    contactTitle: 'Studio Director & Merchandise Buyer',
    contactEmail: 'elena@soundspacenyc.com',
    contactPhone: '+1 (212) 473-9021',
    initials: 'ER',
    harvestedAt: '18s ago',
    affinityScore: 96,
    status: 'Verified',
    selected: true,
    detectedProducts: '7" to 14" Bronze Sets, Tingshas',
    estimatedDemand: '25 - 50 Bowl Units',
    fobTolerance: '$80 - $350 USD (Premium)',
    aiPitch: 'Target with Master Grade 7-Metal Alloy 432Hz Sound Bath Set. Mention direct forge provenance in Patan, Kathmandu Valley with custom branded silk ring cushions.',
    matchConfidence: 'Match Confidence: 96%',
    multiWebTrace: {
      linkedIn: 'Matched (2.4k)',
      googleMaps: '4.9★ (210 rev)',
      onlineShop: 'Square Ingest',
      crawledAgo: 'Crawled 18s ago',
      phoneVerified: true,
      mxValid: true,
      storefrontUrl: 'https://soundspacenyc.com',
      reviewsCount: 210,
      rating: 4.9
    },
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1cwMQpseVf7jwPCBcgZ3-FIGM5Jqtw5hV4PapQbealtWlYVEEnp_jYY-nP1-hj2mbYOlrXgtj6ONqTnRzMFvepRxecoNFmIoTNRUwwsDq_knU0TvXCg_oMIOWN8iRphBmIbfP84TLE8sCEV4LWKfjUhiWXwfXcCLeg2MOenEmrzzorf3LsofaAwa7eecExcAs6xgmeT8jjI7ZRjv1lCtK3nhyeu7mRlcVsFqlzih6Kc-HWNVpqkFP',
        caption: 'Active Studio Bowls'
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAi1C-0z6wmd8LsOnVCKEmOJbylZuDWgtxEAb9lHaYt3u3Z6goMVtxHjQTBu3ccpmboO8Q-C1O-0s7PJCZRrcRbJBdDrzUUxpzMh0dV6VEncF4EMYLyIdu9KXcdKlNtgJENi3QVDybKFsLPpSlk0IOGPIWWfV9GEU2_TOFu7BD1P8Kd2gnmJFMHMtFYqnRip1ykh4pTBmPW3VSQK3wBtfuwV2dKCtwvifJSMLmCH0Bp28P7S4R9uYp',
        caption: 'Scraped Retail Rack'
      }
    ],
    verificationChecks: {
      mxRecord: true,
      businessLicense: true,
      physicalRetailAddress: true,
      activeScheduleOrCatalog: true,
      decisionMakerDirectEmail: true
    }
  },
  {
    id: 'lead-2',
    name: 'Sage & Sound Sanctuary',
    location: 'Los Angeles, CA (Santa Monica)',
    city: 'Santa Monica',
    state: 'CA',
    address: '1421 Ocean Ave, Los Angeles, CA 90401',
    sourceType: 'mindbody',
    sourceLabel: 'Mindbody Engine',
    sourceBadge: 'Mindbody Active',
    archetype: 'Spa / Resort',
    contactName: 'Marcus Vance',
    contactTitle: 'Procurement Specialist',
    contactEmail: 'marcus.v@sagesoundla.com',
    contactPhone: '+1 (310) 919-8802',
    initials: 'MV',
    harvestedAt: '42s ago',
    affinityScore: 92,
    status: 'Ready',
    selected: true,
    detectedProducts: 'Gift Sets, Small Gongs, Crystal Bowls',
    estimatedDemand: '40 - 70 Units (Retail/Gift)',
    fobTolerance: '$45 - $180 USD (Mid-Tier)',
    aiPitch: 'Pitch packaged 7-Chakra boxed gift sets with engraved wooden strikers and printed acoustic frequency cards.',
    matchConfidence: 'Match Confidence: 92%',
    multiWebTrace: {
      linkedIn: 'Matched (890)',
      googleMaps: '4.8★ (94 rev)',
      onlineShop: 'Shopify Store',
      crawledAgo: 'Crawled 42s ago',
      phoneVerified: true,
      mxValid: true,
      storefrontUrl: 'https://sagesoundla.com',
      reviewsCount: 94,
      rating: 4.8
    },
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAi1C-0z6wmd8LsOnVCKEmOJbylZuDWgtxEAb9lHaYt3u3Z6goMVtxHjQTBu3ccpmboO8Q-C1O-0s7PJCZRrcRbJBdDrzUUxpzMh0dV6VEncF4EMYLyIdu9KXcdKlNtgJENi3QVDybKFsLPpSlk0IOGPIWWfV9GEU2_TOFu7BD1P8Kd2gnmJFMHMtFYqnRip1ykh4pTBmPW3VSQK3wBtfuwV2dKCtwvifJSMLmCH0Bp28P7S4R9uYp',
        caption: 'Retail Display'
      }
    ],
    verificationChecks: {
      mxRecord: true,
      businessLicense: true,
      physicalRetailAddress: true,
      activeScheduleOrCatalog: true,
      decisionMakerDirectEmail: true
    }
  },
  {
    id: 'lead-3',
    name: 'Himalayan Arts & Crystals',
    location: 'Boulder, CO (Pearl St)',
    city: 'Boulder',
    state: 'CO',
    address: '1122 Pearl St, Boulder, CO 80302',
    sourceType: 'shopify',
    sourceLabel: 'Shopify Wholesale',
    sourceBadge: 'Shopify Catalog',
    archetype: 'Metaphysical',
    contactName: 'Sarah Jenkins',
    contactTitle: 'Owner & Store Buyer',
    contactEmail: 's.jenkins@himalayancrystalsco.com',
    contactPhone: '+1 (303) 551-7822',
    initials: 'SJ',
    harvestedAt: '1m ago',
    affinityScore: 98,
    status: 'Ready',
    selected: true,
    detectedProducts: 'Raw Matte Bowls, Heavy Gong Stands',
    estimatedDemand: '80 - 120 Bulk Bowl Units',
    fobTolerance: '$35 - $120 USD (Volume Bulk)',
    aiPitch: 'Offer direct pallet shipping from Kathmandu with air freight consolidation at LAX. Focus on raw acoustic mass and weight discounts.',
    matchConfidence: 'Match Confidence: 98%',
    multiWebTrace: {
      linkedIn: 'Matched (1.1k)',
      googleMaps: '5.0★ (312 rev)',
      onlineShop: 'Shopify Plus',
      crawledAgo: 'Crawled 1m ago',
      phoneVerified: true,
      mxValid: true,
      storefrontUrl: 'https://himalayancrystalsco.com',
      reviewsCount: 312,
      rating: 5.0
    },
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1cwMQpseVf7jwPCBcgZ3-FIGM5Jqtw5hV4PapQbealtWlYVEEnp_jYY-nP1-hj2mbYOlrXgtj6ONqTnRzMFvepRxecoNFmIoTNRUwwsDq_knU0TvXCg_oMIOWN8iRphBmIbfP84TLE8sCEV4LWKfjUhiWXwfXcCLeg2MOenEmrzzorf3LsofaAwa7eecExcAs6xgmeT8jjI7ZRjv1lCtK3nhyeu7mRlcVsFqlzih6Kc-HWNVpqkFP',
        caption: 'Himalayan Inventory'
      }
    ],
    verificationChecks: {
      mxRecord: true,
      businessLicense: true,
      physicalRetailAddress: true,
      activeScheduleOrCatalog: true,
      decisionMakerDirectEmail: true
    }
  },
  {
    id: 'lead-4',
    name: 'Sedona Sacred Resonance',
    location: 'Sedona, AZ (Bell Rock Vista)',
    city: 'Sedona',
    state: 'AZ',
    address: '340 State Route 179, Sedona, AZ 86336',
    sourceType: 'linkedin',
    sourceLabel: 'LinkedIn + Web',
    sourceBadge: 'LinkedIn Live',
    archetype: 'Sound Studio',
    contactName: 'Dr. Kenneth Thorne',
    contactTitle: 'Lead Practitioner & Founder',
    contactEmail: 'info@sedonahealingarts.org',
    contactPhone: '+1 (928) 282-1940',
    initials: 'KT',
    harvestedAt: '2m ago',
    affinityScore: 89,
    status: 'Ready',
    selected: true,
    detectedProducts: 'Concert Grade Bowls, Rare Antique Alloys',
    estimatedDemand: '10 - 20 High-Value Units',
    fobTolerance: '$250 - $900 USD (Master Class)',
    aiPitch: 'Present archival aged alloy analysis and certified frequency spectrum readings per individual bowl.',
    matchConfidence: 'Match Confidence: 89%',
    multiWebTrace: {
      linkedIn: 'Matched (3.2k)',
      googleMaps: '4.9★ (420 rev)',
      onlineShop: 'WooCommerce',
      crawledAgo: 'Crawled 2m ago',
      phoneVerified: true,
      mxValid: true,
      storefrontUrl: 'https://sedonahealingarts.org',
      reviewsCount: 420,
      rating: 4.9
    },
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAi1C-0z6wmd8LsOnVCKEmOJbylZuDWgtxEAb9lHaYt3u3Z6goMVtxHjQTBu3ccpmboO8Q-C1O-0s7PJCZRrcRbJBdDrzUUxpzMh0dV6VEncF4EMYLyIdu9KXcdKlNtgJENi3QVDybKFsLPpSlk0IOGPIWWfV9GEU2_TOFu7BD1P8Kd2gnmJFMHMtFYqnRip1ykh4pTBmPW3VSQK3wBtfuwV2dKCtwvifJSMLmCH0Bp28P7S4R9uYp',
        caption: 'Sanctuary Display'
      }
    ],
    verificationChecks: {
      mxRecord: true,
      businessLicense: true,
      physicalRetailAddress: true,
      activeScheduleOrCatalog: true,
      decisionMakerDirectEmail: true
    }
  },
  {
    id: 'lead-5',
    name: 'Pacific Mind & Gong Lounge',
    location: 'Seattle, WA (Capitol Hill)',
    city: 'Seattle',
    state: 'WA',
    address: '915 E Pike St, Seattle, WA 98122',
    sourceType: 'instagram',
    sourceLabel: 'Instagram Bio Scraper',
    sourceBadge: 'Instagram Bio',
    archetype: 'Sound Studio',
    contactName: 'Aria Tanaka',
    contactTitle: 'Program Curator',
    contactEmail: 'aria@pacificgong.com',
    contactPhone: '+1 (206) 612-4019',
    initials: 'AT',
    harvestedAt: '4m ago',
    affinityScore: 91,
    status: 'Ready',
    selected: true,
    detectedProducts: 'Deep Tone Gongs, Heavy Rim Singing Bowls',
    estimatedDemand: '30 - 60 Units',
    fobTolerance: '$90 - $320 USD',
    aiPitch: 'Emphasize low-frequency sustain (under 120Hz) and artisan hand-hammered finish with Buddhist sacred knot engravings.',
    matchConfidence: 'Match Confidence: 91%',
    multiWebTrace: {
      linkedIn: 'Matched (740)',
      googleMaps: '4.7★ (88 rev)',
      onlineShop: 'Linktree Shop',
      crawledAgo: 'Crawled 4m ago',
      phoneVerified: true,
      mxValid: true,
      storefrontUrl: 'https://pacificgong.com',
      reviewsCount: 88,
      rating: 4.7
    },
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1cwMQpseVf7jwPCBcgZ3-FIGM5Jqtw5hV4PapQbealtWlYVEEnp_jYY-nP1-hj2mbYOlrXgtj6ONqTnRzMFvepRxecoNFmIoTNRUwwsDq_knU0TvXCg_oMIOWN8iRphBmIbfP84TLE8sCEV4LWKfjUhiWXwfXcCLeg2MOenEmrzzorf3LsofaAwa7eecExcAs6xgmeT8jjI7ZRjv1lCtK3nhyeu7mRlcVsFqlzih6Kc-HWNVpqkFP',
        caption: 'Acoustic Sound Floor'
      }
    ],
    verificationChecks: {
      mxRecord: true,
      businessLicense: true,
      physicalRetailAddress: true,
      activeScheduleOrCatalog: true,
      decisionMakerDirectEmail: true
    }
  },
  {
    id: 'lead-6',
    name: 'Prana Vibe Yoga Collective',
    location: 'Austin, TX (South Congress)',
    city: 'Austin',
    state: 'TX',
    address: '1604 S Congress Ave, Austin, TX 78704',
    sourceType: 'yoga_alliance',
    sourceLabel: 'Yoga Alliance Directory',
    sourceBadge: 'Yoga Alliance',
    archetype: 'Yoga Center',
    contactName: 'Devon Miller',
    contactTitle: 'Operations Director',
    contactEmail: 'devon@pranavibeaustin.com',
    contactPhone: '+1 (512) 341-9988',
    initials: 'DM',
    harvestedAt: '6m ago',
    affinityScore: 85,
    status: 'Needs Enrich',
    selected: false,
    detectedProducts: 'Large Floor Bowls, Teacher Kits',
    estimatedDemand: '15 - 30 Units',
    fobTolerance: '$120 - $400 USD',
    aiPitch: 'Position teacher training sets for 200hr RYT courses. Highlight anti-fatigue striker mallets.',
    matchConfidence: 'Match Confidence: 85%',
    multiWebTrace: {
      linkedIn: 'Partial Match',
      googleMaps: '4.6★ (110 rev)',
      onlineShop: 'Custom Site',
      crawledAgo: 'Crawled 6m ago',
      phoneVerified: true,
      mxValid: false,
      storefrontUrl: 'https://pranavibeaustin.com',
      reviewsCount: 110,
      rating: 4.6
    },
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAi1C-0z6wmd8LsOnVCKEmOJbylZuDWgtxEAb9lHaYt3u3Z6goMVtxHjQTBu3ccpmboO8Q-C1O-0s7PJCZRrcRbJBdDrzUUxpzMh0dV6VEncF4EMYLyIdu9KXcdKlNtgJENi3QVDybKFsLPpSlk0IOGPIWWfV9GEU2_TOFu7BD1P8Kd2gnmJFMHMtFYqnRip1ykh4pTBmPW3VSQK3wBtfuwV2dKCtwvifJSMLmCH0Bp28P7S4R9uYp',
        caption: 'Yoga Floor'
      }
    ],
    verificationChecks: {
      mxRecord: false,
      businessLicense: true,
      physicalRetailAddress: true,
      activeScheduleOrCatalog: false,
      decisionMakerDirectEmail: false
    }
  },
  {
    id: 'lead-7',
    name: 'Miraval Wellness Resort & Spa',
    location: 'Tucson, AZ (Catalina Foothills)',
    city: 'Tucson',
    state: 'AZ',
    address: '5000 E Vía Estancia Miraval, Tucson, AZ 85739',
    sourceType: 'google_places',
    sourceLabel: 'Google Places Luxury Index',
    sourceBadge: 'Luxury Spa Index',
    archetype: 'Spa / Resort',
    contactName: 'Chloe Sutherland',
    contactTitle: 'Director of Holistic Programming',
    contactEmail: 'c.sutherland@miravalresorts.com',
    contactPhone: '+1 (520) 825-4000',
    initials: 'CS',
    harvestedAt: '8m ago',
    affinityScore: 99,
    status: 'Ready',
    selected: true,
    detectedProducts: 'Concert Sets, Master Gong 36", Silk Accents',
    estimatedDemand: '50 - 90 Luxury Sets',
    fobTolerance: '$350 - $1,400 USD',
    aiPitch: 'Luxury retreat specification with custom Sanskrit mantra engraving, forge certificate of authenticity signed by 4th-generation Patan metalmasters.',
    matchConfidence: 'Match Confidence: 99%',
    multiWebTrace: {
      linkedIn: 'Matched (5.8k)',
      googleMaps: '4.9★ (850 rev)',
      onlineShop: 'Hyatt / Miraval Spa Hub',
      crawledAgo: 'Crawled 8m ago',
      phoneVerified: true,
      mxValid: true,
      storefrontUrl: 'https://miravalresorts.com',
      reviewsCount: 850,
      rating: 4.9
    },
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1cwMQpseVf7jwPCBcgZ3-FIGM5Jqtw5hV4PapQbealtWlYVEEnp_jYY-nP1-hj2mbYOlrXgtj6ONqTnRzMFvepRxecoNFmIoTNRUwwsDq_knU0TvXCg_oMIOWN8iRphBmIbfP84TLE8sCEV4LWKfjUhiWXwfXcCLeg2MOenEmrzzorf3LsofaAwa7eecExcAs6xgmeT8jjI7ZRjv1lCtK3nhyeu7mRlcVsFqlzih6Kc-HWNVpqkFP',
        caption: 'Resort Sound Pavilion'
      }
    ],
    verificationChecks: {
      mxRecord: true,
      businessLicense: true,
      physicalRetailAddress: true,
      activeScheduleOrCatalog: true,
      decisionMakerDirectEmail: true
    }
  }
];

export const INITIAL_SOCKET_EVENTS: SocketFeedEvent[] = [
  {
    id: 'evt-1',
    time: '[14:22:04]',
    source: 'LinkedIn Harvester',
    sourceType: 'linkedin',
    badgeClass: 'bg-[#0077b5]/20 text-[#38bdf8]',
    borderClass: 'border-[#0077b5]',
    text: 'Discovered Julian Vance (Purchasing Director @ Pure Resonance Studio, Austin, TX) • Matched 14 bowl setups in studio feed • Verified email julian@pureresonancestudio.com',
    timestamp: Date.now() - 2000
  },
  {
    id: 'evt-2',
    time: '[14:22:01]',
    source: 'Google Places B2B',
    sourceType: 'google_places',
    badgeClass: 'bg-amber-500/20 text-amber-300',
    borderClass: 'border-amber-400',
    text: 'Extracted Sol Sound Lounge (Miami Beach, FL) • 4.9 Stars (184 reviews) • Owner contact contact@solsoundmiami.com verified via Google Business Profile',
    timestamp: Date.now() - 5000
  },
  {
    id: 'evt-3',
    time: '[14:21:58]',
    source: 'Shopify Scanner',
    sourceType: 'shopify',
    badgeClass: 'bg-green-500/20 text-green-300',
    borderClass: 'border-green-400',
    text: 'Parsed Crystal & Sound Haven (Denver, CO) catalog: Sells 10" Frosted Bowls at $320 USD. Calculated Nepal FOB Wholesale Margin: 68% ($95 landing cost)',
    timestamp: Date.now() - 8000
  },
  {
    id: 'evt-4',
    time: '[14:21:49]',
    source: 'Mindbody Crawler',
    sourceType: 'mindbody',
    badgeClass: 'bg-blue-500/20 text-blue-300',
    borderClass: 'border-blue-400',
    text: 'Scraped studio schedule for Sedona Sacred Resonance • 6 weekly Tibetan singing bowl acoustic ceremonies • Flagged as High-Frequency Repeat Buyer',
    timestamp: Date.now() - 17000
  }
];

export const INITIAL_INQUIRIES: BuyerInquiry[] = [
  {
    id: 'inq-1',
    leadId: 'lead-0',
    fromName: 'Julian Vance',
    fromEmail: 'julian@pureresonancestudio.com',
    company: 'Pure Resonance Studio (Austin, TX)',
    subject: 'RE: Master 7-Metal 432Hz Sound Bath Bowls - Forge Provenance Question',
    message: 'Hello Antriksh,\n\nWe received your note regarding the hand-hammered singing bowls forged in Patan. Our sound alchemy program uses 432Hz tuned sets exclusively. Do you have frequency spectrum test certificates for each individual bowl in the 7-chakra set? Also, what would be the air freight turnaround for 12 complete sets to Austin?\n\nBest regards,\nJulian Vance',
    time: '12 min ago',
    unread: true,
    estimatedDealValue: '$8,400 FOB',
    productInterest: '7-Metal 432Hz Master Sets'
  },
  {
    id: 'inq-2',
    leadId: 'lead-1',
    fromName: 'Elena Rostova',
    fromEmail: 'elena@soundspacenyc.com',
    company: 'The Sound Space NYC',
    subject: 'Inquiry: Custom laser engraving on outer bronze rims + wholesale pricing',
    message: 'Hi Antriksh,\n\nWe are looking to place an opening order for our Flatiron and upcoming Brooklyn location. Can we provide our studio vector seal for engraving around the outer rim of the 10" and 12" bowls? Please send across the pro-forma quotation with DHL air delivery to JFK.\n\nWarmly,\nElena Rostova',
    time: '45 min ago',
    unread: true,
    estimatedDealValue: '$14,200 FOB',
    productInterest: '10" & 12" Master Bronze + Custom Engraving'
  },
  {
    id: 'inq-3',
    leadId: 'lead-3',
    fromName: 'Sarah Jenkins',
    fromEmail: 's.jenkins@himalayancrystalsco.com',
    company: 'Himalayan Arts & Crystals (Boulder, CO)',
    subject: 'Bulk Pallet Shipment FOB Kathmandu - Fall/Holiday stocking',
    message: 'Good morning Antriksh, we run 2 locations in Boulder and Denver. Looking for approximately 100-120 singing bowls ranging from 5 inches up to 14 inches with strikers and ring cushions. What volume discount tier can you extend for wire transfer 50% deposit?\n\nThanks,\nSarah',
    time: '2 hours ago',
    unread: false,
    estimatedDealValue: '$18,500 FOB',
    productInterest: 'Bulk Mixed Pallet (120 units)'
  }
];

export const INITIAL_OUTREACH: OutreachMessage[] = [
  {
    id: 'out-1',
    leadId: 'lead-0',
    recipientName: 'Julian Vance',
    recipientEmail: 'julian@pureresonancestudio.com',
    companyName: 'Pure Resonance Studio',
    subject: 'Direct Kathmandu Forge Provenance: 432Hz Master Sound Bath Bowls for Austin',
    body: `Hi Julian,\n\nI noticed Pure Resonance Studio's focus on immersive acoustic sound baths along South Congress in Austin.\n\nWe forge certified 7-Metal Alloy Tibetan singing bowls directly in Patan, Kathmandu Valley. Each bowl is tuned accurately to 432Hz harmonic fundamental frequencies (root through crown) and individually hammered by master artisans whose lineage dates back four generations.\n\nUnlike mass-cast brass alternatives, our bronze bell-metal retains a sustained acoustic resonance of 90+ seconds, which studio clients consistently praise during deep theta meditations.\n\nCould I send you a 60-second acoustic audio recording and our US wholesale catalog (with direct FOB Kathmandu pricing and landed DHL door-to-door rates)?\n\nWarm regards,\nAntriksh Sharma\nResonance Export • Himalayan Artisan Trade\nEmail: antrikssharma09@gmail.com`,
    step: 1,
    status: 'Replied',
    sentAt: 'Today at 09:30 AM',
    openedAt: 'Today at 10:15 AM'
  },
  {
    id: 'out-2',
    leadId: 'lead-1',
    recipientName: 'Elena Rostova',
    recipientEmail: 'elena@soundspacenyc.com',
    companyName: 'The Sound Space NYC',
    subject: 'Wholesale Master Bronze Bowls for The Sound Space NYC (Direct Forge Provenance)',
    body: `Hi Elena,\n\nFollowing your studio's sound bath schedule in the Flatiron district, I wanted to share our latest batch of hand-hammered 7-metal bronze singing bowls currently prepared for US export.\n\nWe provide direct forge-to-studio wholesale supply, including custom embroidery on pure Tibetan silk ring cushions and laser-etched frequency markers.\n\nWould you have 5 minutes this week to review our wholesale spec sheet and sound samples?\n\nBest regards,\nAntriksh Sharma\nResonance Export\nEmail: antrikssharma09@gmail.com`,
    step: 1,
    status: 'Replied',
    sentAt: 'Yesterday at 02:15 PM',
    openedAt: 'Yesterday at 03:00 PM'
  },
  {
    id: 'out-3',
    leadId: 'lead-2',
    recipientName: 'Marcus Vance',
    recipientEmail: 'marcus.v@sagesoundla.com',
    companyName: 'Sage & Sound Sanctuary',
    subject: 'Artisan 7-Chakra Boxed Gift Sets for Sage & Sound Santa Monica',
    body: `Hi Marcus,\n\nWe supply specialty holistic gift stores and sanctuaries with pre-packaged 7-Chakra Tibetan singing bowl gift kits, complete with rosewood strikers, hand-stitched brocade cushions, and informational frequency cards.\n\nOur FOB Kathmandu wholesale price allows a 65%+ retail gross margin for Santa Monica storefronts ($45 FOB landing at ~$62, retailing at $180-$220).\n\nShall I dispatch a physical sample unit to your Santa Monica sanctuary address this Thursday?\n\nWarm regards,\nAntriksh Sharma\nResonance Export\nEmail: antrikssharma09@gmail.com`,
    step: 1,
    status: 'Opened',
    sentAt: 'Today at 11:00 AM',
    openedAt: 'Today at 11:42 AM'
  }
];
