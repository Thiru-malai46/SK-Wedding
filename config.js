/**
 * =========================================================================
 * SK WEDDING - OFFICIAL WEDDING CONFIGURATION
 * =========================================================================
 * Couple: K SURIYA & V KAVIYA
 * Date: Sunday, 22 November 2026
 *
 * All text, dates, venues, photo paths, and settings can be easily edited here.
 */

window.WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: "Suriya",
    bride: "Kaviya",
    fullName: "Suriya & Kaviya",
    initials: "SK",
    weddingTitle: "SK WEDDING",
    tagline: "Together Forever",
    invitationSubtitle: "REQUEST THE HONOUR OF YOUR PRESENCE",
    invitationHeading: "Together With Our Families",
    heroCelebrationText: "Are Getting Married",
    heroDateText: "Sunday, 22 November 2026",
    blessingQuote: "Your Presence Is Our Greatest Blessing",
    thankYouText: "Thank You for Celebrating Our Special Day"
  },

  // Background Celebration Music (Mangalyam Tantunanena - Alaipayuthey)
  music: {
    enabled: true,
    title: "Mangalyam Tantunanena",
    movie: "Alaipayuthey",
    composer: "A.R. Rahman",
    audioSrcM4a: "assets/audio/wedding-music.m4a",
    audioSrcWebm: "assets/audio/wedding-music.webm",
    autoplayOnOpen: true,
    volume: 0.75
  },

  // Key Event Dates and Countdown Target (IST: Asia/Kolkata UTC+05:30)
  events: {
    // Countdown Target: 22 November 2026, 07:30 AM IST
    countdownTarget: "2026-11-22T07:30:00+05:30",
    timezone: "Asia/Kolkata",

    // Wedding Ceremony
    ceremony: {
      id: "ceremony",
      title: "WEDDING CEREMONY",
      day: "Sunday",
      dateFormatted: "22 November 2026",
      fullDateText: "Sunday, 22 November 2026",
      time: "7:30 AM – 9:00 AM",
      timeNote: "Auspicious Muhurtham",
      venueName: "ARULMIGU UTHIRA RANGANATHAR SWAMY TEMPLE",
      address: "Arulmigu Uthira Ranganathar Swamy Temple, Tamil Nadu, India",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Arulmigu+Uthira+Ranganathar+Swamy+Temple",
      mapButtonText: "View Location",
      icon: "🛕"
    },

    // Reception Celebration
    reception: {
      id: "reception",
      title: "RECEPTION CELEBRATION",
      day: "Sunday",
      dateFormatted: "22 November 2026",
      fullDateText: "Sunday, 22 November 2026",
      time: "6:00 PM onwards",
      timeNote: "An Evening of Joy & Dinner",
      venueName: "SVS LAKSHMI PALACE",
      address: "M.C. ROAD, NH SERVICE ROAD, PALLIKONDA",
      mapUrl: "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiogZjKut6XAxUAAAAAHQAAAAAQBQ..i&udm&fvr=1&pvq=Cg0vZy8xMXk1cTViNGZjIhcKEXN2cyBsYWtzaG1pIG1haGFsEAIYA4kB2wmzrEUJmXA&lqi=ChxzdnMgbGFrc2htaSBtYWhhbCBwYWxsaWtvbmRhSKuj1OKWvYCACFoqEAAQARACGAAYAhgDIhxzdnMgbGFrc2htaSBtYWhhbCBwYWxsaWtvbmRhkgENd2VkZGluZ192ZW51ZQ&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3bad15004a3ebf47:0x70990945acb309db",
      mapButtonText: "GET DIRECTIONS",
      icon: "✨"
    }
  },

  // Our Story / Photographic Timeline with Rich Animated Milestones (Exactly 3 Milestones)
  story: [
    {
      chapterNumber: "01",
      chapter: "Chapter 01",
      title: "Our Beginning",
      icon: "🌱",
      date: "The Spark of Companionship",
      badge: "The Genesis",
      quote: "Every love story is beautiful, but ours is our favorite.",
      description: "With the loving blessings of our families, our journey began with mutual respect, shared cultural roots, and the spark of lifelong companionship.",
      image: "assets/images/couple/couple-1.jpg",
      placeholderLabel: "First Meet / Couple Photo"
    },
    {
      chapterNumber: "02",
      chapter: "Chapter 02",
      title: "The Engagement",
      icon: "💍",
      date: "Promised Forever",
      badge: "Sacred Vows",
      quote: "Two souls with but a single thought, two hearts that beat as one.",
      description: "Surrounded by our nearest and dearest, we exchanged sacred rings and heartfelt vows to walk hand in hand through every season of life.",
      image: "assets/images/engagement/engagement-1.jpg",
      placeholderLabel: "Engagement Ceremony Photo"
    },
    {
      chapterNumber: "03",
      chapter: "Chapter 03",
      title: "The Sacred Muhurtham",
      icon: "🛕",
      date: "Sunday, 22 Nov 2026 • 7:30 AM",
      badge: "Holy Matrimony",
      quote: "Under the divine temple bells, two lives become one eternal bond.",
      description: "Under the sacred presence of Arulmigu Uthira Ranganathar Swamy and amidst Vedic mantras, we take the auspicious seven steps as husband and wife.",
      image: "assets/images/save-the-date.jpg",
      placeholderLabel: "Save The Date / Muhurtham Photo"
    }
  ],

  // Creative Photo Gallery (Real Engagement & Couple Photographs with Distinct Names)
  gallery: [
    {
      id: "e1",
      category: "engagement",
      title: "Sacred Promises",
      caption: "The divine ring exchange ceremony under the golden floral arch.",
      badge: "Ritual",
      orientation: "standard",
      likes: 156,
      src: "assets/images/engagement/engagement-1.jpg",
      thumb: "assets/images/engagement/engagement-1.jpg"
    },
    {
      id: "e2",
      category: "engagement",
      title: "Golden Radiance",
      caption: "Suriya & Kaviya — Adorned in silk and radiant with eternal smiles.",
      badge: "Tradition",
      orientation: "standard",
      likes: 168,
      src: "assets/images/engagement/engagement-2.jpg",
      thumb: "assets/images/engagement/engagement-2.jpg"
    },
    {
      id: "c1",
      category: "couple",
      title: "Soulful Serenade",
      caption: "A romantic promise by the shore — Suriya & Kaviya",
      badge: "Proposal",
      orientation: "standard",
      likes: 172,
      src: "assets/images/couple/couple-3.jpg",
      thumb: "assets/images/couple/couple-3.jpg"
    },
    {
      id: "c2",
      category: "couple",
      title: "A Lifetime of Love",
      caption: "Running hand in hand through the sea waves with pure laughter and happiness for a lifetime",
      badge: "Lifetime",
      orientation: "standard",
      likes: 144,
      src: "assets/images/couple/couple-4.jpg",
      thumb: "assets/images/couple/couple-4.jpg"
    }
  ],

  // Colour Theme Reference (Dulux SEASHELL PINK + Warm Ivory + Champagne Gold)
  theme: {
    seashellPink: "#F8E2D4",
    warmIvory: "#FFF9F4",
    champagneGold: "#C6A15B",
    softBlush: "#F3D4CA",
    mutedRose: "#B77C78",
    deepBrown: "#49352F",
    openingMaroonStart: "#5d0000",
    openingMaroonMid: "#3b0000",
    openingMaroonEnd: "#220000",
    goldMetallic: "#D4AF37"
  }
};
