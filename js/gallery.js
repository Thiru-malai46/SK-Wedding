/**
 * =========================================================================
 * CREATIVE PHOTO GALLERY & CINEMATIC LIGHTBOX CONTROLLER
 * =========================================================================
 * Features:
 * - 3D dynamic tilt on hover with golden specular reflection
 * - Multi-mode layout (Editorial Masonry vs Polaroid Keepsakes)
 * - Category filter tabs with live counters
 * - Interactive heart/like animation
 * - Fullscreen Lightbox with Zoom In/Out, Pan, and Auto-Slideshow mode
 */

(function () {
  const galleryData = window.WEDDING_CONFIG?.gallery || [];
  const galleryGrid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const layoutToggleBtns = document.querySelectorAll('.gallery-layout-btn');

  // Lightbox Elements
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxBadge = document.getElementById('lightboxBadge');
  const lightboxProgressBar = document.getElementById('lightboxProgressBar');
  const closeBtn = document.querySelector('.lightbox-close-btn');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  const btnZoomIn = document.getElementById('btnLightboxZoomIn');
  const btnZoomOut = document.getElementById('btnLightboxZoomOut');
  const btnResetZoom = document.getElementById('btnLightboxResetZoom');
  const btnSlideshow = document.getElementById('btnLightboxSlideshow');
  const btnFullscreen = document.getElementById('btnLightboxFullscreen');

  let activeCategory = 'all';
  let activeLayout = 'editorial'; // 'editorial' | 'polaroid'
  let filteredItems = [...galleryData];
  let currentIndex = 0;
  let zoomLevel = 1;
  let isSlideshowPlaying = false;
  let slideshowTimer = null;
  const SLIDESHOW_INTERVAL = 4000;

  // Track likes locally
  const likesState = {};
  galleryData.forEach(item => {
    likesState[item.id] = item.likes || Math.floor(80 + Math.random() * 50);
  });

  // Calculate & populate filter count badges
  function updateFilterCounts() {
    filterButtons.forEach(btn => {
      const cat = btn.getAttribute('data-filter');
      const count = cat === 'all'
        ? galleryData.length
        : galleryData.filter(i => i.category === cat).length;
      const countEl = btn.querySelector('.filter-count');
      if (countEl) countEl.textContent = `(${count})`;

      // Gracefully hide filter buttons that currently have 0 items
      if (cat !== 'all' && count === 0) {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'inline-flex';
      }
    });
  }

  // Render the creative gallery grid
  function renderGallery(category = 'all', layout = activeLayout) {
    if (!galleryGrid) return;
    activeCategory = category;
    activeLayout = layout;

    filteredItems = category === 'all'
      ? galleryData
      : galleryData.filter(item => item.category === category);

    galleryGrid.className = `gallery-grid layout-${activeLayout}`;
    galleryGrid.innerHTML = '';

    if (filteredItems.length === 0) {
      galleryGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--color-deep-brown-light);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">📷</div>
          <p style="font-family: var(--font-serif); font-size: 1.25rem;">No photographs in this collection yet.</p>
        </div>`;
      return;
    }

    filteredItems.forEach((item, index) => {
      const card = document.createElement('div');
      const orientationClass = item.orientation || 'standard';
      card.className = `gallery-card card-${orientationClass} reveal-on-scroll`;
      card.setAttribute('data-category', item.category);
      card.setAttribute('data-id', item.id);

      const isLiked = localStorage.getItem(`sk_liked_${item.id}`) === 'true';

      card.innerHTML = `
        <div class="gallery-card-inner">
          <div class="gallery-image-wrapper">
            <img src="${item.thumb || item.src}" alt="${item.title}" class="gallery-photo-img" loading="lazy" />
            <div class="gallery-shine-overlay"></div>
            
            <!-- Category Tag Badge -->
            <span class="gallery-card-tag">${item.badge || item.category}</span>
            
            <!-- Heart / Like Button -->
            <button class="gallery-heart-btn ${isLiked ? 'is-liked' : ''}" title="Send Love" type="button">
              <span class="heart-icon">${isLiked ? '❤️' : '🤍'}</span>
              <span class="heart-count">${likesState[item.id]}</span>
            </button>

            <!-- Zoom Prompt Icon -->
            <div class="gallery-zoom-prompt">
              <span>🔍 Enlarge</span>
            </div>
          </div>

          <div class="gallery-card-caption">
            <h4 class="gallery-card-title">${item.title}</h4>
            <p class="gallery-card-desc">${item.caption}</p>
          </div>
        </div>
      `;

      // 3D Card Tilt on Mouse Move
      init3DTilt(card);

      // Heart like button click
      const heartBtn = card.querySelector('.gallery-heart-btn');
      heartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerLike(item.id, heartBtn);
      });

      // Open Lightbox on card click
      card.addEventListener('click', () => {
        openLightbox(index);
      });

      galleryGrid.appendChild(card);
    });

    // Staggered reveal animation
    setTimeout(() => {
      document.querySelectorAll('.gallery-card').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 60);
      });
    }, 40);
  }

  // 3D Tilt Effect
  function init3DTilt(element) {
    const inner = element.querySelector('.gallery-card-inner');
    const shine = element.querySelector('.gallery-shine-overlay');
    if (!inner) return;

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,245,195,0.45) 0%, transparent 60%)`;
      }
    });

    element.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (shine) shine.style.background = 'transparent';
    });
  }

  // Heart like burst animation
  function triggerLike(id, btn) {
    const isLiked = btn.classList.contains('is-liked');
    if (!isLiked) {
      likesState[id]++;
      btn.classList.add('is-liked');
      btn.querySelector('.heart-icon').textContent = '❤️';
      localStorage.setItem(`sk_liked_${id}`, 'true');

      // Radiate mini heart particles
      createHeartParticles(btn);
    } else {
      likesState[id]--;
      btn.classList.remove('is-liked');
      btn.querySelector('.heart-icon').textContent = '🤍';
      localStorage.setItem(`sk_liked_${id}`, 'false');
    }
    btn.querySelector('.heart-count').textContent = likesState[id];
  }

  function createHeartParticles(target) {
    const rect = target.getBoundingClientRect();
    for (let i = 0; i < 6; i++) {
      const p = document.createElement('span');
      p.className = 'floating-heart-particle';
      p.textContent = '💖';
      p.style.left = `${rect.left + rect.width / 2}px`;
      p.style.top = `${rect.top}px`;
      p.style.setProperty('--dx', `${(Math.random() - 0.5) * 60}px`);
      p.style.setProperty('--dy', `${-30 - Math.random() * 50}px`);
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
  }

  // Lightbox Controller
  function openLightbox(index) {
    if (!lightbox || !filteredItems[index]) return;
    currentIndex = index;
    resetZoom();
    updateLightboxContent();
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    stopSlideshow();
    resetZoom();
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = filteredItems[currentIndex];
    if (!item) return;

    resetZoom();

    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
      setTimeout(() => {
        lightboxImg.style.opacity = '1';
      }, 150);
    }

    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.caption;
    if (lightboxBadge) lightboxBadge.textContent = item.badge || item.category.toUpperCase();
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${filteredItems.length}`;
    }
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
  }

  // Zoom Controls
  function setZoom(level) {
    zoomLevel = Math.max(0.7, Math.min(3, level));
    if (lightboxImg) {
      lightboxImg.style.transform = `scale(${zoomLevel})`;
      lightboxImg.style.cursor = zoomLevel > 1 ? 'grab' : 'zoom-in';
    }
  }

  function resetZoom() {
    setZoom(1);
  }

  if (btnZoomIn) btnZoomIn.addEventListener('click', () => setZoom(zoomLevel + 0.3));
  if (btnZoomOut) btnZoomOut.addEventListener('click', () => setZoom(zoomLevel - 0.3));
  if (btnResetZoom) btnResetZoom.addEventListener('click', resetZoom);

  // Slideshow
  function toggleSlideshow() {
    if (isSlideshowPlaying) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  }

  function startSlideshow() {
    isSlideshowPlaying = true;
    if (btnSlideshow) {
      btnSlideshow.innerHTML = '<span>⏸ Pause</span>';
      btnSlideshow.classList.add('is-active');
    }
    advanceSlideshow();
  }

  function advanceSlideshow() {
    if (!isSlideshowPlaying) return;
    if (lightboxProgressBar) {
      lightboxProgressBar.style.transition = 'none';
      lightboxProgressBar.style.width = '0%';
      setTimeout(() => {
        lightboxProgressBar.style.transition = `width ${SLIDESHOW_INTERVAL}ms linear`;
        lightboxProgressBar.style.width = '100%';
      }, 50);
    }

    slideshowTimer = setTimeout(() => {
      if (isSlideshowPlaying) {
        showNext();
        advanceSlideshow();
      }
    }, SLIDESHOW_INTERVAL);
  }

  function stopSlideshow() {
    isSlideshowPlaying = false;
    clearTimeout(slideshowTimer);
    if (lightboxProgressBar) {
      lightboxProgressBar.style.transition = 'none';
      lightboxProgressBar.style.width = '0%';
    }
    if (btnSlideshow) {
      btnSlideshow.innerHTML = '<span>▶ Slideshow</span>';
      btnSlideshow.classList.remove('is-active');
    }
  }

  if (btnSlideshow) btnSlideshow.addEventListener('click', toggleSlideshow);

  // Fullscreen
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        lightbox.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    });
  }

  // Filter category buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';
      renderGallery(cat, activeLayout);
    });
  });

  // Layout View Switcher buttons (Editorial vs Polaroid)
  layoutToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      layoutToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const layout = btn.getAttribute('data-layout') || 'editorial';
      renderGallery(activeCategory, layout);
    });
  });

  // Lightbox controls
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content-box')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      toggleSlideshow();
    }
    if (e.key === '+' || e.key === '=') setZoom(zoomLevel + 0.3);
    if (e.key === '-' || e.key === '_') setZoom(zoomLevel - 0.3);
  });

  // Mobile swipe gestures
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) showNext();
      if (touchEndX > touchStartX + 50) showPrev();
    }, { passive: true });
  }

  // Initial setup
  updateFilterCounts();
  renderGallery('all', 'editorial');
})();
