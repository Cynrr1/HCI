// Load user data on page load
window.addEventListener('load', function() {
  loadUserData();
    setupEventListeners();
      
        // Check if user is authenticated
          const currentUser = localStorage.getItem('currentUser');
            if (!currentUser) {
                // Redirect to login if not authenticated
                    window.location.href = 'tester.html';
                      }
                      });

                      // Load and display user data
                      function loadUserData() {
                        const currentUser = localStorage.getItem('currentUser');
                          if (!currentUser) return;
                            
                              try {
                                  const user = JSON.parse(currentUser);
                                      
                                          // Get user's initials
                                              const firstName = user.firstName || 'D';
                                                  const lastName = user.lastName || 'U';
                                                      const initials = (firstName[0] + lastName[0]).toUpperCase();
                                                          
                                                              // Update page with user data
                                                                  document.getElementById('userName').textContent = firstName;
                                                                      document.getElementById('userInitial').textContent = initials;
                                                                          document.getElementById('avatarInitial').textContent = initials;
                                                                              document.getElementById('profileName').textContent = firstName + ' ' + lastName;
                                                                                  document.getElementById('profileEmail').textContent = user.email;
                                                                                      
                                                                                          // Set member since date
                                                                                              const today = new Date();
                                                                                                  const dateString = today.toLocaleDateString('en-US', { 
                                                                                                        year: 'numeric', 
                                                                                                              month: 'long', 
                                                                                                                    day: 'numeric' 
                                                                                                                        });
                                                                                                                            document.getElementById('memberSince').textContent = dateString;
                                                                                                                                
                                                                                                                                    // Set last login
                                                                                                                                        document.getElementById('lastLogin').textContent = 'Just now';
                                                                                                                                          } catch (err) {
                                                                                                                                              console.error('Error loading user data:', err);
                                                                                                                                                }
                                                                                                                                                }

                                                                                                                                                // Setup event listeners
                                                                                                                                                function setupEventListeners() {
                                                                                                                                                  const profileBtn = document.getElementById('profileBtn');
                                                                                                                                                    const profileMenu = document.getElementById('profileMenu');
                                                                                                                                                      
                                                                                                                                                        // Toggle profile menu
                                                                                                                                                          profileBtn.addEventListener('click', function(e) {
                                                                                                                                                              e.stopPropagation();
                                                                                                                                                                  profileMenu.classList.toggle('active');
                                                                                                                                                                    });
                                                                                                                                                                      
                                                                                                                                                                        // Close menu when clicking outside
                                                                                                                                                                          document.addEventListener('click', function(e) {
                                                                                                                                                                              if (!e.target.closest('.navbar-actions') && !e.target.closest('.profile-menu')) {
                                                                                                                                                                                    profileMenu.classList.remove('active');
                                                                                                                                                                                        }
                                                                                                                                                                                          });
                                                                                                                                                                                            
                                                                                                                                                                                              // Update active nav link on scroll
                                                                                                                                                                                                window.addEventListener('scroll', updateActiveNavLink);
                                                                                                                                                                                                }

// Flag to indicate a programmatic scroll is in progress so observers/scroll handlers don't override
let isAutoScrolling = false;
// The target id we're scrolling to programmatically (if any)
let pendingAutoScrollTarget = null;

                                                                                                                                                                                                // Update active navigation link based on scroll position
                                                                                                                                                                                                function updateActiveNavLink() {
    if (isAutoScrolling && pendingAutoScrollTarget) return; // avoid clobbering active state during programmatic scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  // Choose the section with the largest visible height in the viewport
  let maxVisible = 0;
  let current = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    // compute visible height within viewport
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    if (visibleHeight > maxVisible) {
      maxVisible = visibleHeight;
      current = section.getAttribute('id');
    }
  });

  // Update nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Set active/inactive classes for sections to enable transitions
  sections.forEach(section => {
    section.classList.remove('active-section', 'inactive-section');
    if (section.getAttribute('id') === current) {
      section.classList.add('active-section');
    } else {
      section.classList.add('inactive-section');
    }
  });
                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                // IntersectionObserver for sections to reliably set active classes when in view
                                                                                                                                                                                                                                function setupSectionObserver() {
                                                                                                                                                                                                                                  const options = {
                                                                                                                                                                                                                                                                    root: null,
                                                                                                                                                                                                                                                                    // Require more of a section to be visible before it's treated as "active".
                                                                                                                                                                                                                                                                    // Increasing the negative bottom rootMargin makes the observer wait
                                                                                                                                                                                                                                                                    // until the section has scrolled further into view.
                                                                                                                                                                                                                                                                    rootMargin: '0px 0px -60% 0px',
                                                                                                                                                                                                                                                                    // Use higher thresholds so the observer prefers sections that
                                                                                                                                                                                                                                                                    // are at least half-visible or more.
                                                                                                                                                                                                                                                                    threshold: [0.5, 0.75, 0.9]
                                                                                                                                                                                                                                                                  };

                                                                                                                                                                                                                                  const observer = new IntersectionObserver(entries => {
                                                                                                                                                                                                                                    // Determine the section with the highest intersectionRatio (most visible)
                                                                                                                                                                                                                                    let maxEntry = null;
                                                                                                                                                                                                                                    entries.forEach(entry => {
                                                                                                                                                                                                                                      if (!maxEntry || entry.intersectionRatio > maxEntry.intersectionRatio) {
                                                                                                                                                                                                                                        maxEntry = entry;
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                    if (maxEntry) {
                                                                                                                                                                                                                                      // If we're auto-scrolling to a target, ignore observer updates until done
                                                                                                                                                                                                                                      if (isAutoScrolling || pendingAutoScrollTarget) return;
                                                                                                                                                                                                                                      // mark the most visible section active
                                                                                                                                                                                                                                      document.querySelectorAll('section').forEach(sec => {
                                                                                                                                                                                                                                        if (sec === maxEntry.target) {
                                                                                                                                                                                                                                          sec.classList.add('active-section');
                                                                                                                                                                                                                                          sec.classList.remove('inactive-section');
                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                          sec.classList.remove('active-section');
                                                                                                                                                                                                                                          sec.classList.add('inactive-section');
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                      const id = maxEntry.target.getAttribute('id');
                                                                                                                                                                                                                                      const navLink = document.querySelector(`.nav-link[href='#${id}']`);
                                                                                                                                                                                                                                      if (navLink) {
                                                                                                                                                                                                                                        document.querySelectorAll('.nav-link').forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
                                                                                                                                                                                                                                        navLink.classList.add('active');
                                                                                                                                                                                                                                        navLink.setAttribute('aria-current', 'page');
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  }, options);

                                                                                                                                                                                                                                  document.querySelectorAll('section').forEach(section => {
                                                                                                                                                                                                                                    observer.observe(section);
                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                // IntersectionObserver for category and dropoff cards to add visible-card class when scrolling into view
                                                                                                                                                                                                                                function setupCardObservers() {
                                                                                                                                                                                                                                  const opts = {
                                                                                                                                                                                                                                    root: null,
                                                                                                                                                                                                                                    rootMargin: '0px 0px -10% 0px',
                                                                                                                                                                                                                                    threshold: [0.2, 0.4, 0.6]
                                                                                                                                                                                                                                  };

                                                                                                                                                                                                                                  const cardObserver = new IntersectionObserver(entries => {
                                                                                                                                                                                                                                    entries.forEach(entry => {
                                                                                                                                                                                                                                      if (entry.isIntersecting) {
                                                                                                                                                                                                                                        entry.target.classList.add('visible-card');
                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                        entry.target.classList.remove('visible-card');
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                  }, opts);

                                                                                                                                                                                                                                  const categoryCards = document.querySelectorAll('.category-card');
                                                                                                                                                                                                                                  categoryCards.forEach(card => cardObserver.observe(card));

                                                                                                                                                                                                                                  const dropoffCards = document.querySelectorAll('.dropoff-card');
                                                                                                                                                                                                                                  dropoffCards.forEach(card => cardObserver.observe(card));

                                                                                                                                                                                                                                  // Add click and keyboard handlers to show an 'active' enlarge effect when a card is clicked/pressed
                                                                                                                                                                                                                                  const allCards = [...categoryCards, ...dropoffCards];
                                                                                                                                                                                                                                  allCards.forEach(card => {
                                                                                                                                                                                                                                    // make cards focusable and role='button' already set in HTML later
                                                                                                                                                                                                                                    card.addEventListener('click', () => {
                                                                                                                                                                                                                                      card.classList.add('active-card');
                                                                                                                                                                                                                                      setTimeout(() => card.classList.remove('active-card'), 700);
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                    card.addEventListener('keydown', (e) => {
                                                                                                                                                                                                                                      if (e.key === 'Enter' || e.key === ' ') {
                                                                                                                                                                                                                                        e.preventDefault();
                                                                                                                                                                                                                                        card.classList.add('active-card');
                                                                                                                                                                                                                                        setTimeout(() => card.classList.remove('active-card'), 700);
                                                                                                                                                                                                                                        // Trigger click behaviour if present
                                                                                                                                                                                                                                        card.click();
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                // Setup observers on load
                                                                                                                                                                                                                                window.addEventListener('load', function() {
                                                                                                                                                                                                                                  setupSectionObserver();
                                                                                                                                                                                                                                  setupCardObservers();
                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                      // Logout function
                                                                                                                                                                                                                                                      function logout() {
                                                                                                                                                                                                                                                        // Clear user session
                                                                                                                                                                                                                                                          localStorage.removeItem('currentUser');
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                              // Show toast notification
                                                                                                                                                                                                                                                                showToast('You have been logged out');
                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                    // Redirect to login page
                                                                                                                                                                                                                                                                      setTimeout(() => {
                                                                                                                                                                                                                                                                          window.location.href = 'tester.html';
                                                                                                                                                                                                                                                                            }, 800);
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                            // Edit profile function
                                                                                                                                                                                                                                                                            function editProfile() {
                                                                                                                                                                                                                                                                              showToast('Profile editing feature coming soon!');
                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                              // Handle quick action buttons
                                                                                                                                                                                                                                                                              function handleAction(action) {
                                                                                                                                                                                                                                                                                const messages = {
                                                                                                                                                                                                                                                                                    'post-item': 'Ready to share an item? Click the button to post.',
                                                                                                                                                                                                                                                                                        'claim-item': 'Marked successfully! Please visit a drop-off point to claim your item.',
                                                                                                                                                                                                                                                                                            'navigate': 'Opening directions to drop-off point...',
                                                                                                                                                                                                                                                                                                'settings': 'Settings coming soon!',
                                                                                                                                                                                                                                                                                                    'help': 'Help & Support center coming soon!'
                                                                                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                          showToast(messages[action] || 'Feature coming soon!');
                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                          // Show toast notification
                                                                                                                                                                                                                                                                                                          function showToast(message) {
                                                                                                                                                                                                                                                                                                            const toast = document.getElementById('toast');
                                                                                                                                                                                                                                                                                                              toast.textContent = message;
                                                                                                                                                                                                                                                                                                                toast.classList.add('show');
                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                    setTimeout(() => {
                                                                                                                                                                                                                                                                                                                        toast.classList.remove('show');
                                                                                                                                                                                                                                                                                                                          }, 3000);
                                                                                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                                                                                          // Filter by category
                                                                                                                                                                                                                                                                                                                          function filterByCategory(category) {
                                                                                                                                                                                                                                                                                                                            const categorySelect = document.getElementById('itemType');
                                                                                                                                                                                                                                                                                                                              if (categorySelect) {
                                                                                                                                                                                                                                                                                                                                    categorySelect.value = category;
                                                                                                                                                                                                                                                                                                                                      applyFilters();
                                                                                                                                                                                                                                                                                                                                        const lostFound = document.querySelector('.lost-found-section');
                                                                                                                                                                                                                                                                                                                                        if (lostFound) scrollToSectionWithOffset(lostFound, 'lost-found');
                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                            // Apply filters
                                                                                                                                                                                                                                                                                                                                            function applyFilters() {
                                                                                                                                                                                                                                                                                                                                              showToast('Filters applied! Showing filtered results.');
                                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                              // Reset filters
                                                                                                                                                                                                                                                                                                                                              function resetFilters() {
                                                                                                                                                                                                                                                                                                                                                document.getElementById('itemType').value = '';
                                                                                                                                                                                                                                                                                                                                                  document.getElementById('itemStatus').value = '';
                                                                                                                                                                                                                                                                                                                                                    document.getElementById('searchLocation').value = '';
                                                                                                                                                                                                                                                                                                                                                      showToast('Filters reset');
                                                                                                                                                                                                                                                                                                                                                      }

// Navigation link click handler
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  function setActiveSectionById(id) {
    sections.forEach(s => {
      s.classList.remove('active-section', 'inactive-section');
      if (s.getAttribute('id') === id) {
        s.classList.add('active-section');
      } else {
        s.classList.add('inactive-section');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);

        // Immediately apply active/ inactive classes for quick feedback
        navLinks.forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
        this.classList.add('active');
        this.setAttribute('aria-current', 'page');
        setActiveSectionById(targetId);

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          // For categories and dropoff, center the section vertically for focus. Otherwise, align under navbar.
          const useCenter = (targetId === 'categories' || targetId === 'dropoff');
          // scrollToSectionWithOffset now returns a Promise that resolves after the smooth scroll.
          // Mark that an auto-scroll is happening so scroll observers won't override the active state.
          isAutoScrolling = true;
          pendingAutoScrollTarget = targetId;
          const scrollPromise = scrollToSectionWithOffset(targetSection, targetId, useCenter);

          // Re-apply active classes and trigger highlight after scroll completes to ensure transitions run.
          if (scrollPromise && typeof scrollPromise.then === 'function') {
            scrollPromise.then(() => {
              // Apply final active section classes
              setActiveSectionById(targetId);

              // Explicitly set the nav link active so the UI matches the visible section
              document.querySelectorAll('.nav-link').forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
              const finalNav = document.querySelector(`.nav-link[href='#${targetId}']`);
              if (finalNav) { finalNav.classList.add('active'); finalNav.setAttribute('aria-current', 'page'); }

              // Trigger highlights for special sections
              if (targetId === 'categories' || targetId === 'dropoff') {
                const highlightCards = targetSection.querySelectorAll('.category-card, .dropoff-card');
                highlightCards.forEach((c, idx) => {
                  setTimeout(() => { c.classList.add('active-card'); }, idx * 40);
                  setTimeout(() => { c.classList.remove('active-card'); }, 1000 + idx * 40);
                });
              }

              // Give a short grace period before observers resume so they don't immediately override
              setTimeout(() => {
                isAutoScrolling = false;
                pendingAutoScrollTarget = null;
              }, 120);
            }).catch(() => { isAutoScrolling = false; });
          } else {
            // Fallback: if no promise returned, still trigger highlight immediately and set nav
            setActiveSectionById(targetId);
            document.querySelectorAll('.nav-link').forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
            const finalNav = document.querySelector(`.nav-link[href='#${targetId}']`);
            if (finalNav) { finalNav.classList.add('active'); finalNav.setAttribute('aria-current', 'page'); }
            if (targetId === 'categories' || targetId === 'dropoff') {
              const highlightCards = targetSection.querySelectorAll('.category-card, .dropoff-card');
              highlightCards.forEach((c, idx) => {
                setTimeout(() => { c.classList.add('active-card'); }, idx * 40);
                setTimeout(() => { c.classList.remove('active-card'); }, 1000 + idx * 40);
              });
            }
            // Fallback: clear pending target after a short delay
            setTimeout(() => { isAutoScrolling = false; pendingAutoScrollTarget = null; }, 120);
          }
        }
      }
    });
  });

  // Initialize based on current scroll position
  updateActiveNavLink();
});

// Helper: scroll to a section while accounting for the navbar height (sticky header)
function scrollToSectionWithOffset(sectionEl, sectionId, alignCenter = false) {
  const navbar = document.querySelector('.navbar');
  const offset = navbar ? navbar.getBoundingClientRect().height : 0;
  // Use element top relative to document for reliable positioning
  const elementTop = sectionEl.getBoundingClientRect().top + window.scrollY;
  let targetY = elementTop - offset + 8; // small buffer

  if (alignCenter) {
    const viewportH = window.innerHeight;

    // Prefer centering the main grid/content inside the section (so categories/dropoff cards are centered)
    const innerSelector = '.categories-grid, .dropoff-grid, .grid, .items-container';
    const inner = sectionEl.querySelector(innerSelector);
    const secH = inner ? (inner.offsetHeight || inner.getBoundingClientRect().height) : (sectionEl.offsetHeight || sectionEl.getBoundingClientRect().height);

    // Compute center position for the chosen element (inner if present, otherwise whole section)
    const innerTop = inner ? (inner.getBoundingClientRect().top + window.scrollY) : elementTop;
    // If element is smaller than viewport, center it; otherwise, align its top under navbar with a small buffer
    if (secH < viewportH * 0.95) {
      const centerOffset = Math.floor((viewportH - secH) / 2);
      targetY = innerTop - offset - centerOffset;
    } else {
      targetY = innerTop - offset + 8;
    }
  }

  const finalY = Math.max(0, Math.floor(targetY));
  window.scrollTo({ top: finalY, behavior: 'smooth' });

  // Return a promise that resolves after an estimated smooth-scroll duration so callers can chain actions.
  // Duration heuristic: 500ms for short distances, scale up for longer distances but cap at 1200ms.
  try {
    const distance = Math.abs(window.scrollY - finalY);
    const duration = Math.min(1200, Math.max(350, Math.floor(distance / 2)));
    return new Promise(resolve => setTimeout(resolve, duration));
  } catch (err) {
    return Promise.resolve();
  }
}

// Keep CSS var for navbar height in-sync so browser anchor behavior respects the header
function updateNavbarHeightCSSVar() {
  const navbar = document.querySelector('.navbar');
  const height = navbar ? Math.ceil(navbar.getBoundingClientRect().height) : 0;
  document.documentElement.style.setProperty('--navbar-height', `${height}px`);
  return height;
}

// On load: set CSS var and apply to any hash present in the URL
window.addEventListener('load', function() {
  updateNavbarHeightCSSVar();
  // Also update on resize
  window.addEventListener('resize', updateNavbarHeightCSSVar);
  // Ensure refresh starts at Home: set nav active and section classes, and scroll to top.
  try {
    const navLinksLoad = document.querySelectorAll('.nav-link');
    navLinksLoad.forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
    const homeNav = document.querySelector(".nav-link[href='#home']");
    if (homeNav) { homeNav.classList.add('active'); homeNav.setAttribute('aria-current','page'); }

    document.querySelectorAll('section').forEach(s => {
      s.classList.remove('active-section', 'inactive-section');
      if (s.getAttribute('id') === 'home') s.classList.add('active-section'); else s.classList.add('inactive-section');
    });

    // Jump to top so Home is visible on refresh
    window.scrollTo({ top: 0, left: 0 });
  } catch (err) {
    /* ignore errors during load reset */
  }
  // If we have a hash in the URL, scroll to it (with offset)
  if (location.hash) {
    const id = location.hash.substring(1);
    const el = document.getElementById(id);
    if (el) {
      // small delay to allow initial layout and CSS var to apply
      setTimeout(() => scrollToSectionWithOffset(el, id), 120);
    }
  }
});
                                                                                                                                                                                                                                                                                                                                                                                                                                        
