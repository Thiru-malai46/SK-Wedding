/**
 * =========================================================================
 * WEDDING COUNTDOWN TIMER & CALENDAR EVENT INTEGRATION
 * =========================================================================
 * Target: 22 November 2026, 7:30 AM IST (Asia/Kolkata)
 */

(function () {
  const targetIso = window.WEDDING_CONFIG?.events?.countdownTarget || "2026-11-22T07:30:00+05:30";
  const targetTime = new Date(targetIso).getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  const passedMsgEl = document.getElementById('cd-passed-message');
  const countdownGridEl = document.querySelector('.countdown-grid');

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";

      if (countdownGridEl) countdownGridEl.style.display = 'none';
      if (passedMsgEl) passedMsgEl.style.display = 'block';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // "Add to Calendar" Logic
  const googleCalBtn = document.getElementById('btnGoogleCalendar');
  const icsCalBtn = document.getElementById('btnIcsCalendar');

  const eventTitle = encodeURIComponent("Wedding: K Suriya ♥ V Kaviya");
  const eventDetails = encodeURIComponent(
    "Wedding Ceremony: 7:30 AM - 9:00 AM at Arulmigu Uthira Ranganathar Swamy Temple\nReception: 6:00 PM onwards at SVS Lakshmi Palace, Pallikonda.\nWe warmly request your presence and blessings!"
  );
  const eventLocation = encodeURIComponent(
    "Arulmigu Uthira Ranganathar Swamy Temple & SVS Lakshmi Palace, Pallikonda"
  );
  
  // 2026-11-22 07:30 IST is 2026-11-22 02:00:00 UTC
  // 2026-11-22 22:00 IST is 2026-11-22 16:30:00 UTC
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=20261122T020000Z/20261122T163000Z&details=${eventDetails}&location=${eventLocation}`;

  if (googleCalBtn) {
    googleCalBtn.href = googleCalUrl;
    googleCalBtn.target = "_blank";
    googleCalBtn.rel = "noopener noreferrer";
  }

  if (icsCalBtn) {
    icsCalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsData = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//SK Wedding//Suriya and Kaviya Wedding//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "SUMMARY:Wedding: K Suriya ♥ V Kaviya",
        "DESCRIPTION:Wedding Ceremony: 7:30 AM - 9:00 AM at Arulmigu Uthira Ranganathar Swamy Temple\\nReception: 6:00 PM onwards at SVS Lakshmi Palace, Pallikonda.",
        "LOCATION:SVS Lakshmi Palace, Pallikonda",
        "DTSTART:20261122T020000Z",
        "DTEND:20261122T163000Z",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'suriya-kaviya-wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
})();
