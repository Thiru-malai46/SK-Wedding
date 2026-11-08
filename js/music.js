/**
 * =========================================================================
 * SK WEDDING - BACKGROUND MUSIC CONTROLLER
 * =========================================================================
 * Song: Mangalyam Tantunanena (Alaipayuthey - A.R. Rahman)
 * Features:
 *  - Autoplay on opening invitation button tap (direct user gesture compliance)
 *  - Smooth fade-in volume transition
 *  - Floating interactive toggle button with animated vinyl/bars
 *  - Universal fallback for mobile & desktop browsers
 */

(function () {
  const musicConfig = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.music) || {
    enabled: true,
    volume: 0.75,
    autoplayOnOpen: true
  };

  if (!musicConfig.enabled) return;

  const audio = document.getElementById('weddingBgMusic');
  const toggleBtn = document.getElementById('musicToggleBtn');
  const openBtn = document.getElementById('openBtn');
  const musicLabel = document.getElementById('musicLabel');

  if (!audio || !toggleBtn) return;

  let isPlaying = false;
  let userMutedManually = false;
  const targetVolume = typeof musicConfig.volume === 'number' ? musicConfig.volume : 0.75;

  audio.volume = targetVolume;

  function updateUi(playing) {
    isPlaying = playing;
    if (playing) {
      toggleBtn.classList.add('is-playing');
      toggleBtn.classList.remove('is-paused');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.setAttribute('title', 'Pause Background Music (Mangalyam Tantunanena)');
      if (musicLabel) musicLabel.textContent = 'Music On';
    } else {
      toggleBtn.classList.remove('is-playing');
      toggleBtn.classList.add('is-paused');
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.setAttribute('title', 'Play Background Music (Mangalyam Tantunanena)');
      if (musicLabel) musicLabel.textContent = 'Music Off';
    }
  }

  function fadeInAudio(durationMs) {
    audio.volume = 0.05;
    const stepTime = 50;
    const steps = (durationMs || 1500) / stepTime;
    const volStep = (targetVolume - 0.05) / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      currentStep++;
      if (audio.volume + volStep < targetVolume) {
        audio.volume += volStep;
      } else {
        audio.volume = targetVolume;
        clearInterval(fadeInterval);
      }
      if (currentStep >= steps) clearInterval(fadeInterval);
    }, stepTime);
  }

  function playMusic(withFade = true) {
    if (userMutedManually && !withFade) {
      userMutedManually = false;
    }

    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          updateUi(true);
          if (withFade) {
            fadeInAudio(1500);
          } else {
            audio.volume = targetVolume;
          }
        })
        .catch((err) => {
          console.warn('Audio play request was prevented by browser policy:', err);
          updateUi(false);
        });
    }
  }

  function pauseMusic() {
    audio.pause();
    updateUi(false);
  }

  function toggleMusic() {
    if (audio.paused) {
      userMutedManually = false;
      playMusic(false);
    } else {
      userMutedManually = true;
      pauseMusic();
    }
  }

  // Toggle button click
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });

  // Autoplay as soon as "OPEN INVITATION" button or custom event fires
  window.addEventListener('wedding:invitationOpened', () => {
    if (!userMutedManually) {
      playMusic(true);
    }
  });

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      if (!userMutedManually) {
        playMusic(true);
      }
    });
  }

  // Also listen for native audio events
  audio.addEventListener('play', () => updateUi(true));
  audio.addEventListener('pause', () => updateUi(false));
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });
})();
