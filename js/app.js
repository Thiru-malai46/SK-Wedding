/**
 * =========================================================================
 * SK WEDDING - APPLICATION INITIALIZER & ANIMATED STORY CONTROLLER
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.WEDDING_CONFIG;
  if (!cfg) {
    console.error('WEDDING_CONFIG not loaded.');
    return;
  }

  // Populate Ceremony & Reception Links
  const ceremonyBtn = document.getElementById('btnCeremonyMap');
  if (ceremonyBtn && cfg.events.ceremony) {
    ceremonyBtn.href = cfg.events.ceremony.mapUrl;
    ceremonyBtn.textContent = cfg.events.ceremony.mapButtonText || 'View Location';
  }

  const receptionBtn = document.getElementById('btnReceptionMap');
  if (receptionBtn && cfg.events.reception) {
    receptionBtn.href = cfg.events.reception.mapUrl;
    receptionBtn.textContent = cfg.events.reception.mapButtonText || 'GET DIRECTIONS';
  }

  // =========================================================================
  // ANIMATED STORY ROADMAP & CHAPTERS
  // =========================================================================
  const storyContainer = document.getElementById('storyTimeline');
  const storyNavPills = document.getElementById('storyNavPills');

  if (storyContainer && cfg.story) {
    storyContainer.innerHTML = '<div class="story-progress-line" id="storyProgressLine"></div>';

    // Render Quick Chapter Navigation Pills
    if (storyNavPills) {
      storyNavPills.innerHTML = '';
      cfg.story.forEach((item, index) => {
        const pill = document.createElement('button');
        pill.className = `story-nav-pill ${index === 0 ? 'is-active' : ''}`;
        pill.type = 'button';
        pill.innerHTML = `<span>${item.icon}</span> <span>Ch ${item.chapterNumber}</span>`;
        pill.addEventListener('click', () => {
          document.querySelectorAll('.story-nav-pill').forEach(p => p.classList.remove('is-active'));
          pill.classList.add('is-active');
          const targetCard = document.getElementById(`storyChapter-${index}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
        storyNavPills.appendChild(pill);
      });
    }

    // Render Timeline Items with Interactive Animations
    cfg.story.forEach((item, index) => {
      const isEven = index % 2 === 1;
      const itemEl = document.createElement('div');
      itemEl.id = `storyChapter-${index}`;
      itemEl.className = `timeline-item ${isEven ? 'timeline-right' : 'timeline-left'} reveal-on-scroll`;
      itemEl.setAttribute('data-chapter-index', index);

      itemEl.innerHTML = `
        <div class="timeline-photo-col">
          <div class="story-photo-card">
            <div class="story-photo-frame">
              <img src="${item.image}" alt="${item.title}" class="story-photo-img" loading="lazy" />
              <div class="story-photo-glass-reflection"></div>
              <span class="story-photo-stamp">✦ ${item.chapter} ✦</span>
            </div>
            <!-- Delicate Floating Corner Ornaments -->
            <div class="story-corner-ornament sc-top-left"></div>
            <div class="story-corner-ornament sc-bottom-right"></div>
          </div>
        </div>

        <!-- Glowing Central Milestone Node -->
        <div class="timeline-node-dot" title="${item.chapter}">
          <div class="node-pulse-ring"></div>
          <span class="node-icon">${item.icon}</span>
        </div>

        <div class="timeline-card-col">
          <div class="story-content-card">
            <div class="story-card-top-bar">
              <span class="story-badge-pill">${item.badge || item.chapter}</span>
              <span class="story-date-tag">📅 ${item.date}</span>
            </div>

            <h3 class="story-card-title">${item.title}</h3>

            ${item.quote ? `<blockquote class="story-card-quote">“${item.quote}”</blockquote>` : ''}

            <p class="story-card-desc">${item.description}</p>

            <div class="story-card-footer">
              <span class="story-milestone-marker">Milestone ${index + 1} of ${cfg.story.length}</span>
              <span class="story-heart-emblem">❤️</span>
            </div>
          </div>
        </div>
      `;

      storyContainer.appendChild(itemEl);
    });

    // Dynamic Story Scroll Progress Bar & Node Glow
    initStoryScrollProgress();
  }

  function initStoryScrollProgress() {
    const progressLine = document.getElementById('storyProgressLine');
    const timeline = document.getElementById('storyTimeline');
    if (!progressLine || !timeline) return;

    window.addEventListener('scroll', () => {
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress from 0% to 100%
      const start = rect.top - windowHeight * 0.7;
      const total = rect.height;
      let progress = 0;

      if (start < 0) {
        progress = Math.min(100, Math.max(0, (-start / total) * 100));
      }

      progressLine.style.height = `${progress}%`;

      // Illuminate nodes as progress passes them
      document.querySelectorAll('.timeline-item').forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const node = item.querySelector('.timeline-node-dot');
        const pill = document.querySelectorAll('.story-nav-pill')[item.getAttribute('data-chapter-index')];

        if (itemRect.top < windowHeight * 0.65) {
          node?.classList.add('is-passed');
          item.classList.add('is-highlighted');
          if (pill) {
            document.querySelectorAll('.story-nav-pill').forEach(p => p.classList.remove('is-active'));
            pill.classList.add('is-active');
          }
        } else {
          node?.classList.remove('is-passed');
          item.classList.remove('is-highlighted');
        }
      });
    }, { passive: true });
  }

  // =========================================================================
  // SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
