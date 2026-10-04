-- ========================================================
-- PhotoReeti - Supabase PostgreSQL Database Schema & Seed
-- ========================================================

-- 1. Enable UUID and cryptographic extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Drop existing tables if re-running (clean slate)
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS portfolio_items CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS photographers CASCADE;

-- 3. PHOTOGRAPHERS TABLE
CREATE TABLE photographers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  avatar TEXT,
  cover_photo TEXT,
  verified BOOLEAN DEFAULT true,
  super_host BOOLEAN DEFAULT false,
  rating NUMERIC(3,2) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  location TEXT,
  experience TEXT,
  starting_price INTEGER,
  currency TEXT DEFAULT '₹',
  price_type TEXT DEFAULT 'per day',
  category TEXT,
  bio TEXT,
  badges JSONB DEFAULT '[]'::jsonb,
  gear JSONB DEFAULT '[]'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PACKAGES TABLE
CREATE TABLE packages (
  id TEXT PRIMARY KEY,
  photographer_id TEXT NOT NULL REFERENCES photographers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT,
  price INTEGER NOT NULL,
  deliverables JSONB DEFAULT '[]'::jsonb,
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REVIEWS TABLE
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  photographer_id TEXT NOT NULL REFERENCES photographers(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  date TEXT,
  comment TEXT,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PORTFOLIO ITEMS TABLE
CREATE TABLE portfolio_items (
  id TEXT PRIMARY KEY,
  photographer_id TEXT NOT NULL REFERENCES photographers(id) ON DELETE CASCADE,
  title TEXT,
  category TEXT,
  url TEXT NOT NULL,
  aspect TEXT DEFAULT 'portrait',
  likes INTEGER DEFAULT 0,
  exif TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BOOKINGS TABLE
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  photographer_id TEXT NOT NULL REFERENCES photographers(id) ON DELETE CASCADE,
  photographer_name TEXT,
  photographer_avatar TEXT,
  service_title TEXT,
  event_date TEXT,
  location TEXT,
  status TEXT DEFAULT 'Quote Accepted & Deposit Secured',
  stage INTEGER DEFAULT 2,
  total_amount INTEGER NOT NULL,
  deposit_paid INTEGER NOT NULL,
  balance_due INTEGER NOT NULL,
  client_id TEXT DEFAULT 'client-guest',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CHAT MESSAGES TABLE
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  photographer_id TEXT NOT NULL REFERENCES photographers(id) ON DELETE CASCADE,
  sender TEXT NOT NULL, -- 'user' or 'photographer'
  text TEXT,
  type TEXT DEFAULT 'text', -- 'text' or 'quote'
  quote_data JSONB DEFAULT NULL,
  time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS
ALTER TABLE photographers ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all catalog data
CREATE POLICY "Public read photographers" ON photographers FOR SELECT USING (true);
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read portfolio_items" ON portfolio_items FOR SELECT USING (true);

-- Allow public read & insert on bookings
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update bookings" ON bookings FOR UPDATE USING (true);

-- Allow public read & insert on messages for real-time chat
CREATE POLICY "Public read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Realtime publication for chat messages and bookings
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;

-- ========================================================
-- 10. SEED DATA
-- ========================================================

-- Insert Photographers
INSERT INTO photographers (id, name, handle, avatar, cover_photo, verified, super_host, rating, review_count, location, experience, starting_price, currency, price_type, category, bio, badges, gear, stats)
VALUES 
(
  'p1',
  'Kabir & Rhea Verma',
  '@verma_cinematics',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  true,
  true,
  4.98,
  164,
  'Mumbai (Bandra & South)',
  '8+ Years Exp',
  35000,
  '₹',
  'per day',
  'wedding',
  'Award-winning duo capturing intimate, cinematic royal weddings, grand receptions, and raw emotions across India & destination venues.',
  '["Top Rated 2026", "Direct P2P Verified", "Fast Responder (< 10 mins)"]'::jsonb,
  '["Leica SL2-S", "Sony A7R V", "50mm f/1.2 GM", "Profoto B10X Plus"]'::jsonb,
  '{"shootsCompleted": 310, "clientRetention": "98%", "avgDeliveryDays": "4 Days"}'::jsonb
),
(
  'p2',
  'Maya Chen',
  '@mayachen_studio',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
  true,
  false,
  4.92,
  98,
  'Bengaluru (Indiranagar & Koramangala)',
  '6 Years Exp',
  22000,
  '₹',
  'per day',
  'fashion',
  'High-fashion, editorial stylist and commercial campaign creator for Vogue, Harper''s Bazaar, and luxury designer lookbooks.',
  '["Editorial Pick", "Studio Owner", "Creative Direction"]'::jsonb,
  '["Hasselblad X2D 100C", "Canon R5 C", "85mm f/1.4", "Broncolor Scoro"]'::jsonb,
  '{"shootsCompleted": 185, "clientRetention": "94%", "avgDeliveryDays": "3 Days"}'::jsonb
),
(
  'p3',
  'Arjun Kapoor',
  '@arjun_streetraw',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
  true,
  false,
  4.88,
  82,
  'Delhi NCR (Hauz Khas & Gurgaon)',
  '5 Years Exp',
  18000,
  '₹',
  'per session',
  'candid',
  'Documentary visual artist focusing on real stories, soulful portraits, street culture, and lifestyle narratives in natural ambient light.',
  '["Magnum Nominee 2024", "Natural Light Specialist"]'::jsonb,
  '["Fujifilm GFX 100 II", "Fujifilm X-T5", "35mm f/1.4"]'::jsonb,
  '{"shootsCompleted": 142, "clientRetention": "91%", "avgDeliveryDays": "2 Days"}'::jsonb
),
(
  'p4',
  'Aarav & Tara Sen',
  '@sen_coastallight',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  true,
  true,
  4.96,
  112,
  'Goa (North & South Coast)',
  '7 Years Exp',
  25000,
  '₹',
  'per sunset',
  'wedding',
  'Destination beach weddings, golden-hour couple sessions, and sea-salt bohemian portraits crafted along the sun-drenched shores of Goa.',
  '["Beach Specialist", "Drone Certified", "Sunset Expert"]'::jsonb,
  '["Sony FX3", "Sony A7S III", "DJI Mavic 3 Pro", "24-70mm f/2.8 GM II"]'::jsonb,
  '{"shootsCompleted": 220, "clientRetention": "96%", "avgDeliveryDays": "5 Days"}'::jsonb
);

-- Insert Packages for p1
INSERT INTO packages (id, photographer_id, title, duration, price, deliverables, popular)
VALUES
('pkg-1', 'p1', 'Essential Pre-Wedding / Portrait', '4 Hours', 28000, '["40 Master High-Res Color Graded Retouches", "Online Private Gallery for 1 Year", "Full Commercial & Print Rights", "Same-Week Delivery"]'::jsonb, false),
('pkg-2', 'p1', 'Signature Royal Ceremony & Reception', 'Full Day (Up to 10 Hours)', 65000, '["Dual Photographers (Kabir + Rhea)", "150+ Signature High-Res Master Edits", "Curated Hardcover Leatherbound Lookbook (12x12)", "All RAW Uncompressed Previews via Cloud", "48-Hour Sneak Peek Preview (15 photos)"]'::jsonb, true),
('pkg-3', 'p1', 'Multi-Day Destination Wedding Extravaganza', '2 Full Days', 130000, '["Complete Team of 3 Cinematographers & Photographers", "Drone 4K Aerial Coverage Included", "300+ Premium Retouched Masterpieces", "2 Luxury Keepsake Albums + Parent Mini-Albums", "Full Copyright Release"]'::jsonb, false);

-- Insert Reviews for p1
INSERT INTO reviews (id, photographer_id, author, rating, date, comment, avatar)
VALUES
('r1', 'p1', 'Ananya & Siddharth', 5, '2 weeks ago', 'Kabir and Rhea captured our wedding in Udaipur with breathtaking poetry. No awkward posing—pure candid magic and lightning-fast delivery!', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'),
('r2', 'p1', 'Vikramaditya Singhania', 5, '1 month ago', 'Booking directly on PhotoReeti saved us agency commission and let us talk to the artists directly. Super transparent and world-class craft.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80');

-- Insert Portfolio for p1
INSERT INTO portfolio_items (id, photographer_id, title, category, url, aspect, likes, exif)
VALUES
('pf-101', 'p1', 'Royal Udaipur Palace Vows', 'wedding', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80', 'portrait', 842, 'Leica SL2-S · 50mm f/1.2 · 1/800s · ISO 100'),
('pf-102', 'p1', 'Golden Sunset Mehendi Glow', 'wedding', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80', 'landscape', 612, 'Sony A7R V · 85mm f/1.4 · 1/1000s · ISO 125'),
('pf-103', 'p1', 'Bride Intimate Preparation', 'candid', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80', 'portrait', 925, 'Leica SL2-S · 35mm f/1.4 · 1/400s · ISO 200');

-- Insert Initial Bookings
INSERT INTO bookings (id, photographer_id, photographer_name, photographer_avatar, service_title, event_date, location, status, stage, total_amount, deposit_paid, balance_due)
VALUES
('bk-9041', 'p1', 'Kabir & Rhea Verma', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', 'Signature Royal Ceremony & Reception', '24 Nov 2026', 'Taj Lake Palace, Udaipur', 'Confirmed & Deposit Secured', 2, 65000, 13000, 52000),
('bk-8820', 'p2', 'Maya Chen', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'Studio Lookbook / Model Portfolio', '18 Oct 2026', 'Maya Chen Studio, Indiranagar, Bengaluru', 'Shoot Scheduled & Briefed', 3, 22000, 5000, 17000),
('bk-7112', 'p4', 'Aarav & Tara Sen', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', 'Golden Hour Beach Portrait Session', '28 Sep 2026', 'Ashvem Beach, North Goa', 'Completed & Gallery Delivered', 5, 18000, 18000, 0);

-- Insert Initial Chat Messages
INSERT INTO messages (id, photographer_id, sender, text, type, quote_data, time)
VALUES
('m1', 'p1', 'photographer', 'Hello! Welcome to PhotoReeti. I’m Kabir from Verma Cinematics. How can Rhea and I help bring your vision to life?', 'text', NULL, 'Yesterday 4:15 PM'),
('m2', 'p1', 'user', 'Hi Kabir! We’re planning a 2-day royal celebration in Udaipur around late November. We love your candid aesthetic and want no cheesy posed shots.', 'text', NULL, 'Yesterday 4:22 PM'),
('m3', 'p1', 'photographer', 'That sounds magnificent! November in Udaipur has the most flattering, buttery golden light. We specialize exclusively in candid, documentary-style storytelling.', 'text', NULL, 'Yesterday 4:25 PM'),
('m4', 'p1', 'photographer', 'I have attached your itemized proposal quote below.', 'quote', '{"title": "Royal Udaipur 2-Day Celebration Package", "dates": "Nov 24 - 25, 2026", "total": 120000, "depositRequired": 24000, "deliverables": ["Dual Principal Artists (Kabir & Rhea)", "250+ Master Color Graded High-Res Stills", "48-Hr Highlight Sneak Peek Gallery", "Complimentary Handcrafted Leather Keepsake Album"]}'::jsonb, '10:42 AM');
