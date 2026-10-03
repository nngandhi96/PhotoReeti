export const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: 'sparkles' },
  { id: 'wedding', label: 'Wedding & Royal', icon: 'heart' },
  { id: 'fashion', label: 'Fashion & Editorial', icon: 'sparkle' },
  { id: 'candid', label: 'Candid & Portraits', icon: 'user' },
  { id: 'food', label: 'Gastronomy & Food', icon: 'utensils' },
  { id: 'architecture', label: 'Architecture & Spaces', icon: 'building' },
  { id: 'drone', label: 'Drone & Aerial', icon: 'plane' }
];

export const LOCATIONS = [
  'All Locations',
  'Mumbai (Bandra & South)',
  'Bengaluru (Indiranagar & Koramangala)',
  'Delhi NCR (Hauz Khas & Gurgaon)',
  'Goa (North & South Coast)',
  'Jaipur (Heritage & Palace)',
  'New York (SoHo & Brooklyn)',
  'London (Mayfair & Soho)'
];

export const PHOTOGRAPHERS = [
  {
    id: 'p1',
    name: 'Kabir & Rhea Verma',
    handle: '@verma_cinematics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    superHost: true,
    rating: 4.98,
    reviewCount: 164,
    location: 'Mumbai (Bandra & South)',
    experience: '8+ Years Exp',
    startingPrice: 35000,
    currency: '₹',
    priceType: 'per day',
    category: 'wedding',
    bio: 'Award-winning duo capturing intimate, cinematic royal weddings, grand receptions, and raw emotions across India & destination venues.',
    badges: ['Top Rated 2026', 'Direct P2P Verified', 'Fast Responder (< 10 mins)'],
    gear: ['Leica SL2-S', 'Sony A7R V', '50mm f/1.2 GM', 'Profoto B10X Plus'],
    stats: {
      shootsCompleted: 310,
      clientRetention: '98%',
      avgDeliveryDays: '4 Days'
    },
    packages: [
      {
        id: 'pkg-1',
        title: 'Essential Pre-Wedding / Portrait',
        duration: '4 Hours',
        price: 28000,
        deliverables: [
          '40 Master High-Res Color Graded Retouches',
          'Online Private Gallery for 1 Year',
          'Full Commercial & Print Rights',
          'Same-Week Delivery'
        ],
        popular: false
      },
      {
        id: 'pkg-2',
        title: 'Signature Royal Ceremony & Reception',
        duration: 'Full Day (Up to 10 Hours)',
        price: 65000,
        deliverables: [
          'Dual Photographers (Kabir + Rhea)',
          '150+ Signature High-Res Master Edits',
          'Curated Hardcover Leatherbound Lookbook (12x12)',
          'All RAW Uncompressed Previews via Cloud',
          '48-Hour Sneak Peek Preview (15 photos)'
        ],
        popular: true
      },
      {
        id: 'pkg-3',
        title: 'Multi-Day Destination Wedding Extravaganza',
        duration: '2 Full Days',
        price: 130000,
        deliverables: [
          'Complete Team of 3 Cinematographers & Photographers',
          'Drone 4K Aerial Coverage Included',
          '300+ Premium Retouched Masterpieces',
          '2 Luxury Keepsake Albums + Parent Mini-Albums',
          'Full Copyright Release'
        ],
        popular: false
      }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Ananya & Siddharth',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Kabir and Rhea captured our wedding in Udaipur with breathtaking poetry. No awkward posing—pure candid magic and lightning-fast delivery!',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'r2',
        author: 'Vikramaditya Singhania',
        rating: 5,
        date: '1 month ago',
        comment: 'Booking directly on PhotoReeti saved us agency commission and let us talk to the artists directly. Super transparent and world-class craft.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      }
    ],
    portfolio: [
      {
        id: 'pf-101',
        title: 'Royal Udaipur Palace Vows',
        category: 'wedding',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 842,
        exif: 'Leica SL2-S · 50mm f/1.2 · 1/800s · ISO 100'
      },
      {
        id: 'pf-102',
        title: 'Golden Sunset Mehendi Glow',
        category: 'wedding',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 624,
        exif: 'Sony A7R V · 85mm f/1.4 · 1/1200s · ISO 160'
      },
      {
        id: 'pf-103',
        title: 'Intimate Bridal Preparation',
        category: 'candid',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 1205,
        exif: 'Sony A7R V · 35mm f/1.4 GM · 1/500s · ISO 400'
      },
      {
        id: 'pf-104',
        title: 'Grand Palace Courtyard Phere',
        category: 'wedding',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 910,
        exif: 'Sony A7R V · 24-70mm f/2.8 · 1/640s · ISO 200'
      },
      {
        id: 'pf-105',
        title: 'Emerald Night Lights Celebration',
        category: 'wedding',
        url: 'https://images.unsplash.com/photo-1519225424976-1b0593452656?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 540,
        exif: 'Leica SL2-S · 28mm f/2.0 · 1/250s · ISO 1600'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Maya Chen',
    handle: '@mayachen_editorial',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    superHost: true,
    rating: 4.99,
    reviewCount: 98,
    location: 'Bengaluru (Indiranagar & Koramangala)',
    experience: '6+ Years Exp',
    startingPrice: 22000,
    currency: '₹',
    priceType: 'per shoot',
    category: 'fashion',
    bio: 'Vogue & Harper’s Bazaar contributor. High-contrast fashion editorial, luxury apparel lookbooks, and avant-garde portraits with dramatic lighting.',
    badges: ['Editorial Star', 'Direct P2P Verified', 'Studio Owner'],
    gear: ['Hasselblad X2D 100C', 'Broncolor Siros 800L', '90mm f/2.5'],
    stats: {
      shootsCompleted: 184,
      clientRetention: '95%',
      avgDeliveryDays: '3 Days'
    },
    packages: [
      {
        id: 'pkg-201',
        title: 'Studio Lookbook / Model Portfolio',
        duration: '3 Hours',
        price: 22000,
        deliverables: [
          'Indiranagar Studio Space Included',
          '20 High-Fashion High-Res Retouched Looks',
          'Moodboard & Creative Direction Guidance',
          '48-Hour Delivery'
        ],
        popular: true
      },
      {
        id: 'pkg-202',
        title: 'Brand Campaign & Commercial Shoot',
        duration: 'Full Day (8 Hours)',
        price: 55000,
        deliverables: [
          'Full Creative Crew Coordination',
          '50 High-End Commercial Campaign Assets',
          'Worldwide Digital & Print Advertising Rights',
          'Complete Raw Color Grading Passes'
        ],
        popular: false
      }
    ],
    reviews: [
      {
        id: 'r21',
        author: 'Zoya Alvi (Fashion Designer)',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Maya elevated our sustainable silk collection to runway status! Her eye for fabric texture, shadows, and mood is second to none.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }
    ],
    portfolio: [
      {
        id: 'pf-201',
        title: 'Monochrome Velvet Silhouettes',
        category: 'fashion',
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 1420,
        exif: 'Hasselblad X2D · 90mm f/2.5 · 1/250s · ISO 64'
      },
      {
        id: 'pf-202',
        title: 'Neon Noir Street Haute Couture',
        category: 'fashion',
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 890,
        exif: 'Hasselblad X2D · 55mm f/2.5 · 1/500s · ISO 100'
      },
      {
        id: 'pf-203',
        title: 'Golden Hour High-Editorial Veil',
        category: 'fashion',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 1100,
        exif: 'Sony A7R V · 85mm f/1.4 GM · 1/1600s · ISO 100'
      },
      {
        id: 'pf-204',
        title: 'Sculptural Shadows & Jewelry',
        category: 'fashion',
        url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 775,
        exif: 'Hasselblad X2D · 90mm f/2.5 · 1/200s · ISO 64'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Devansh Kothari',
    handle: '@devansh_arch',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    superHost: false,
    rating: 4.95,
    reviewCount: 72,
    location: 'Delhi NCR (Hauz Khas & Gurgaon)',
    experience: '7+ Years Exp',
    startingPrice: 30000,
    currency: '₹',
    priceType: 'per project',
    category: 'architecture',
    bio: 'Architectural Digest & Dezeen featured photographer. Documenting luxury residences, boutique hospitality, and modern urban geometry with tilt-shift precision.',
    badges: ['AD Featured', 'Direct P2P Verified', 'Drone Certified'],
    gear: ['Canon EOS R5', 'TS-E 17mm f/4L', 'TS-E 24mm f/3.5L II', 'DJI Inspire 3'],
    stats: {
      shootsCompleted: 140,
      clientRetention: '92%',
      avgDeliveryDays: '5 Days'
    },
    packages: [
      {
        id: 'pkg-301',
        title: 'Luxury Villa / Apartment Showcase',
        duration: 'Half Day (5 Hours)',
        price: 30000,
        deliverables: [
          '25 Tilt-Shift Perspective Corrected Stills',
          'Twilight / Dusk Lighting Session',
          'Architectural Magazine Color Grading',
          'High-Res Commercial Architecture License'
        ],
        popular: true
      },
      {
        id: 'pkg-302',
        title: 'Hospitality Resort & Aerial Cinema',
        duration: 'Full Day + Twilight',
        price: 68000,
        deliverables: [
          '50 Interior & Exterior Stills',
          'DJI 4K Drone Aerial Top-Down Views',
          'Staged Architectural Lighting',
          'Web & Print Marketing Rights'
        ],
        popular: false
      }
    ],
    reviews: [
      {
        id: 'r31',
        author: 'Ar. Rohan Mehra',
        rating: 5,
        date: '2 months ago',
        comment: 'Devansh captures lines and natural light with unparalleled mathematical precision. Our design firm won a national award based on his photo portfolio!',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
      }
    ],
    portfolio: [
      {
        id: 'pf-301',
        title: 'Brutalist Concrete & Warm Oak Villa',
        category: 'architecture',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 670,
        exif: 'Canon R5 · TS-E 24mm · 2.5s · f/11 · ISO 100'
      },
      {
        id: 'pf-302',
        title: 'Infinity Pool at Twilight Serenade',
        category: 'architecture',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 930,
        exif: 'Canon R5 · 17mm f/4 · 8s · f/8 · ISO 100'
      },
      {
        id: 'pf-303',
        title: 'Minimalist Spiral Marble Stairwell',
        category: 'architecture',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 1250,
        exif: 'Canon R5 · 15-35mm f/2.8 · 1/60s · f/5.6 · ISO 200'
      }
    ]
  },
  {
    id: 'p4',
    name: 'Aarav & Tara Sen',
    handle: '@tara_candid',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    superHost: true,
    rating: 4.97,
    reviewCount: 135,
    location: 'Goa (North & South Coast)',
    experience: '5+ Years Exp',
    startingPrice: 18000,
    currency: '₹',
    priceType: 'per session',
    category: 'candid',
    bio: 'Soulful portraits, beachside sunset memoirs, engagement proposals, and bohemian lifestyle sessions with warm nostalgic film aesthetics.',
    badges: ['Film Tonalist', 'Direct P2P Verified', 'Sunset Specialist'],
    gear: ['Fujifilm GFX 100S', 'GF 110mm f/2', 'Contax 645 (Analog Film)'],
    stats: {
      shootsCompleted: 215,
      clientRetention: '96%',
      avgDeliveryDays: '2 Days'
    },
    packages: [
      {
        id: 'pkg-401',
        title: 'Golden Hour Beach Portrait Session',
        duration: '90 Minutes',
        price: 18000,
        deliverables: [
          '35 Warm Film-Toned Master Stills',
          'Private Beach Location Scouting',
          'Outfit & Mood Guidance',
          'Online Web Gallery in 48 Hours'
        ],
        popular: true
      },
      {
        id: 'pkg-402',
        title: 'Secret Proposal & Love Story Memoir',
        duration: '3 Hours',
        price: 32000,
        deliverables: [
          'Stealth Proposal Coordination',
          '60 Retouched Narrative Moments',
          'Mini Cinematic Highlight Reel',
          'Complimentary Champagne & Setup Advice'
        ],
        popular: false
      }
    ],
    reviews: [
      {
        id: 'r41',
        author: 'Tanvi & Neil',
        rating: 5,
        date: '1 week ago',
        comment: 'Tara made us feel so comfortable on Ashvem beach. We forgot the camera was even there, and the pictures look straight out of an indie movie!',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }
    ],
    portfolio: [
      {
        id: 'pf-401',
        title: 'Ashvem Coast Wind & Sunlight',
        category: 'candid',
        url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 1850,
        exif: 'Fujifilm GFX · 110mm f/2 · 1/1600s · ISO 100'
      },
      {
        id: 'pf-402',
        title: 'Nostalgic Sun Flare Whispers',
        category: 'candid',
        url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 1040,
        exif: 'Fujifilm GFX · 80mm f/1.7 · 1/2000s · ISO 125'
      },
      {
        id: 'pf-403',
        title: 'Vintage Old Town Palm Shades',
        category: 'candid',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 815,
        exif: 'Contax 645 · Kodak Portra 400 · f/2.8'
      }
    ]
  },
  {
    id: 'p5',
    name: 'Chef Samar Kapoor',
    handle: '@samar_gastronomy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    superHost: false,
    rating: 4.96,
    reviewCount: 64,
    location: 'Mumbai (Bandra & South)',
    experience: '6+ Years Exp',
    startingPrice: 20000,
    currency: '₹',
    priceType: 'per menu shoot',
    category: 'food',
    bio: 'Culinary photographer & food stylist working with Michelin-starred bistros, luxury cocktail bars, and artisanal food brands. Food that makes you crave.',
    badges: ['Culinary Stylist', 'Direct P2P Verified'],
    gear: ['Nikon Z8', 'Nikkor Z MC 105mm f/2.8 VR S', 'Godox AD400 Pro'],
    stats: {
      shootsCompleted: 120,
      clientRetention: '91%',
      avgDeliveryDays: '3 Days'
    },
    packages: [
      {
        id: 'pkg-501',
        title: 'Bistro Menu & Signature Cocktails',
        duration: '4 Hours',
        price: 20000,
        deliverables: [
          'Up to 15 Styled Signature Dishes / Drinks',
          'Professional Food Styling & Props Kit Included',
          'Menu Card & Swiggy/Zomato High-Res Exports',
          'Social Media Reels Cut B-Roll Stills'
        ],
        popular: true
      }
    ],
    reviews: [
      {
        id: 'r51',
        author: 'Chef Ranveer & Partners',
        rating: 5,
        date: '1 month ago',
        comment: 'Samar understands the soul of food plating like a chef himself. Our restaurant reservations went up 40% after posting his photos!',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
      }
    ],
    portfolio: [
      {
        id: 'pf-501',
        title: 'Smoked Saffron Risotto Texture',
        category: 'food',
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 720,
        exif: 'Nikon Z8 · 105mm f/2.8 · 1/160s · f/8 · ISO 64'
      },
      {
        id: 'pf-502',
        title: 'Bourbon Ember Smoky Cocktail Pour',
        category: 'food',
        url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
        aspect: 'portrait',
        likes: 990,
        exif: 'Nikon Z8 · 50mm f/1.8 · 1/250s · f/4 · ISO 100'
      }
    ]
  },
  {
    id: 'p6',
    name: 'Vikram Aditya Roy',
    handle: '@vikram_aerials',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    superHost: true,
    rating: 4.97,
    reviewCount: 88,
    location: 'Jaipur (Heritage & Palace)',
    experience: '8+ Years Exp',
    startingPrice: 38000,
    currency: '₹',
    priceType: 'per shoot',
    category: 'drone',
    bio: 'DGCA licensed master drone pilot & cinematic landscape artist. Specializing in palace aerials, fortress reveals, desert dunes, and large-scale celebrations.',
    badges: ['DGCA Master Pilot', 'Direct P2P Verified', '4K Cinema Cinema'],
    gear: ['DJI Inspire 3 (Zenmuse X9-8K)', 'DJI Mavic 3 Pro Cine', 'Hasselblad Aerial Optics'],
    stats: {
      shootsCompleted: 190,
      clientRetention: '94%',
      avgDeliveryDays: '3 Days'
    },
    packages: [
      {
        id: 'pkg-601',
        title: 'Heritage Palace Aerial Reel & High-Res Stills',
        duration: 'Half Day',
        price: 38000,
        deliverables: [
          'Full 4K ProRes Aerial Video Footage',
          '30 Top-Down & Orthomosaic Stills',
          'Licensed DGCA Permissions & Insurance',
          'Color Graded D-Log Cinema Profile'
        ],
        popular: true
      }
    ],
    reviews: [
      {
        id: 'r61',
        author: 'Rathore Heritage Estates',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Vikram’s aerial view of our fort at sunrise was breathtaking. He is meticulous with safety and the video quality was Hollywood standard.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      }
    ],
    portfolio: [
      {
        id: 'pf-601',
        title: 'Amber Fort Golden Valley Mist',
        category: 'drone',
        url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 1340,
        exif: 'DJI Inspire 3 · 24mm f/2.8 · 1/1000s · ISO 100'
      },
      {
        id: 'pf-602',
        title: 'Desert Dunes Sunset Geometry',
        category: 'drone',
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=900&q=80',
        aspect: 'landscape',
        likes: 1110,
        exif: 'DJI Mavic 3 Pro · 70mm tele · 1/640s · ISO 100'
      }
    ]
  }
];

export const INITIAL_CHATS = [
  {
    photographerId: 'p1',
    unreadCount: 1,
    lastMessage: 'I’ve prepared the custom quote for your Royal Wedding dates in November! Let me know if you’d like to lock it in.',
    lastTime: '10:42 AM',
    messages: [
      {
        id: 'm1',
        sender: 'photographer',
        text: 'Hello! Welcome to PhotoReeti. I’m Kabir from Verma Cinematics. How can Rhea and I help bring your vision to life?',
        time: 'Yesterday 4:15 PM'
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'Hi Kabir! We’re planning a 2-day royal celebration in Udaipur around late November. We love your candid aesthetic and want no cheesy posed shots.',
        time: 'Yesterday 4:22 PM'
      },
      {
        id: 'm3',
        sender: 'photographer',
        text: 'That sounds magnificent! November in Udaipur has the most flattering, buttery golden light. We specialize exclusively in candid, documentary-style storytelling.',
        time: 'Yesterday 4:25 PM'
      },
      {
        id: 'm4',
        sender: 'photographer',
        type: 'quote',
        quoteData: {
          title: 'Royal Udaipur 2-Day Celebration Package',
          dates: 'Nov 24 - 25, 2026',
          total: 120000,
          depositRequired: 24000,
          deliverables: [
            'Dual Principal Artists (Kabir & Rhea)',
            '250+ Master Color Graded High-Res Stills',
            '48-Hr Highlight Sneak Peek Gallery',
            'Complimentary Handcrafted Leather Keepsake Album'
          ]
        },
        time: '10:42 AM'
      }
    ]
  },
  {
    photographerId: 'p2',
    unreadCount: 0,
    lastMessage: 'The studio in Indiranagar is booked for Saturday morning. See you there!',
    lastTime: '2 days ago',
    messages: [
      {
        id: 'm201',
        sender: 'user',
        text: 'Hey Maya, looking to shoot our Autumn capsule collection this weekend.',
        time: 'Oct 01, 11:00 AM'
      },
      {
        id: 'm202',
        sender: 'photographer',
        text: 'Hi! Saturday 10:00 AM works perfectly. Please bring the moodboard accessories.',
        time: 'Oct 01, 11:15 AM'
      },
      {
        id: 'm203',
        sender: 'photographer',
        text: 'The studio in Indiranagar is booked for Saturday morning. See you there!',
        time: 'Oct 01, 11:20 AM'
      }
    ]
  },
  {
    photographerId: 'p4',
    unreadCount: 0,
    lastMessage: 'The sunset proposal photos from Ashvem are ready in your private portal!',
    lastTime: 'Sep 28',
    messages: [
      {
        id: 'm401',
        sender: 'photographer',
        text: 'The sunset proposal photos from Ashvem are ready in your private portal!',
        time: 'Sep 28, 6:30 PM'
      }
    ]
  }
];

export const MOCK_BOOKINGS = [
  {
    id: 'bk-9041',
    photographerId: 'p1',
    photographerName: 'Kabir & Rhea Verma',
    photographerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    serviceTitle: 'Signature Royal Ceremony & Reception',
    eventDate: '24 Nov 2026',
    location: 'Taj Lake Palace, Udaipur',
    status: 'Confirmed & Deposit Secured',
    stage: 2, // 1: Booked, 2: Deposit Secured, 3: Pre-Shoot Briefing, 4: Shoot Day, 5: Delivered
    stages: ['Quote Accepted', 'Deposit Secured (20%)', 'Pre-Shoot Moodboard', 'Shoot Day', 'Final Gallery'],
    totalAmount: 65000,
    depositPaid: 13000,
    balanceDue: 52000,
    canChat: true
  },
  {
    id: 'bk-8820',
    photographerId: 'p2',
    photographerName: 'Maya Chen',
    photographerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    serviceTitle: 'Studio Lookbook / Model Portfolio',
    eventDate: '18 Oct 2026',
    location: 'Maya Chen Studio, Indiranagar, Bengaluru',
    status: 'Shoot Scheduled & Briefed',
    stage: 3,
    stages: ['Quote Accepted', 'Deposit Secured (20%)', 'Pre-Shoot Moodboard', 'Shoot Day', 'Final Gallery'],
    totalAmount: 22000,
    depositPaid: 5000,
    balanceDue: 17000,
    canChat: true
  },
  {
    id: 'bk-7112',
    photographerId: 'p4',
    photographerName: 'Aarav & Tara Sen',
    photographerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    serviceTitle: 'Golden Hour Beach Portrait Session',
    eventDate: '28 Sep 2026',
    location: 'Ashvem Beach, North Goa',
    status: 'Completed & Gallery Delivered',
    stage: 5,
    stages: ['Quote Accepted', 'Deposit Secured (20%)', 'Pre-Shoot Moodboard', 'Shoot Day', 'Final Gallery'],
    totalAmount: 18000,
    depositPaid: 18000,
    balanceDue: 0,
    galleryUrl: '#',
    canChat: true
  }
];
