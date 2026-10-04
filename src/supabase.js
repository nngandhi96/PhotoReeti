import { createClient } from '@supabase/supabase-js';

// Read environment variables
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Clean base URL (strip any trailing /rest/v1 or trailing slash)
const supabaseUrl = rawSupabaseUrl
  ? rawSupabaseUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
  : '';

// Check if credentials are properly configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseUrl.startsWith('https://')
);

// Initialize Supabase Client (or null fallback)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

// ==========================================
// SUPABASE BACKEND SERVICES
// ==========================================

/**
 * Fetch all photographers with their packages, reviews, and portfolio
 */
export async function getPhotographersFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data: photographers, error } = await supabase
      .from('photographers')
      .select(`
        *,
        packages (*),
        reviews (*),
        portfolio:portfolio_items (*)
      `)
      .order('rating', { ascending: false });

    if (error) {
      console.warn('[Supabase] Error fetching photographers:', error.message);
      return null;
    }

    if (photographers && photographers.length > 0) {
      // Map database schema to match application format
      return photographers.map(p => ({
        id: p.id,
        name: p.name,
        handle: p.handle,
        avatar: p.avatar,
        coverPhoto: p.cover_photo,
        verified: p.verified,
        superHost: p.super_host,
        rating: Number(p.rating),
        reviewCount: p.review_count,
        location: p.location,
        experience: p.experience,
        startingPrice: p.starting_price,
        currency: p.currency || '₹',
        priceType: p.price_type || 'per day',
        category: p.category,
        bio: p.bio,
        badges: p.badges || [],
        gear: p.gear || [],
        stats: p.stats || {},
        packages: (p.packages || []).map(pkg => ({
          id: pkg.id,
          title: pkg.title,
          duration: pkg.duration,
          price: pkg.price,
          deliverables: pkg.deliverables || [],
          popular: pkg.popular
        })),
        reviews: (p.reviews || []).map(r => ({
          id: r.id,
          author: r.author,
          rating: r.rating,
          date: r.date,
          comment: r.comment,
          avatar: r.avatar
        })),
        portfolio: (p.portfolio || []).map(pf => ({
          id: pf.id,
          title: pf.title,
          category: pf.category,
          url: pf.url,
          aspect: pf.aspect || 'portrait',
          likes: pf.likes || 0,
          exif: pf.exif || ''
        }))
      }));
    }
    return null;
  } catch (err) {
    console.warn('[Supabase] Exception in getPhotographersFromSupabase:', err);
    return null;
  }
}

/**
 * Fetch all bookings from Supabase
 */
export async function getBookingsFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] Error fetching bookings:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(b => ({
        id: b.id,
        photographerId: b.photographer_id,
        photographerName: b.photographer_name,
        photographerAvatar: b.photographer_avatar,
        serviceTitle: b.service_title,
        eventDate: b.event_date,
        location: b.location,
        status: b.status,
        stage: b.stage || 2,
        stages: ['Quote Accepted', 'Deposit Secured (20%)', 'Pre-Shoot Moodboard', 'Shoot Day', 'Final Gallery'],
        totalAmount: b.total_amount,
        depositPaid: b.deposit_paid,
        balanceDue: b.balance_due,
        canChat: true
      }));
    }
    return null;
  } catch (err) {
    console.warn('[Supabase] Exception in getBookingsFromSupabase:', err);
    return null;
  }
}

/**
 * Insert a new booking into Supabase
 */
export async function insertBookingToSupabase(booking) {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          id: booking.id,
          photographer_id: booking.photographerId,
          photographer_name: booking.photographerName,
          photographer_avatar: booking.photographerAvatar,
          service_title: booking.serviceTitle,
          event_date: booking.eventDate,
          location: booking.location,
          status: booking.status,
          stage: booking.stage,
          total_amount: booking.totalAmount,
          deposit_paid: booking.depositPaid,
          balance_due: booking.balanceDue
        }
      ]);

    if (error) {
      console.error('[Supabase] Booking insert failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Exception inserting booking:', err);
    return false;
  }
}

/**
 * Fetch messages for a specific photographer chat thread
 */
export async function getMessagesFromSupabase(photographerId) {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('photographer_id', photographerId)
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('[Supabase] Error fetching messages:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map(m => ({
        id: m.id,
        sender: m.sender,
        text: m.text,
        type: m.type,
        quoteData: m.quote_data,
        time: m.time
      }));
    }
    return null;
  } catch (err) {
    console.warn('[Supabase] Exception fetching messages:', err);
    return null;
  }
}

/**
 * Insert a chat message into Supabase
 */
export async function insertMessageToSupabase(photographerId, message) {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          id: message.id,
          photographer_id: photographerId,
          sender: message.sender,
          text: message.text || null,
          type: message.type || 'text',
          quote_data: message.quoteData || null,
          time: message.time || 'Just now'
        }
      ]);

    if (error) {
      console.error('[Supabase] Message insert failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Exception inserting message:', err);
    return false;
  }
}

/**
 * Subscribe to real-time chat messages for a photographer
 */
export function subscribeToChatMessages(photographerId, onNewMessage) {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const channel = supabase
      .channel(`chat_${photographerId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `photographer_id=eq.${photographerId}`
        },
        payload => {
          const row = payload.new;
          if (row) {
            onNewMessage({
              id: row.id,
              sender: row.sender,
              text: row.text,
              type: row.type,
              quoteData: row.quote_data,
              time: row.time
            });
          }
        }
      )
      .subscribe();

    return channel;
  } catch (err) {
    console.warn('[Supabase] Subscription error:', err);
    return null;
  }
}

// ==========================================
// SUPABASE AUTHENTICATION SERVICES
// ==========================================

/**
 * Register a new user with email, password and profile metadata
 */
export async function signUpUser({ email, password, fullName, role = 'client', phone = '' }) {
  if (!isSupabaseConfigured || !supabase) {
    const mockUser = {
      id: 'usr_' + Date.now(),
      email,
      user_metadata: { full_name: fullName, role, phone }
    };
    return { data: { user: mockUser, session: { user: mockUser } }, error: null };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
          phone
        }
      }
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Sign in an existing user with email and password
 */
export async function signInUser({ email, password }) {
  if (!isSupabaseConfigured || !supabase) {
    const mockUser = {
      id: 'usr_demo_' + Date.now(),
      email,
      user_metadata: { full_name: email.split('@')[0], role: 'client' }
    };
    return { data: { user: mockUser, session: { user: mockUser } }, error: null };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Sign out current user
 */
export async function signOutUser() {
  if (!isSupabaseConfigured || !supabase) {
    return { error: null };
  }
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: err };
  }
}

/**
 * Get current active user from active session
 */
export async function getAuthUser() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch (err) {
    console.warn('[Supabase Auth] Failed getting session:', err);
    return null;
  }
}

/**
 * Listen to auth state changes (SIGN_IN, SIGN_OUT, TOKEN_REFRESHED)
 */
export function subscribeToAuth(callback) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null, event);
    });
    return subscription;
  } catch (err) {
    console.warn('[Supabase Auth] Failed subscribing to auth:', err);
    return null;
  }
}

