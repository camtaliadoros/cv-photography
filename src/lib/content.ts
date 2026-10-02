/**
 * Copy from the approved design, used as the fallback for every page.
 *
 * Each page renders `cms?.field ?? fallback.field`, so the site is complete
 * and correct before Sanity holds a single document, and each field switches
 * over independently as Cam fills the Studio in. Photographs are the one thing
 * with no fallback — those have to come from Sanity.
 */

export const homeContent = {
  heroHeading: "Expressive photography for families who feel it all.",
  heroSubline: "Story-led family and motherhood sessions",
  introHeading: "Let's make something real.",
  introBody: [
    "I'm here to honour this season in your family's story — the whole range of feelings: the tantrums as much as the triumphs.",
    "These are the moments you'll want to look back on. The ones quietly shaping who you are, long before you'll know to call them your favourites.",
  ],
  approachHeading: "All the feeling, none of the fuss.",
  approachBody: [
    "I want your session to feel like real life, not a performance. Little ones make magic out of the most mundane things: the mischief, the giggles, the love you can see in a single look. My job is to notice it and hold onto it.",
    "I capture things as they happen, so the session flows. I'll gently guide you as we go, nudging you into the best light and letting it unfold from there.",
  ],
  approachPullQuote:
    "I won't direct your every move, but I'll never leave you wondering what to do with your hands.",
  closingHeading: "This season won't last forever, but it can be held onto.",
  closingBody:
    "The love, the giggles, the chaos, their little personalities just bubbling up. I'd love to be the one to hold onto it for you.",
  sessionsHeading: "Whatever chapter you are in.",
  recentWorkEyebrow: "Recent work",
  recentWorkHeading: "Real, fleeting moments.",
  seoTitle: "Family & Motherhood Photographer in Hertfordshire",
  seoDescription:
    "Expressive maternity, newborn and family photography in Hertfordshire and London. Story-led sessions that capture the whole range of family life — the chaos and the giggles included.",
};

export const aboutContent = {
  heroEyebrow: "Behind the camera",
  heroHeading: "Hello, I'm Cam.",
  heroStandfirst: "Mum of two little girls, sound-bath lover, and never far from a camera.",
  storyEyebrow: "How I got here",
  storyHeading:
    "I've always been a people-watcher, endlessly curious about what makes someone *them*.",
  story: [
    "I picked up a camera properly in 2019, on a year-long trip around the world with my husband, and it never really left my hand.",
    "Then came my girls. Same family, already two completely different people, and I couldn't put the camera down. That curiosity is still what drives every session.",
  ],
  offCameraEyebrow: "A few things about me",
  offCameraHeading: "Off camera.",
  offCameraItems: [
    { text: "Brazilian by birth, on British soil for 13 years and counting" },
    { text: "Happiest covered in sand, under the sun, cocktail in hand" },
    { text: "Café hopper, pastry lover" },
    { text: "Travel daydreamer" },
    {
      text: "Chef, comforter, household CEO, Uber driver and resident kitchen-disco DJ",
      aside: "(all unpaid)",
    },
  ],
  closingQuote:
    "These are the moments quietly writing your family's chapters, long before you'll know to call them your favourites.",
  seoTitle: "About Cam",
  seoDescription:
    "Hello, I'm Cam — a Brazilian turned British mum of two, photographing maternity, newborn and family sessions across Hertfordshire and London.",
};

export const sessionsContent = {
  heroEyebrow: "Sessions",
  heroHeading: "Whatever chapter you are in.",
  heroStandfirst:
    "One session, one price — at home, in the woods, or wherever your family feels most yourselves.",
  typesEyebrow: "Session types",
  typesHeading: "Three ways to be photographed.",
  reasonsEyebrow: "Why families book me",
  reasonsHeading: "What you can count on.",
  reasons: [
    {
      heading: "Gently guided, never stiff.",
      body: "You'll never wonder what to do with your hands.",
    },
    {
      heading: "Planned around your little ones.",
      body: "Feeds, naps and meltdowns are all part of it. No rushing.",
    },
    {
      heading: "One price, everything included.",
      body: "No packages to decode, no surprise extras later.",
    },
    {
      heading: "I come to you.",
      body: "At home or somewhere you love, across Hertfordshire and London.",
    },
  ],
  approachHeading: "All the feeling, none of the fuss.",
  approachBody: [
    "I capture things as they happen, so the session flows. I'll gently guide you as we go, nudging you into the best light and letting it unfold from there. With maternity and newborn I lead a little more, working gently around your baby.",
    "What I'm looking for is your personalities — the expressions, the closeness, the deep, unbreakable bond. I want you to look at these photographs one day and feel exactly what it felt like to be here.",
  ],
  approachPullQuote:
    "I won't direct your every move, but I'll never leave you wondering what to do with your hands.",
  priceEyebrow: "Investment",
  priceHeading: "One session, one price.",
  priceStandard: "£200",
  priceIncludes: [
    "Up to two hours together, in your home or a location you love. Newborn sessions extend to three hours.",
    "A private online gallery to choose from, within two weeks.",
    "Your favourite five images, hand-edited and download-ready.",
  ],
  priceNotes: [
    {
      heading: "More than five?",
      body: "After your gallery arrives, add five more images for £100, or upgrade to the full gallery (30+ images) for £200. No pressure, no minimum. You'll also have the chance to order prints, frames and albums.",
    },
    {
      heading: "Payment schedule",
      body: "A non-refundable £50 booking fee secures your date and comes off your balance. The balance is due a week before your session.",
    },
    {
      heading: "Travel",
      body: "Hertfordshire and London are home ground. I'm always happy to travel further — a travel fee applies.",
    },
  ],
  faqEyebrow: "Frequently asked",
  faqHeading: "Wondering about…",
  seoTitle: "Sessions & Pricing",
  seoDescription:
    "Maternity, newborn and family photography sessions in Hertfordshire and London. One session, one price: £200 including a private gallery and hand-edited images.",
};

export const miniSessionContent = {
  heroEyebrow: "Mini sessions",
  heroHeading: "Pumpkin patch mini sessions",
  heroStandfirst: "The Pop Up Farm, Flamstead · Saturday 10th October",
  introHeading:
    "Come have some fun at the Pumpkin & Squash Festival with me.",
  introBody: [
    "I'm setting up at The Pop Up Farm for mini sessions: just you, your little gang and a whole lot of pumpkins.",
    "I'll gently guide you where I need to, then let little ones do their thing — hunting down the biggest pumpkin they can carry, running through the giant straw maze — while I catch the real, giggly moments in between.",
  ],
  detailsHeading: "The details",
  details: [
    { label: "When", value: "Saturday 10th October — slots from 9:30am" },
    { label: "Where", value: "The Pop Up Farm, Flamstead — just off the M1, J9" },
    { label: "How long", value: "20 minutes" },
    {
      label: "Who can join",
      value:
        "A grown-up or two and the little ones. Twenty minutes won't stretch to the whole clan, but I'd love to fit everyone in at a full session another time.",
    },
  ],
  price: "£60",
  priceLabel: "Your slot",
  priceIncludes: [
    "Includes your 20-minute session, plus one image of your choice.",
    "Within a week, a private online gallery of 15 photos to choose from.",
  ],
  priceAddOns: ["Add 2 more images: £50", "The full gallery of 15: £120"],
  priceNotes: [
    {
      heading: "Farm entry",
      body: "The £60 covers your session and one image. Farm entry is separate, booked through The Pop Up Farm.",
    },
    { heading: "Payment", body: "Taken when you book, to hold your slot." },
    {
      heading: "Weather",
      body: "We'll be outside, so I'll keep half an eye on the forecast. If it's really wet, we move to the back-up date: Saturday 17th October.",
    },
  ],
  seoTitle: "Pumpkin Patch Mini Sessions — Flamstead, Hertfordshire",
  seoDescription:
    "Twenty-minute pumpkin patch mini sessions at The Pop Up Farm, Flamstead, on Saturday 10th October. £60 including a private gallery of 15 photos.",
};

export const enquireContent = {
  heroEyebrow: "Say hello",
  heroHeading: "Tell me about your family.",
  heroStandfirst:
    "Who's who, what you love doing together, and what feels right for you. I reply to every enquiry within two days.",
  sentHeading: "That's with me.",
  sentBody:
    "I'll be in touch within two days — usually sooner. In the meantime, have a wander through the portfolio.",
  seoTitle: "Enquire",
  seoDescription:
    "Enquire about a maternity, newborn or family photography session in Hertfordshire or London. Every enquiry gets a reply within two days.",
};

export const portfolioContent = {
  heroEyebrow: "Portfolio",
  heroHeading: "The whole range of feelings.",
  seoTitle: "Portfolio",
  seoDescription:
    "A portfolio of maternity, newborn and family photography from sessions across Hertfordshire and London.",
};

export const journalContent = {
  heroEyebrow: "Journal",
  heroHeading: "Sessions, stories and small notes.",
  heroStandfirst:
    "Recent families, and the things I've learned photographing my own.",
  seoTitle: "Journal",
  seoDescription:
    "Session stories, practical guides and small notes from a family photographer in Hertfordshire.",
};

export const settingsContent = {
  newsletterHeading: "Mini session dates, before anyone else.",
  newsletterBody:
    "Occasional notes from me — new dates, offers, and the odd thing I've learned while photographing little ones. Unsubscribe anytime.",
  newsletterPrivacyNote:
    "Your details are safe with me — I'll only use them to send you these notes.",
  footerBlurb:
    "Maternity, newborn and family photographer in Hertfordshire, for families who feel it all — the chaos and the giggles included.",
  footerSeoLine:
    "Story-led family and motherhood photography in St Albans, Harpenden, Hitchin, Welwyn Garden City, Hertford, London and further afield.",
};

/** Used when Sanity has no session types yet. */
export const defaultSessionTypes = [
  {
    _id: "fallback-maternity",
    title: "Maternity",
    category: "maternity" as const,
    tagline: "The quiet before the beginning",
    description:
      "Gently led, so you can settle into it. We'll find holds that feel beautiful but natural, and let the rest unfold.",
  },
  {
    _id: "fallback-newborn",
    title: "Newborn & baby",
    category: "newborn" as const,
    tagline: "Small hands, big feelings",
    description:
      "Relaxed and in-home, in your little bubble. Three hours, planned around your baby's rhythm — feeds, naps and all.",
  },
  {
    _id: "fallback-families",
    title: "Families",
    category: "families" as const,
    tagline: "Everyone in the frame",
    description:
      "Two hours together, at home or a location you love. Toddlers, big kids and all the mischief included.",
  },
];

export const defaultTestimonials = [
  {
    _id: "fallback-tove",
    quote:
      "Cam made my son feel completely at ease which ensured the pictures were natural.",
    name: "Tove Moulton",
  },
];
