/**
 * =========================================================================
 * OPENING INVITATION ANIMATION CONTROLLER
 * =========================================================================
 */

(function () {
  const openingScreen = document.getElementById('opening-screen');
  const openBtn = document.getElementById('openBtn');
  const openingSeal = document.querySelector('.opening-seal');

  function openInvitation() {
    if (!openingScreen || openingScreen.classList.contains('is-opened')) return;

    // Smooth transition
    openingScreen.classList.add('is-opened');

    // Scroll to top of inside page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Fire entrance event for animations
    window.dispatchEvent(new CustomEvent('wedding:invitationOpened'));
  }

  if (openBtn) {
    openBtn.addEventListener('click', openInvitation);
  }

  const palaceMonogram = document.querySelector('.palace-monogram');
  if (palaceMonogram) {
    palaceMonogram.addEventListener('click', openInvitation);
  }
})();
