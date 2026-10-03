import './style.css';
import { createIcons, icons } from 'lucide';
import confetti from 'canvas-confetti';
import { CATEGORIES, LOCATIONS, PHOTOGRAPHERS, INITIAL_CHATS, MOCK_BOOKINGS } from './data/mockData.js';

// Application State
const state = {
  currentScreen: 'splash', // 'splash', 'explore', 'profile', 'chat', 'bookings'
  userRole: 'client', // 'client' or 'photographer'
  selectedLocation: 'All Locations',
  selectedCategory: 'all',
  searchQuery: '',
  selectedPhotographerId: 'p1',
  activeChatId: 'p1',
  profileTab: 'portfolio', // 'portfolio', 'packages', 'reviews'
  bookingsFilter: 'all', // 'all', 'active', 'completed'
  bookings: [...MOCK_BOOKINGS],
  chats: JSON.parse(JSON.stringify(INITIAL_CHATS)),
  lightboxPhoto: null,
  bookingModal: {
    isOpen: false,
    photographerId: 'p1',
    packageId: 'pkg-2'
  },
  locationModalOpen: false,
  toastMessage: null
};

// Currency Formatter
function formatINR(val) {
  return '₹' + Number(val).toLocaleString('en-IN');
}

// Toast Notification
function showToast(msg, duration = 3000) {
  state.toastMessage = msg;
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.style.cssText = `
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(10, 31, 38, 0.95);
    border: 1px solid var(--gold-border-bright);
    color: var(--gold-champagne);
    padding: 12px 24px;
    border-radius: var(--radius-pill);
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 0.9rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.7), var(--gold-glow);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 8px;
    backdrop-filter: blur(16px);
    animation: fadeIn 0.3s ease;
  `;
  toast.innerHTML = `<i data-lucide="sparkles" style="color: var(--gold-primary); width: 18px; height: 18px;"></i> ${msg}`;
  document.body.appendChild(toast);
  createIcons({ icons });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// Celebration Confetti
function triggerCelebration() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#d4af37', '#f7e089', '#fae8b4', '#14b8a6', '#0ea5e9']
  });
}

// Get Selected Photographer Helper
function getSelectedPhotographer() {
  return PHOTOGRAPHERS.find(p => p.id === state.selectedPhotographerId) || PHOTOGRAPHERS[0];
}

// Get Active Chat Helper
function getActiveChat() {
  let chat = state.chats.find(c => c.photographerId === state.activeChatId);
  if (!chat) {
    chat = {
      photographerId: state.activeChatId,
      unreadCount: 0,
      lastMessage: 'Started conversation',
      lastTime: 'Just now',
      messages: [
        {
          id: 'm-init',
          sender: 'photographer',
          text: `Hello! Thanks for reaching out directly on PhotoReeti. How can I help with your upcoming shoot?`,
          time: 'Just now'
        }
      ]
    };
    state.chats.unshift(chat);
  }
  return chat;
}

// App Root Render Function
function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="app-container">
      ${state.currentScreen !== 'splash' ? renderTopNavbar() : ''}
      <main id="main-content">
        ${renderCurrentScreen()}
      </main>
      ${state.currentScreen !== 'splash' ? renderBottomNav() : ''}
      ${renderBookingModal()}
      ${renderLocationModal()}
      ${renderLightboxModal()}
    </div>
  `;

  // Initialize Lucide Icons after DOM rendering
  createIcons({ icons });
  attachEventListeners();
}

// 1. TOP NAVBAR
function renderTopNavbar() {
  return `
    <header class="top-navbar">
      <div class="nav-brand-group" id="nav-brand-click">
        <img src="/assets/photoreeti-logo.jpg" alt="PhotoReeti Logo" class="nav-logo-thumb" />
        <span class="nav-brand-name gold-text">PhotoReeti</span>
      </div>

      <button class="location-picker-btn" id="open-location-modal-btn">
        <i data-lucide="map-pin" style="color: var(--gold-primary); width: 16px; height: 16px;"></i>
        <span>${state.selectedLocation}</span>
        <i data-lucide="chevron-down" style="width: 14px; height: 14px; opacity: 0.7;"></i>
      </button>

      <div class="nav-actions">
        <button class="role-pill-badge" id="toggle-role-btn" title="Click to switch between Client and Photographer mode">
          <i data-lucide="${state.userRole === 'client' ? 'user' : 'camera'}" style="width: 14px; height: 14px;"></i>
          <span>Mode: ${state.userRole === 'client' ? 'Client' : 'Photographer'}</span>
        </button>
      </div>
    </header>
  `;
}

// 2. SCREEN ROUTER
function renderCurrentScreen() {
  switch (state.currentScreen) {
    case 'splash':
      return renderSplashScreen();
    case 'explore':
      return renderExploreScreen();
    case 'profile':
      return renderProfileScreen();
    case 'chat':
      return renderChatScreen();
    case 'bookings':
      return renderBookingsScreen();
    default:
      return renderExploreScreen();
  }
}

// 3. SPLASH & ONBOARDING SCREEN
function renderSplashScreen() {
  return `
    <div class="splash-screen">
      <div class="splash-glow-ring"></div>
      
      <div class="splash-logo-container">
        <img src="/assets/photoreeti-logo.jpg" alt="PhotoReeti Logo" class="splash-logo" />
      </div>

      <h1 class="splash-title gold-text">PhotoReeti</h1>
      <p class="splash-subtitle">
        Direct Peer-to-Peer Photography Marketplace.<br />
        Connect directly with local master photographers. No intermediaries, true artistic freedom, zero agency markups.
      </p>

      <div class="splash-role-card">
        <div class="role-slider-label">Select Your Experience</div>
        
        <div class="role-switch-container">
          <button class="role-tab-btn ${state.userRole === 'client' ? 'active' : ''}" data-role="client">
            <i data-lucide="user" style="width: 18px; height: 18px;"></i>
            I'm a Client
          </button>
          <button class="role-tab-btn ${state.userRole === 'photographer' ? 'active' : ''}" data-role="photographer">
            <i data-lucide="camera" style="width: 18px; height: 18px;"></i>
            I'm a Photographer
          </button>
        </div>

        <div class="role-description-text">
          ${state.userRole === 'client' 
            ? 'Discover vetted local creators, inspect high-res raw portfolios, negotiate custom quotes directly, and book with secure escrow milestones.' 
            : 'Showcase your finest commercial & candid work, receive direct client inquiries, send milestone quotes, and keep 100% of your creative earnings.'
          }
        </div>

        <button class="btn-gold" id="enter-marketplace-btn" style="width: 100%; padding: 14px; font-size: 1.05rem;">
          <span>Enter Marketplace</span>
          <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
        </button>
      </div>

      <div class="splash-features-grid">
        <div class="splash-feature-item">
          <i data-lucide="shield-check" style="width: 22px; height: 22px;"></i>
          <span>Direct P2P Verified</span>
        </div>
        <div class="splash-feature-item">
          <i data-lucide="message-circle" style="width: 22px; height: 22px;"></i>
          <span>Real-time Chat & Quotes</span>
        </div>
        <div class="splash-feature-item">
          <i data-lucide="award" style="width: 22px; height: 22px;"></i>
          <span>Milestone Escrow</span>
        </div>
      </div>
    </div>
  `;
}

// 4. EXPLORE / HOME SCREEN
function renderExploreScreen() {
  // Filter photographers
  const filteredPhotographers = PHOTOGRAPHERS.filter(p => {
    const matchesCategory = state.selectedCategory === 'all' || p.category === state.selectedCategory;
    const matchesLocation = state.selectedLocation === 'All Locations' || p.location.includes(state.selectedLocation.split(' ')[0]);
    const matchesSearch = !state.searchQuery || 
      p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      p.handle.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      p.bio.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      p.gear.some(g => g.toLowerCase().includes(state.searchQuery.toLowerCase()));
    return matchesCategory && matchesLocation && matchesSearch;
  });

  // Trending photos for dynamic masonry grid
  const allTrendingPhotos = PHOTOGRAPHERS.flatMap(p => 
    p.portfolio.map(photo => ({ ...photo, photographer: p }))
  ).filter(item => {
    return state.selectedCategory === 'all' || item.category === state.selectedCategory;
  });

  return `
    <div class="explore-content">
      <!-- Hero Banner -->
      <section class="explore-hero-card">
        <div class="hero-backdrop-glow"></div>
        <div class="explore-hero-text">
          <span class="badge-verified" style="margin-bottom: 12px;">
            <i data-lucide="shield-check" style="width: 14px; height: 14px;"></i> 100% Peer-to-Peer Verified
          </span>
          <h1>Book Exceptional Local <br /><span class="gold-text">Photography Talent</span></h1>
          <p>
            Connect directly with verified local artists. Transparent rates, customized shoots, real-time messaging, and zero hidden platform commissions.
          </p>

          <div class="search-filter-bar">
            <div class="search-input-wrapper">
              <i data-lucide="search" style="width: 18px; height: 18px;"></i>
              <input 
                type="text" 
                id="search-input" 
                placeholder="Search by aesthetic, gear (e.g. Leica, Hasselblad), or photographer..." 
                value="${state.searchQuery}" 
              />
            </div>
            ${state.searchQuery ? `
              <button class="btn-secondary" id="clear-search-btn" style="padding: 10px 16px;">
                <i data-lucide="x" style="width: 16px; height: 16px;"></i> Clear
              </button>
            ` : ''}
          </div>
        </div>
      </section>

      <!-- Category Filter Pills -->
      <div class="categories-slider">
        ${CATEGORIES.map(cat => `
          <button class="category-chip ${state.selectedCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
            <i data-lucide="${cat.icon}" style="width: 16px; height: 16px;"></i>
            <span>${cat.label}</span>
          </button>
        `).join('')}
      </div>

      <!-- Section: Featured Verified Photographers -->
      <div class="section-header">
        <div>
          <h2 class="section-title">
            <i data-lucide="camera" style="color: var(--gold-primary); width: 22px; height: 22px;"></i>
            Featured Verified Artists
          </h2>
          <span class="section-subtitle">Showing ${filteredPhotographers.length} creators directly available in ${state.selectedLocation}</span>
        </div>
      </div>

      <div class="photographers-grid">
        ${filteredPhotographers.length === 0 ? `
          <div class="glass-panel" style="grid-column: 1 / -1; padding: 48px; text-align: center;">
            <i data-lucide="search" style="width: 48px; height: 48px; color: var(--gold-primary); margin-bottom: 12px;"></i>
            <h3 style="font-family: var(--font-display); font-size: 1.3rem; margin-bottom: 8px;">No Photographers Found</h3>
            <p style="color: var(--text-muted); margin-bottom: 20px;">Try adjusting your search query, location filter, or category pills.</p>
            <button class="btn-gold" id="reset-filters-btn">Reset All Filters</button>
          </div>
        ` : filteredPhotographers.map(p => `
          <article class="photographer-card">
            <div class="card-cover">
              <img src="${p.coverPhoto}" alt="${p.name} Cover" loading="lazy" />
              <div class="card-cover-overlay"></div>
              
              <div class="card-avatar-wrapper">
                <img src="${p.avatar}" alt="${p.name}" class="card-avatar" />
              </div>

              <div class="card-top-badges">
                ${p.superHost ? `
                  <span class="badge-verified" style="background: rgba(14, 165, 233, 0.2); border-color: #0ea5e9; color: #bae6fd;">
                    <i data-lucide="award" style="width: 12px; height: 12px;"></i> Top Pro
                  </span>
                ` : ''}
                <span class="badge-verified">
                  <i data-lucide="shield-check" style="width: 12px; height: 12px;"></i> Verified
                </span>
              </div>
            </div>

            <div class="card-body">
              <div class="card-title-row">
                <h3 class="card-name">${p.name}</h3>
                <div class="card-rating-badge">
                  <i data-lucide="star" style="width: 14px; height: 14px; fill: var(--gold-primary); color: var(--gold-primary);"></i>
                  <span>${p.rating}</span>
                  <span style="font-size: 0.72rem; opacity: 0.8;">(${p.reviewCount})</span>
                </div>
              </div>

              <div class="card-handle">${p.handle}</div>
              
              <div class="card-location">
                <i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--gold-primary);"></i>
                <span>${p.location}</span>
                <span>• ${p.experience}</span>
              </div>

              <p class="card-bio-snippet">${p.bio}</p>

              <!-- 3-Photo Mini Portfolio Strip -->
              <div class="card-portfolio-strip">
                ${p.portfolio.slice(0, 3).map(shot => `
                  <div class="card-strip-img" data-lightbox-url="${shot.url}" data-lightbox-title="${shot.title}" data-lightbox-exif="${shot.exif}" data-photographer-name="${p.name}">
                    <img src="${shot.url}" alt="${shot.title}" loading="lazy" />
                  </div>
                `).join('')}
              </div>

              <div class="card-footer">
                <div class="card-price-block">
                  <span class="card-price-label">Starting From</span>
                  <span class="card-price-val">${formatINR(p.startingPrice)} <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 500;">/ ${p.priceType}</span></span>
                </div>

                <div class="card-action-btns">
                  <button class="btn-icon open-chat-direct-btn" data-id="${p.id}" title="Direct Chat">
                    <i data-lucide="message-circle" style="width: 18px; height: 18px;"></i>
                  </button>
                  <button class="btn-gold view-profile-btn" data-id="${p.id}" style="padding: 10px 18px; font-size: 0.85rem;">
                    <span>View Profile</span>
                    <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
                  </button>
                </div>
              </div>
            </div>
          </article>
        `).join('')}
      </div>

      <!-- Section: Dynamic Masonry Photo Grid -->
      <div class="section-header" style="margin-top: 48px;">
        <div>
          <h2 class="section-title">
            <i data-lucide="sparkles" style="color: var(--gold-primary); width: 22px; height: 22px;"></i>
            Trending Portfolio Highlights
          </h2>
          <span class="section-subtitle">Click any image to inspect high-resolution details & EXIF camera metadata</span>
        </div>
      </div>

      <div class="masonry-grid">
        ${allTrendingPhotos.map(item => `
          <div class="masonry-item" data-lightbox-url="${item.url}" data-lightbox-title="${item.title}" data-lightbox-exif="${item.exif}" data-photographer-name="${item.photographer.name}">
            <img src="${item.url}" alt="${item.title}" loading="lazy" />
            <div class="masonry-overlay">
              <span class="masonry-meta-title">${item.title}</span>
              <div class="masonry-meta-photographer">
                <span>By ${item.photographer.name}</span>
                <span><i data-lucide="heart" style="width: 12px; height: 12px; display: inline;"></i> ${item.likes}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 5. PHOTOGRAPHER PROFILE & PORTFOLIO SCREEN
function renderProfileScreen() {
  const p = getSelectedPhotographer();

  return `
    <div class="profile-screen">
      <!-- Hero Banner -->
      <div class="profile-hero">
        <img src="${p.coverPhoto}" alt="${p.name} Cover" />
        <div class="profile-hero-gradient"></div>
        <button class="btn-icon profile-back-btn" id="profile-back-btn" title="Back to Explore">
          <i data-lucide="arrow-left" style="width: 20px; height: 20px;"></i>
        </button>
      </div>

      <!-- Creator Header Card -->
      <div class="profile-header-container">
        <div class="profile-header-card glass-panel">
          <img src="${p.avatar}" alt="${p.name}" class="profile-main-avatar" />

          <div class="profile-info">
            <div class="profile-name-row">
              <h1 class="profile-full-name">${p.name}</h1>
              <span class="badge-verified">
                <i data-lucide="shield-check" style="width: 14px; height: 14px;"></i> Verified Artist
              </span>
              <div class="card-rating-badge">
                <i data-lucide="star" style="width: 14px; height: 14px; fill: var(--gold-primary); color: var(--gold-primary);"></i>
                <span>${p.rating}</span>
                <span style="opacity: 0.8;">(${p.reviewCount} client reviews)</span>
              </div>
            </div>

            <div class="profile-handle">${p.handle}</div>

            <div class="profile-meta-tags">
              <span class="profile-meta-item">
                <i data-lucide="map-pin" style="color: var(--gold-primary); width: 15px; height: 15px;"></i>
                ${p.location}
              </span>
              <span class="profile-meta-item">
                <i data-lucide="briefcase" style="color: var(--gold-primary); width: 15px; height: 15px;"></i>
                ${p.experience}
              </span>
              <span class="profile-meta-item">
                <i data-lucide="clock" style="color: var(--gold-primary); width: 15px; height: 15px;"></i>
                Responds within 10 mins
              </span>
            </div>

            <p class="profile-bio">${p.bio}</p>

            <!-- Stats Bar -->
            <div class="profile-stats-strip">
              <div class="stat-box">
                <div class="stat-val">${p.stats.shootsCompleted}+</div>
                <div class="stat-lbl">Shoots Completed</div>
              </div>
              <div class="stat-box">
                <div class="stat-val">${p.stats.clientRetention}</div>
                <div class="stat-lbl">Direct Re-book Rate</div>
              </div>
              <div class="stat-box">
                <div class="stat-val">${p.stats.avgDeliveryDays}</div>
                <div class="stat-lbl">Average Turnaround</div>
              </div>
              <div class="stat-box">
                <div class="stat-val">0%</div>
                <div class="stat-lbl">Platform Middleman Fee</div>
              </div>
            </div>

            <!-- Gear Rig -->
            <div class="profile-gear-box">
              <span style="font-weight: 700; color: var(--gold-champagne); font-size: 0.85rem;">Hardware Kit:</span>
              ${p.gear.map(g => `<span class="gear-badge">${g}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Portfolio Tabs Navigation -->
        <nav class="portfolio-tabs-nav">
          <button class="portfolio-tab-btn ${state.profileTab === 'portfolio' ? 'active' : ''}" data-tab="portfolio">
            <i data-lucide="grid" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Portfolio Showcase (${p.portfolio.length})
          </button>
          <button class="portfolio-tab-btn ${state.profileTab === 'packages' ? 'active' : ''}" data-tab="packages">
            <i data-lucide="dollar-sign" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Pricing Packages (${p.packages.length})
          </button>
          <button class="portfolio-tab-btn ${state.profileTab === 'reviews' ? 'active' : ''}" data-tab="reviews">
            <i data-lucide="star" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> Verified Reviews (${p.reviews.length})
          </button>
        </nav>

        <!-- Tab 1: Portfolio Photos Grid -->
        ${state.profileTab === 'portfolio' ? `
          <div class="portfolio-photos-grid">
            ${p.portfolio.map(shot => `
              <div class="portfolio-shot-card" data-lightbox-url="${shot.url}" data-lightbox-title="${shot.title}" data-lightbox-exif="${shot.exif}" data-photographer-name="${p.name}">
                <img src="${shot.url}" alt="${shot.title}" loading="lazy" />
                <div class="shot-overlay-info">
                  <h4 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 700;">${shot.title}</h4>
                  <span class="shot-exif-pill">${shot.exif}</span>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Tab 2: Pricing Packages -->
        ${state.profileTab === 'packages' ? `
          <div class="packages-section" style="padding: 0;">
            <div class="packages-grid">
              ${p.packages.map(pkg => `
                <div class="glass-panel package-card ${pkg.popular ? 'popular' : ''}">
                  ${pkg.popular ? `<span class="popular-banner">Most Popular</span>` : ''}
                  <h3 class="pkg-title">${pkg.title}</h3>
                  <div class="pkg-duration"><i data-lucide="clock" style="width: 14px; height: 14px; display: inline; vertical-align: middle;"></i> ${pkg.duration} Coverage</div>

                  <div class="pkg-price-row">
                    <span class="pkg-price-val">${formatINR(pkg.price)}</span>
                    <span style="font-size: 0.85rem; color: var(--text-dim);">Net Direct Rate</span>
                  </div>

                  <ul class="pkg-deliverables">
                    ${pkg.deliverables.map(item => `
                      <li class="pkg-deliverable-item">
                        <i data-lucide="check-circle-2" style="width: 16px; height: 16px;"></i>
                        <span>${item}</span>
                      </li>
                    `).join('')}
                  </ul>

                  <button class="btn-gold book-package-btn" data-pkg-id="${pkg.id}" data-photographer-id="${p.id}" style="width: 100%;">
                    <span>Book Package</span>
                    <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Tab 3: Reviews -->
        ${state.profileTab === 'reviews' ? `
          <div class="reviews-section" style="padding: 0;">
            <div class="reviews-grid">
              ${p.reviews.map(r => `
                <div class="glass-panel review-card">
                  <div class="review-header">
                    <img src="${r.avatar}" alt="${r.author}" class="review-avatar" />
                    <div>
                      <div class="review-author">${r.author}</div>
                      <div class="review-date">${r.date}</div>
                    </div>
                    <div style="margin-left: auto; display: flex; color: var(--gold-primary);">
                      ${Array.from({ length: r.rating }).map(() => `<i data-lucide="star" style="width: 14px; height: 14px; fill: var(--gold-primary);"></i>`).join('')}
                    </div>
                  </div>
                  <p class="review-comment">"${r.comment}"</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Floating Bottom Action Bar on Profile -->
      <div class="floating-profile-cta">
        <div class="cta-price-preview">
          <span class="cta-price-lbl">Starting rate</span>
          <span class="cta-price-num">${formatINR(p.startingPrice)} <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 500;">/ ${p.priceType}</span></span>
        </div>

        <div style="display: flex; gap: 10px;">
          <button class="btn-secondary" id="cta-chat-creator-btn" data-id="${p.id}">
            <i data-lucide="message-circle" style="width: 16px; height: 16px;"></i>
            <span>Chat Directly</span>
          </button>
          <button class="btn-gold" id="cta-book-creator-btn" data-id="${p.id}">
            <span>Book Now</span>
            <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// 6. DIRECT CHAT SCREEN
function renderChatScreen() {
  const activeChat = getActiveChat();
  const photographer = PHOTOGRAPHERS.find(p => p.id === activeChat.photographerId) || PHOTOGRAPHERS[0];

  return `
    <div class="chat-screen-wrapper">
      <!-- Left: Conversations Sidebar -->
      <aside class="chat-conversations-list">
        <div class="chat-sidebar-header">
          <span class="chat-sidebar-title gold-text">Direct Messages</span>
          <span class="badge-tag">P2P Encrypted</span>
        </div>

        <div>
          ${PHOTOGRAPHERS.map(p => {
            const chatThread = state.chats.find(c => c.photographerId === p.id);
            const isSelected = p.id === activeChat.photographerId;
            const lastMsg = chatThread ? chatThread.lastMessage : 'Start negotiation or ask quote...';
            const lastTime = chatThread ? chatThread.lastTime : '';
            const unread = chatThread ? chatThread.unreadCount : 0;

            return `
              <div class="conversation-item ${isSelected ? 'active' : ''}" data-chat-photographer-id="${p.id}">
                <div class="conv-avatar-box">
                  <img src="${p.avatar}" alt="${p.name}" class="conv-avatar" />
                  <div class="conv-online-dot"></div>
                </div>

                <div class="conv-info">
                  <div class="conv-top-row">
                    <span class="conv-name">${p.name}</span>
                    <span class="conv-time">${lastTime}</span>
                  </div>
                  <div class="conv-snippet">${lastMsg}</div>
                </div>

                ${unread > 0 ? `<div class="conv-unread-badge">${unread}</div>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </aside>

      <!-- Right: Main Discussion & Negotiation Pane -->
      <section class="chat-main-pane">
        <!-- Chat Header -->
        <header class="chat-header">
          <div class="chat-header-photographer">
            <img src="${photographer.avatar}" alt="${photographer.name}" class="chat-header-avatar" />
            <div>
              <div style="font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 6px;">
                <span>${photographer.name}</span>
                <span class="badge-verified" style="font-size: 0.68rem; padding: 2px 6px;">Verified Pro</span>
              </div>
              <div style="font-size: 0.78rem; color: #10b981; display: flex; align-items: center; gap: 4px;">
                <span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981;"></span>
                Online & Ready to Collaborate
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn-secondary" id="chat-view-profile-btn" data-id="${photographer.id}" style="padding: 8px 14px; font-size: 0.82rem;">
              <i data-lucide="user" style="width: 14px; height: 14px;"></i> View Portfolio
            </button>
            <button class="btn-gold" id="chat-book-direct-btn" data-id="${photographer.id}" style="padding: 8px 14px; font-size: 0.82rem;">
              <i data-lucide="calendar" style="width: 14px; height: 14px;"></i> Book Shoot
            </button>
          </div>
        </header>

        <!-- Messages Flow -->
        <div class="chat-messages-container" id="chat-messages-container">
          ${activeChat.messages.map(m => {
            if (m.type === 'quote') {
              const q = m.quoteData;
              return `
                <div class="chat-bubble photographer">
                  <div class="bubble-content" style="padding: 0; background: transparent; border: none;">
                    <div class="chat-quote-card">
                      <div class="quote-card-header">
                        <span class="quote-title"><i data-lucide="file-text" style="width: 16px; height: 16px; display: inline;"></i> ${q.title}</span>
                        <span class="quote-badge">Direct P2P Proposal</span>
                      </div>
                      
                      <div class="quote-dates">
                        <i data-lucide="calendar" style="width: 14px; height: 14px; color: var(--gold-primary);"></i>
                        <span>Shoot Dates: <strong>${q.dates}</strong></span>
                      </div>

                      <ul class="quote-items-list">
                        ${q.deliverables.map(del => `
                          <li><i data-lucide="check" style="width: 14px; height: 14px; color: var(--gold-primary);"></i> ${del}</li>
                        `).join('')}
                      </ul>

                      <div class="quote-pricing-summary">
                        <div>
                          <div style="font-size: 0.72rem; color: var(--text-dim);">TOTAL QUOTE</div>
                          <div class="quote-total-val">${formatINR(q.total)}</div>
                        </div>
                        <div style="text-align: right;">
                          <div style="font-size: 0.72rem; color: var(--text-dim);">20% ESCROW DEPOSIT</div>
                          <div style="font-family: var(--font-display); font-weight: 700; color: var(--text-white); font-size: 1.05rem;">${formatINR(q.depositRequired)}</div>
                        </div>
                      </div>

                      <button class="btn-gold accept-quote-btn" data-photographer-id="${photographer.id}" data-total="${q.total}" data-deposit="${q.depositRequired}" data-title="${q.title}" data-dates="${q.dates}" style="width: 100%; padding: 12px;">
                        <i data-lucide="lock" style="width: 16px; height: 16px;"></i>
                        <span>Accept & Lock In Deposit (${formatINR(q.depositRequired)})</span>
                      </button>
                    </div>
                  </div>
                  <span class="bubble-time">${m.time}</span>
                </div>
              `;
            }

            return `
              <div class="chat-bubble ${m.sender}">
                <div class="bubble-content">
                  ${m.text}
                </div>
                <span class="bubble-time">${m.time}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Quick Negotiation Suggestions Bar -->
        <div class="chat-suggestions-bar">
          <button class="chat-suggest-chip" data-text="Hi! Are you free for an outdoor golden hour shoot next weekend?">
            Shoot availability?
          </button>
          <button class="chat-suggest-chip" data-text="Could you send over an itemized custom quote with RAW files included?">
            Request custom quote
          </button>
          <button class="chat-suggest-chip" data-text="What is your turnaround time for color-graded edited finals?">
            Turnaround time?
          </button>
          <button class="chat-suggest-chip" data-text="Do you travel for destination shoots outside the city?">
            Destination travel?
          </button>
        </div>

        <!-- Message Input Bar -->
        <form class="chat-input-bar" id="chat-send-form">
          <input 
            type="text" 
            class="chat-text-input" 
            id="chat-input-field" 
            placeholder="Type your message to ${photographer.name} directly..." 
            autocomplete="off" 
          />
          <button type="submit" class="btn-gold" style="padding: 12px 20px; border-radius: var(--radius-pill);">
            <span>Send</span>
            <i data-lucide="send" style="width: 16px; height: 16px;"></i>
          </button>
        </form>
      </section>
    </div>
  `;
}

// 7. BOOKINGS & MILESTONES SCREEN
function renderBookingsScreen() {
  const filteredBookings = state.bookings.filter(b => {
    if (state.bookingsFilter === 'active') return b.stage < 5;
    if (state.bookingsFilter === 'completed') return b.stage === 5;
    return true;
  });

  return `
    <div class="bookings-screen">
      <div style="margin-bottom: 24px;">
        <h1 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 6px;">
          My Shoots & <span class="gold-text">Milestones</span>
        </h1>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Track your peer-to-peer shoot schedule, milestone progress, and escrow release status.
        </p>
      </div>

      <div class="bookings-tabs">
        <button class="booking-filter-pill ${state.bookingsFilter === 'all' ? 'active' : ''}" data-filter="all">
          All Bookings (${state.bookings.length})
        </button>
        <button class="booking-filter-pill ${state.bookingsFilter === 'active' ? 'active' : ''}" data-filter="active">
          Active Shoots (${state.bookings.filter(b => b.stage < 5).length})
        </button>
        <button class="booking-filter-pill ${state.bookingsFilter === 'completed' ? 'active' : ''}" data-filter="completed">
          Delivered & Closed (${state.bookings.filter(b => b.stage === 5).length})
        </button>
      </div>

      <div class="bookings-list">
        ${filteredBookings.map(b => `
          <div class="glass-panel booking-card">
            <div class="booking-card-header">
              <div class="booking-photographer-info">
                <img src="${b.photographerAvatar}" alt="${b.photographerName}" class="booking-avatar" />
                <div>
                  <h3 style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 700;">${b.serviceTitle}</h3>
                  <div style="font-size: 0.85rem; color: var(--gold-light);">Artist: ${b.photographerName}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px; margin-top: 2px;">
                    <i data-lucide="map-pin" style="width: 12px; height: 12px; color: var(--gold-primary);"></i> ${b.location}
                    <span>•</span>
                    <i data-lucide="calendar" style="width: 12px; height: 12px; color: var(--gold-primary);"></i> ${b.eventDate}
                  </div>
                </div>
              </div>

              <div style="text-align: right;">
                <span class="badge-verified" style="font-size: 0.8rem; margin-bottom: 4px;">
                  <i data-lucide="check-circle-2" style="width: 13px; height: 13px;"></i> ${b.status}
                </span>
                <div style="font-size: 0.78rem; color: var(--text-dim);">Booking Ref: #${b.id}</div>
              </div>
            </div>

            <!-- Milestone Progress Tracker -->
            <div class="milestone-timeline">
              ${b.stages.map((stg, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum <= b.stage;
                const isCurrent = stepNum === b.stage;
                return `
                  <div class="milestone-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                    <div class="step-circle">
                      ${isCompleted ? `<i data-lucide="check" style="width: 16px; height: 16px;"></i>` : stepNum}
                    </div>
                    <span class="step-label">${stg}</span>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Footer Details & Actions -->
            <div class="booking-card-footer">
              <div style="display: flex; gap: 24px;">
                <div>
                  <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Total Deal</span>
                  <div style="font-family: var(--font-display); font-weight: 700; color: var(--gold-light); font-size: 1.1rem;">${formatINR(b.totalAmount)}</div>
                </div>
                <div>
                  <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Escrow Secured</span>
                  <div style="font-family: var(--font-display); font-weight: 700; color: var(--text-white); font-size: 1.1rem;">${formatINR(b.depositPaid)}</div>
                </div>
                <div>
                  <span style="font-size: 0.72rem; color: var(--text-dim); text-transform: uppercase;">Remaining at Delivery</span>
                  <div style="font-family: var(--font-display); font-weight: 700; color: var(--text-muted); font-size: 1.1rem;">${formatINR(b.balanceDue)}</div>
                </div>
              </div>

              <div style="display: flex; gap: 10px;">
                <button class="btn-secondary open-chat-direct-btn" data-id="${b.photographerId}" style="padding: 10px 18px;">
                  <i data-lucide="message-circle" style="width: 16px; height: 16px;"></i>
                  <span>Message Artist</span>
                </button>
                ${b.stage === 5 ? `
                  <button class="btn-gold" onclick="alert('Downloading your Master 4K Color Graded Retouched Gallery archive (2.8 GB)...');" style="padding: 10px 18px;">
                    <i data-lucide="download" style="width: 16px; height: 16px;"></i>
                    <span>Download Gallery</span>
                  </button>
                ` : `
                  <button class="btn-gold" onclick="alert('Milestone Escrow Security: Your deposit is held safely. Remaining 80% is only released when you approve final edits.');" style="padding: 10px 18px;">
                    <i data-lucide="shield" style="width: 16px; height: 16px;"></i>
                    <span>Milestone Details</span>
                  </button>
                `}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 8. SLEEK FLOATING BOTTOM NAVIGATION BAR
function renderBottomNav() {
  const activeBookingsCount = state.bookings.filter(b => b.stage < 5).length;
  const unreadMessagesCount = state.chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return `
    <nav class="floating-bottom-nav">
      <button class="nav-tab-item ${state.currentScreen === 'explore' ? 'active' : ''}" data-screen="explore">
        <i data-lucide="compass"></i>
        <span class="nav-tab-label">Explore</span>
      </button>

      <button class="nav-tab-item ${state.currentScreen === 'bookings' ? 'active' : ''}" data-screen="bookings">
        <i data-lucide="calendar"></i>
        <span class="nav-tab-label">Bookings</span>
        ${activeBookingsCount > 0 ? `<span class="nav-badge-pill">${activeBookingsCount}</span>` : ''}
      </button>

      <button class="nav-tab-item ${state.currentScreen === 'chat' ? 'active' : ''}" data-screen="chat">
        <i data-lucide="message-circle"></i>
        <span class="nav-tab-label">Chat</span>
        ${unreadMessagesCount > 0 ? `<span class="nav-badge-pill">${unreadMessagesCount}</span>` : ''}
      </button>

      <button class="nav-tab-item ${state.currentScreen === 'profile' ? 'active' : ''}" data-screen="profile">
        <i data-lucide="camera"></i>
        <span class="nav-tab-label">Creator</span>
      </button>
    </nav>
  `;
}

// 9. MODALS: BOOKING, LOCATION, LIGHTBOX
function renderBookingModal() {
  if (!state.bookingModal.isOpen) return '';
  const p = PHOTOGRAPHERS.find(x => x.id === state.bookingModal.photographerId) || PHOTOGRAPHERS[0];
  const selectedPkg = p.packages.find(pkg => pkg.id === state.bookingModal.packageId) || p.packages[0];
  const deposit = Math.round(selectedPkg.price * 0.2);

  return `
    <div class="modal-overlay open" id="booking-modal-overlay">
      <div class="modal-dialog">
        <button class="btn-icon modal-close-btn" id="close-booking-modal-btn">
          <i data-lucide="x" style="width: 18px; height: 18px;"></i>
        </button>

        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
          <img src="${p.avatar}" alt="${p.name}" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--gold-primary);" />
          <div>
            <h2 style="font-family: var(--font-display); font-size: 1.4rem;">Direct Shoot Reservation</h2>
            <div style="font-size: 0.85rem; color: var(--gold-light);">Artist: ${p.name} • 0% Platform Fee</div>
          </div>
        </div>

        <form id="booking-checkout-form">
          <div class="form-group">
            <label class="form-label">Select Package</label>
            <select class="form-control" id="booking-package-select">
              ${p.packages.map(pkg => `
                <option value="${pkg.id}" ${pkg.id === selectedPkg.id ? 'selected' : ''}>
                  ${pkg.title} - ${formatINR(pkg.price)} (${pkg.duration})
                </option>
              `).join('')}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Shoot Date</label>
              <input type="date" class="form-control" id="booking-date" value="2026-11-24" required />
            </div>
            <div class="form-group">
              <label class="form-label">Preferred Time</label>
              <select class="form-control" id="booking-time">
                <option>Golden Hour (04:30 PM - 07:00 PM)</option>
                <option>Morning Sunrise (06:00 AM - 09:30 AM)</option>
                <option>Full Day Session (10:00 AM - 08:00 PM)</option>
                <option>Night / Studio Session</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Shoot Location / Venue</label>
            <input type="text" class="form-control" id="booking-location" placeholder="e.g. Taj Lake Palace, Udaipur or Bandra Studio" value="${p.location.split('(')[0].trim()}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Creative Brief & Special Requests</label>
            <textarea class="form-control" id="booking-notes" rows="2" placeholder="Tell the artist about your desired mood, wardrobe, or specific shots...">We want a natural, candid documentary feel without stiff posing.</textarea>
          </div>

          <!-- Price & Escrow Summary -->
          <div class="booking-summary-box">
            <div class="summary-line">
              <span>Package Total</span>
              <span id="summary-pkg-total">${formatINR(selectedPkg.price)}</span>
            </div>
            <div class="summary-line">
              <span>Peer-to-Peer Intermediary Fee</span>
              <span style="color: #10b981; font-weight: 700;">₹0 (Free / Direct P2P)</span>
            </div>
            <div class="summary-line">
              <span>Required Escrow Deposit (20%)</span>
              <span id="summary-deposit-amt" style="color: var(--gold-light); font-weight: 700;">${formatINR(deposit)}</span>
            </div>
            <div class="summary-line total">
              <span>Pay Now to Lock Date</span>
              <span id="summary-pay-now">${formatINR(deposit)}</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 6px;">
              * Remaining 80% (${formatINR(selectedPkg.price - deposit)}) is held safely in milestone escrow and only transferred upon approval of final edits.
            </div>
          </div>

          <button type="submit" class="btn-gold" style="width: 100%; padding: 14px; font-size: 1.05rem;">
            <i data-lucide="shield-check" style="width: 18px; height: 18px;"></i>
            <span>Confirm & Lock Shoot Date</span>
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderLocationModal() {
  if (!state.locationModalOpen) return '';

  return `
    <div class="modal-overlay open" id="location-modal-overlay">
      <div class="modal-dialog" style="max-width: 440px;">
        <button class="btn-icon modal-close-btn" id="close-location-modal-btn">
          <i data-lucide="x" style="width: 18px; height: 18px;"></i>
        </button>

        <h2 style="font-family: var(--font-display); font-size: 1.3rem; margin-bottom: 6px;">
          Choose Your Location
        </h2>
        <p style="color: var(--text-muted); font-size: 0.85rem;">
          Discover top-tier photographers operating directly in your local area.
        </p>

        <div class="location-options-list">
          ${LOCATIONS.map(loc => `
            <button class="location-item-btn ${state.selectedLocation === loc ? 'selected' : ''}" data-location="${loc}">
              <div style="display: flex; align-items: center; gap: 10px;">
                <i data-lucide="map-pin" style="width: 16px; height: 16px; color: var(--gold-primary);"></i>
                <span style="font-weight: 600; font-size: 0.9rem;">${loc}</span>
              </div>
              ${state.selectedLocation === loc ? `<i data-lucide="check" style="width: 16px; height: 16px; color: var(--gold-light);"></i>` : ''}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderLightboxModal() {
  if (!state.lightboxPhoto) return '';
  const photo = state.lightboxPhoto;

  return `
    <div class="modal-overlay open" id="lightbox-modal-overlay">
      <div class="modal-dialog lightbox-dialog">
        <button class="btn-icon" id="close-lightbox-btn" style="align-self: flex-end; margin-bottom: 12px; background: rgba(0,0,0,0.8);">
          <i data-lucide="x" style="width: 20px; height: 20px;"></i>
        </button>

        <div class="lightbox-img-wrapper">
          <img src="${photo.url}" alt="${photo.title}" />
        </div>

        <div class="lightbox-footer-info">
          <h3 style="font-family: var(--font-display); font-size: 1.2rem; color: var(--text-white);">${photo.title}</h3>
          <div style="font-size: 0.85rem; color: var(--gold-champagne); margin-top: 4px;">
            By <strong>${photo.photographerName}</strong> • ${photo.exif || 'Master RAW Resolution'}
          </div>
        </div>
      </div>
    </div>
  `;
}

// 10. EVENT LISTENERS
function attachEventListeners() {
  // Brand Click -> Return to Explore
  const navBrand = document.getElementById('nav-brand-click');
  if (navBrand) {
    navBrand.addEventListener('click', () => {
      state.currentScreen = 'explore';
      renderApp();
    });
  }

  // Role Slider in Splash Screen
  document.querySelectorAll('.role-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetRole = e.currentTarget.dataset.role;
      state.userRole = targetRole;
      renderApp();
    });
  });

  // Enter Marketplace Button from Splash
  const enterBtn = document.getElementById('enter-marketplace-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      state.currentScreen = 'explore';
      renderApp();
      showToast(`Welcome to PhotoReeti! Viewing as ${state.userRole === 'client' ? 'Client' : 'Photographer'}`);
    });
  }

  // Toggle Role Button in Navbar
  const toggleRoleBtn = document.getElementById('toggle-role-btn');
  if (toggleRoleBtn) {
    toggleRoleBtn.addEventListener('click', () => {
      state.userRole = state.userRole === 'client' ? 'photographer' : 'client';
      renderApp();
      showToast(`Switched view to ${state.userRole === 'client' ? 'Client' : 'Photographer'} mode`);
    });
  }

  // Location Picker Open
  const openLocBtn = document.getElementById('open-location-modal-btn');
  if (openLocBtn) {
    openLocBtn.addEventListener('click', () => {
      state.locationModalOpen = true;
      renderApp();
    });
  }
  const closeLocBtn = document.getElementById('close-location-modal-btn');
  if (closeLocBtn) {
    closeLocBtn.addEventListener('click', () => {
      state.locationModalOpen = false;
      renderApp();
    });
  }
  document.querySelectorAll('.location-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.selectedLocation = e.currentTarget.dataset.location;
      state.locationModalOpen = false;
      renderApp();
      showToast(`Location set to ${state.selectedLocation}`);
    });
  });

  // Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      // Re-render only when needed or on Enter, but quick render gives instant feedback
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        state.searchQuery = e.target.value;
        renderApp();
      }
    });
  }
  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      state.searchQuery = '';
      renderApp();
    });
  }

  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      state.searchQuery = '';
      state.selectedCategory = 'all';
      state.selectedLocation = 'All Locations';
      renderApp();
    });
  }

  // Category Filter Pills
  document.querySelectorAll('.category-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      state.selectedCategory = e.currentTarget.dataset.category;
      renderApp();
    });
  });

  // View Profile Buttons
  document.querySelectorAll('.view-profile-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.selectedPhotographerId = e.currentTarget.dataset.id;
      state.currentScreen = 'profile';
      state.profileTab = 'portfolio';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderApp();
    });
  });

  // Profile Back Button
  const profileBackBtn = document.getElementById('profile-back-btn');
  if (profileBackBtn) {
    profileBackBtn.addEventListener('click', () => {
      state.currentScreen = 'explore';
      renderApp();
    });
  }

  // Profile Tabs
  document.querySelectorAll('.portfolio-tab-btn').forEach(tab => {
    tab.addEventListener('click', (e) => {
      state.profileTab = e.currentTarget.dataset.tab;
      renderApp();
    });
  });

  // Open Chat Direct Buttons
  document.querySelectorAll('.open-chat-direct-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const photographerId = e.currentTarget.dataset.id;
      state.activeChatId = photographerId;
      state.currentScreen = 'chat';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderApp();
    });
  });

  // Bottom Navigation Tabs
  document.querySelectorAll('.nav-tab-item').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetScreen = e.currentTarget.dataset.screen;
      state.currentScreen = targetScreen;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderApp();
    });
  });

  // Lightbox Triggers
  document.querySelectorAll('[data-lightbox-url]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      state.lightboxPhoto = {
        url: el.dataset.lightboxUrl,
        title: el.dataset.lightboxTitle || 'Master Shot',
        exif: el.dataset.lightboxExif || '',
        photographerName: el.dataset.photographerName || 'Featured Artist'
      };
      renderApp();
    });
  });

  // Close Lightbox
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', () => {
      state.lightboxPhoto = null;
      renderApp();
    });
  }
  const lightboxOverlay = document.getElementById('lightbox-modal-overlay');
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
        state.lightboxPhoto = null;
        renderApp();
      }
    });
  }

  // CTA Chat / Book on Profile
  const ctaChatBtn = document.getElementById('cta-chat-creator-btn');
  if (ctaChatBtn) {
    ctaChatBtn.addEventListener('click', (e) => {
      state.activeChatId = e.currentTarget.dataset.id;
      state.currentScreen = 'chat';
      renderApp();
    });
  }
  const ctaBookBtn = document.getElementById('cta-book-creator-btn');
  if (ctaBookBtn) {
    ctaBookBtn.addEventListener('click', (e) => {
      const photographerId = e.currentTarget.dataset.id;
      state.bookingModal = {
        isOpen: true,
        photographerId: photographerId,
        packageId: 'pkg-2'
      };
      renderApp();
    });
  }

  // Book Package Buttons
  document.querySelectorAll('.book-package-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkgId = e.currentTarget.dataset.pkgId;
      const photogId = e.currentTarget.dataset.photographerId;
      state.bookingModal = {
        isOpen: true,
        photographerId: photogId,
        packageId: pkgId
      };
      renderApp();
    });
  });

  // Booking Modal Package Select Change
  const pkgSelect = document.getElementById('booking-package-select');
  if (pkgSelect) {
    pkgSelect.addEventListener('change', (e) => {
      state.bookingModal.packageId = e.target.value;
      const p = PHOTOGRAPHERS.find(x => x.id === state.bookingModal.photographerId) || PHOTOGRAPHERS[0];
      const selectedPkg = p.packages.find(pkg => pkg.id === state.bookingModal.packageId) || p.packages[0];
      const deposit = Math.round(selectedPkg.price * 0.2);
      
      const pkgTotalEl = document.getElementById('summary-pkg-total');
      const depositEl = document.getElementById('summary-deposit-amt');
      const payNowEl = document.getElementById('summary-pay-now');
      if (pkgTotalEl) pkgTotalEl.textContent = formatINR(selectedPkg.price);
      if (depositEl) depositEl.textContent = formatINR(deposit);
      if (payNowEl) payNowEl.textContent = formatINR(deposit);
    });
  }

  // Close Booking Modal
  const closeBookingModalBtn = document.getElementById('close-booking-modal-btn');
  if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener('click', () => {
      state.bookingModal.isOpen = false;
      renderApp();
    });
  }

  // Booking Form Submission
  const bookingForm = document.getElementById('booking-checkout-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const p = PHOTOGRAPHERS.find(x => x.id === state.bookingModal.photographerId) || PHOTOGRAPHERS[0];
      const pkg = p.packages.find(x => x.id === state.bookingModal.packageId) || p.packages[0];
      const dateVal = document.getElementById('booking-date').value;
      const locVal = document.getElementById('booking-location').value;
      const deposit = Math.round(pkg.price * 0.2);

      // Create new booking record
      const newBooking = {
        id: 'bk-' + Math.floor(1000 + Math.random() * 9000),
        photographerId: p.id,
        photographerName: p.name,
        photographerAvatar: p.avatar,
        serviceTitle: pkg.title,
        eventDate: dateVal,
        location: locVal,
        status: 'Deposit Secured & Date Locked',
        stage: 2,
        stages: ['Quote Accepted', 'Deposit Secured (20%)', 'Pre-Shoot Moodboard', 'Shoot Day', 'Final Gallery'],
        totalAmount: pkg.price,
        depositPaid: deposit,
        balanceDue: pkg.price - deposit,
        canChat: true
      };

      state.bookings.unshift(newBooking);
      state.bookingModal.isOpen = false;
      state.currentScreen = 'bookings';
      
      renderApp();
      triggerCelebration();
      showToast(`Success! Shoot locked with ${p.name}. Deposit placed safely in escrow.`);
    });
  }

  // Chat Conversation Select
  document.querySelectorAll('[data-chat-photographer-id]').forEach(item => {
    item.addEventListener('click', (e) => {
      const photogId = e.currentTarget.dataset.chatPhotographerId;
      state.activeChatId = photogId;
      const targetChat = state.chats.find(c => c.photographerId === photogId);
      if (targetChat) targetChat.unreadCount = 0;
      renderApp();
    });
  });

  // Chat View Profile & Book Buttons from Header
  const chatProfileBtn = document.getElementById('chat-view-profile-btn');
  if (chatProfileBtn) {
    chatProfileBtn.addEventListener('click', (e) => {
      state.selectedPhotographerId = e.currentTarget.dataset.id;
      state.currentScreen = 'profile';
      renderApp();
    });
  }
  const chatBookBtn = document.getElementById('chat-book-direct-btn');
  if (chatBookBtn) {
    chatBookBtn.addEventListener('click', (e) => {
      state.bookingModal = {
        isOpen: true,
        photographerId: e.currentTarget.dataset.id,
        packageId: 'pkg-2'
      };
      renderApp();
    });
  }

  // Accept Quote Button inside Chat
  document.querySelectorAll('.accept-quote-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const photogId = e.currentTarget.dataset.photographerId;
      const total = Number(e.currentTarget.dataset.total);
      const deposit = Number(e.currentTarget.dataset.deposit);
      const title = e.currentTarget.dataset.title;
      const dates = e.currentTarget.dataset.dates;
      const p = PHOTOGRAPHERS.find(x => x.id === photogId) || PHOTOGRAPHERS[0];

      // Add to bookings
      const quoteBooking = {
        id: 'bk-' + Math.floor(1000 + Math.random() * 9000),
        photographerId: p.id,
        photographerName: p.name,
        photographerAvatar: p.avatar,
        serviceTitle: title,
        eventDate: dates,
        location: 'Udaipur Venue (Agreed in Chat)',
        status: 'Quote Accepted & 20% Deposit Secured',
        stage: 2,
        stages: ['Quote Accepted', 'Deposit Secured (20%)', 'Pre-Shoot Moodboard', 'Shoot Day', 'Final Gallery'],
        totalAmount: total,
        depositPaid: deposit,
        balanceDue: total - deposit,
        canChat: true
      };

      state.bookings.unshift(quoteBooking);

      // Add confirmation message to chat
      const chat = getActiveChat();
      chat.messages.push({
        id: 'm-confirm-' + Date.now(),
        sender: 'user',
        text: `I've accepted the quote and secured the ${formatINR(deposit)} deposit! Looking forward to collaborating on our wedding days in Udaipur.`,
        time: 'Just now'
      });

      triggerCelebration();
      showToast(`Custom quote accepted! Deposit locked in escrow.`);

      // Simulate Photographer auto-reply in 1.2s
      setTimeout(() => {
        chat.messages.push({
          id: 'm-reply-' + Date.now(),
          sender: 'photographer',
          text: `Fantastic news! The dates are officially locked in our studio master calendar. I will set up our shared Pinterest moodboard and pre-shoot checklist today. Let's make pure magic! ✨`,
          time: 'Just now'
        });
        chat.lastMessage = `Fantastic news! The dates are officially locked...`;
        chat.lastTime = 'Just now';
        renderApp();
      }, 1200);

      renderApp();
    });
  });

  // Chat Suggestion Chips
  document.querySelectorAll('.chat-suggest-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const text = e.currentTarget.dataset.text;
      const input = document.getElementById('chat-input-field');
      if (input) {
        input.value = text;
        input.focus();
      }
    });
  });

  // Chat Send Form
  const chatForm = document.getElementById('chat-send-form');
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chat-input-field');
      if (!input || !input.value.trim()) return;

      const userText = input.value.trim();
      const chat = getActiveChat();
      const photog = PHOTOGRAPHERS.find(p => p.id === chat.photographerId) || PHOTOGRAPHERS[0];

      // Append user message
      chat.messages.push({
        id: 'm-' + Date.now(),
        sender: 'user',
        text: userText,
        time: 'Just now'
      });
      chat.lastMessage = userText;
      chat.lastTime = 'Just now';
      input.value = '';

      renderApp();

      // Scroll to bottom of chat
      const container = document.getElementById('chat-messages-container');
      if (container) container.scrollTop = container.scrollHeight;

      // Realistic automated smart reply from creator
      setTimeout(() => {
        let reply = `Thank you for the message! I'm completely free and eager to bring your visual ideas to reality. Would you like me to tailor a custom package or schedule a brief virtual meeting?`;
        if (userText.toLowerCase().includes('raw')) {
          reply = `Yes, absolutely! As a direct P2P partner on PhotoReeti, I provide all full uncompressed RAW files via private cloud drive with zero markup.`;
        } else if (userText.toLowerCase().includes('quote')) {
          reply = `I will assemble an itemized custom proposal card right here in our chat with your exact deliverables and dates!`;
        } else if (userText.toLowerCase().includes('november') || userText.toLowerCase().includes('weekend')) {
          reply = `Yes! I currently have that weekend reserved for private bookings. Let's lock it in before our wedding calendar fills up!`;
        }

        chat.messages.push({
          id: 'm-reply-' + Date.now(),
          sender: 'photographer',
          text: reply,
          time: 'Just now'
        });
        chat.lastMessage = reply;
        chat.lastTime = 'Just now';
        
        renderApp();
        const updatedContainer = document.getElementById('chat-messages-container');
        if (updatedContainer) updatedContainer.scrollTop = updatedContainer.scrollHeight;
      }, 1100);
    });
  }

  // Bookings Filter Tabs
  document.querySelectorAll('.booking-filter-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      state.bookingsFilter = e.currentTarget.dataset.filter;
      renderApp();
    });
  });
}

// Initial Boot
renderApp();
