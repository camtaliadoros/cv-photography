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
  introHeading: "Let's make something real",
  introBody: [
    "I love getting close. Close enough to catch the eye-roll, the gap-toothed grin, the frown of total concentration, the way your littlest leans into you without thinking.",
    "Every family has its own language: the in-jokes, the looks, the quirks nobody else would notice. Since becoming a mum, I've realised that's where the love really shows. Not in the big moments, but in the faces you pull at each other every day.",
    "That's what I want your photos to hold. Not just what you looked like, but who you were.",
  ],
  approachHeading: "All the feeling, none of the fuss.",
  approachBody: [
    "Since becoming a mum, I've noticed the biggest declarations of love rarely look like much. A hand resting on a back. A look passed between you across the kitchen. The everyday things that slip by unnoticed when you're running on empty.",
    "That's what I'm watching for when I photograph your family: how you are with each other, and the quirks that make you, you.",
  ],
  approachPullQuote: "It all goes by in a blur. These moments deserve to be kept.",
  closingHeading: "Bring the whole cast.",
  closingBody:
    "The giggles, the chaos, their little personalities bubbling up. I'd love to catch it all for you.",
  sessionsHeading: "Whatever chapter you are in.",
  recentWorkEyebrow: "Recent work",
  recentWorkHeading: "Real, fleeting moments.",
  seoTitle: "Family & Motherhood Photographer Hertfordshire",
  seoDescription:
    "Lifestyle family, maternity & newborn photography in Harpenden, St Albans & across Hertfordshire. Relaxed, gently guided sessions at home or outdoors.",
};

export const aboutContent = {
  heroEyebrow: "Behind the camera",
  heroHeading: "Hello, I'm Cam.",
  heroStandfirst: "Mum of two little girls, sound-bath lover, and never far from a camera.",
  storyEyebrow: "How I got here",
  storyHeading: "I've always been endlessly curious about what makes someone *them*.",
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
  seoTitle: "About Cam | Family Photographer in Harpenden, Hertfordshire",
  seoDescription:
    "Hi, I'm Cam, a Brazilian-born mum of two in Harpenden, photographing family, maternity and newborn sessions across Hertfordshire. Relaxed and gently guided.",
};

export const sessionsContent = {
  heroEyebrow: "Sessions",
  heroHeading: "Whatever chapter you are in.",
  heroStandfirst:
    "Gentle, story-led shoots that capture the real, everyday beauty of family life.",
  typesEyebrow: "Session types",
  typesHeading: "Three different stages, same love and connection.",
  reasonsEyebrow: "Why families book me",
  reasonsHeading: "What you can count on.",
  reasons: [
    {
      heading: "Up close, full of character.",
      body: "I get in close for the real expressions, the cheeky grins and the side-eyes.",
    },
    {
      heading: "Shaped around your family.",
      body: "I'll get to know your lot before we meet, then build the session around them.",
    },
    {
      heading: "I am not seeking polished perfection",
      body: "I'll take the jam-on-the-cheek grin over the perfect smile every time.",
    },
    {
      heading: "Clear pricing, no surprises.",
      body: "Everything upfront and out in the open.",
    },
  ],
  approachHeading: "What matters to me",
  approachBody: [
    "To me, it is all about personalities and connection. The expressions, the closeness, the deep, unbreakable bond. I want you to look at these photographs one day and feel exactly what it felt like to be here.",
    "The sessions are relaxed, and I capture things as they happen. I'll gently guide you as we go, nudging you into the best light and letting it unfold from there. It all flows.",
  ],
  approachPullQuote:
    "Your session should feel like an ordinary afternoon with your people. Mischief, meltdowns, giggles and all.",
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
      body: "After your gallery arrives, add five more images for £100, or upgrade to the full gallery (30+ images) for £200. No pressure, no minimum. You can also order prints, frames, and albums.",
    },
    {
      heading: "Travel",
      body: "Hertfordshire and London are home ground. I'm always happy to travel further (a travel fee applies).",
    },
  ],
  faqEyebrow: "Frequently asked",
  faqHeading: "Wondering about…",
  seoTitle: "Family, Maternity & Newborn Sessions & Prices | Herts",
  seoDescription:
    "Family, maternity & newborn sessions in Hertfordshire & London. One simple price: a two-hour session, a private gallery and five hand-edited images.",
};

export const miniSessionContent = {
  heroEyebrow: "Mini sessions",
  heroHeading: "Pumpkin patch mini sessions",
  heroStandfirst: "The Pop Up Farm, Flamstead · Saturday 10th October",
  introHeading:
    "Come have some fun at the Pumpkin & Squash Festival with me.",
  introBody: [
    "I'm setting up at The Pop Up Farm for mini sessions: just you, your little gang and a whole lot of pumpkins.",
    "I'll gently guide you where I need to, then let little ones do their thing, hunting down the biggest pumpkin they can carry, running through the giant straw maze while I catch the real, giggly moments in between.",
  ],
  detailsHeading: "The details",
  details: [
    { label: "When", value: "Saturday 10th October, slots from 9:30am" },
    { label: "Where", value: "The Pop Up Farm, Flamstead - just off the M1, J9" },
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
    "Includes your 20-minute session, plus two images of your choice.",
    "Within a week, a private online gallery of 15 photos to choose from.",
  ],
  priceAddOns: [
    "1 Extra Image: £30",
    "3 Extra Images (5 total): £60",
    "Full Gallery (10 images): £90",
  ],
  priceNotes: [
    {
      heading: "Farm entry",
      body: "Farm entry is separate and booked through The Pop Up Farm.",
    },
    { heading: "Payment", body: "Taken when you book, to hold your slot." },
    {
      heading: "Weather",
      body: "We'll be outside, so I'll keep an eye on the forecast. If it's really wet, we move to the back-up date: Saturday 17th October.",
    },
  ],
  seoTitle: "Pumpkin Patch Mini Sessions, St Albans",
  seoDescription:
    "20-minute family mini sessions at The Pop Up Farm, Sat 10 October. £60 including your favourite image, chosen from a private gallery.",
};

export const enquireContent = {
  heroEyebrow: "Say hello",
  heroHeading: "Let's chat about your session.",
  heroStandfirst:
    "You can get in touch through the form below or contact me directly. I will get back to you as soon as I can!",
  sentHeading: "That's with me.",
  sentBody:
    "I'll be in touch within two days — usually sooner. In the meantime, have a wander through the portfolio.",
  seoTitle: "Get in touch | Family Photographer, Hertfordshire",
  seoDescription:
    "Tell me about your family and what you'd love to capture. Family, maternity and newborn sessions in Hertfordshire and London.",
};

export const portfolioContent = {
  heroEyebrow: "Portfolio",
  heroHeading: "The whole range of feelings.",
  seoTitle: "Family Photography Portfolio, Hertfordshire",
  seoDescription:
    "Real, fleeting moments from family, maternity and newborn sessions in Harpenden, St Albans and across Hertfordshire. At home, in the woods and beyond.",
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
  newsletterHeading: "Occasional notes from me",
  newsletterBody:
    "New dates, offers, and the odd thing I've learned while photographing little ones.",
  newsletterPrivacyNote:
    "By submitting, you agree to be added to my mailing list. You can unsubscribe anytime.",
  footerBlurb:
    "Expressive maternity, newborn and family photographer in Hertfordshire, for families who feel it all",
  footerSeoLine:
    "Story-led family, maternity and newborn photography in St Albans, Harpenden, Wheathampstead, Redbourn, Hertfordshire, London and further afield.",
};

/** Used when Sanity has no session types yet. */
export const defaultSessionTypes = [
  {
    _id: "fallback-maternity",
    title: "Maternity",
    category: "maternity" as const,
    tagline: "The quiet before the beginning",
    description:
      "Gently led, so you can settle into it. We will find holds that feel beautiful but natural, and let the rest unfold.",
  },
  {
    _id: "fallback-newborn",
    title: "Newborn & baby",
    category: "newborn" as const,
    tagline: "Small hands, big feelings",
    description:
      "Relaxed and in-home, in your little bubble. All planned around your baby's rhythm, feeds, naps and all.",
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
  {
    _id: "fallback-alex",
    quote: "She turned the whole experience into a playful, beautiful session.",
    name: "Alex Taliadoros",
  },
];
