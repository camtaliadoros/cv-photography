export const site = {
  name: "Cam Velucci Photography",
  url: "https://camvelucci.com",
  email: "hello@camvelucci.com",
  instagram: "camvelucciphotography",
  instagramUrl: "https://instagram.com/camvelucciphotography",
  /** Where mini-session slots are booked and paid for. */
  miniBookingUrl:
    "https://camvelucciphotography.pixieset.com/booking/pumpkin-festival-minis",
  region: "Hertfordshire",
  areasServed: [
    "St Albans",
    "Harpenden",
    "Hitchin",
    "Welwyn Garden City",
    "Hertford",
    "London",
  ],
  tagline: "Expressive photography for families who feel it all.",
  subline: "Story-led family and motherhood sessions",
} as const;

export const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/sessions", label: "Sessions" },
  { href: "/mini-sessions", label: "Mini sessions" },
] as const;
