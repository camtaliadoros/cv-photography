/**
 * Populates a dataset with the approved design copy, so the Studio opens with
 * real content to edit rather than empty fields.
 *
 * Safe to re-run: singletons are createOrReplace'd at fixed IDs, and
 * collections are only created if that type is empty.
 *
 *   node scripts/seed.mjs [--target production-v2]
 */

import { readFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const args = process.argv.slice(2);
const TARGET = args.includes("--target") ? args[args.indexOf("--target") + 1] : "production-v2";

const API = `https://${PROJECT}.api.sanity.io/v2024-01-01`;
const auth = { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" };

const SESSION_TYPES = [
  {
    _id: "sessionType-maternity",
    title: "Maternity",
    category: "maternity",
    tagline: "The quiet before the beginning",
    description:
      "Gently led, so you can settle into it. We'll find holds that feel beautiful but natural, and let the rest unfold.",
    order: 0,
  },
  {
    _id: "sessionType-newborn",
    title: "Newborn & baby",
    category: "newborn",
    tagline: "Small hands, big feelings",
    description:
      "Relaxed and in-home, in your little bubble. Three hours, planned around your baby's rhythm — feeds, naps and all.",
    order: 1,
  },
  {
    _id: "sessionType-families",
    title: "Families",
    category: "families",
    tagline: "Everyone in the frame",
    description:
      "Two hours together, at home or a location you love. Toddlers, big kids and all the mischief included.",
    order: 2,
  },
];

const FAQS = [
  {
    question: "I hate having my photo taken — will this work for me?",
    answer:
      "That's exactly who this is for. I won't direct your every move, but I'll never leave you wondering what to do with your hands. Most of the session is you being with each other, and me noticing it.",
  },
  {
    question: "What if my toddler won't cooperate?",
    answer:
      "Then we have a session full of real toddler, which is usually the best kind. The mischief and the meltdowns are part of the story — I'm not trying to photograph around them.",
  },
  {
    question: "What if it rains, or someone's poorly?",
    answer:
      "No stress at all. We simply find a new date. Life with a family is unpredictable, and I plan around that, not against it.",
  },
  {
    question: "What should we wear?",
    answer:
      "Whatever you're comfortable in. Soft, warm tones photograph beautifully, but don't buy anything new — I'd far rather you looked like yourselves.",
  },
  {
    question: "Do I need to tidy the house before an in-home session?",
    answer:
      "A lived-in home is exactly what makes these photos feel like you. Just clear a little space to move around in, and tuck away anything that adds mess rather than character.",
  },
  {
    question: "Where do sessions take place?",
    answer:
      "At home, in the woods, or wherever your family feels most yourselves. Hertfordshire and London are home ground — I'm always happy to travel further, and a travel fee applies.",
  },
  {
    question: "Can I see a full gallery, not just the highlights?",
    answer:
      "Of course. Just ask, and I'll share a full set from a real session so you can see exactly what to expect.",
  },
  {
    question: "Do we get the raw, unedited images?",
    answer:
      "No. Every image you receive has been through my own hand-editing process, so you get a consistent, polished set.",
  },
  {
    question: "How long until I see my photos?",
    answer:
      "Your private online gallery arrives within two weeks, with your favourite five images hand-edited and ready to download.",
  },
  {
    question: "How do I book?",
    answer:
      "Send me an enquiry and I'll reply within two days. A non-refundable £50 booking fee secures your date and comes off your balance, with the rest due a week before your session.",
  },
  {
    question: "Newborn: how soon after birth should we book?",
    answer:
      "These are relaxed, lifestyle sessions rather than posed studio ones, so there is a lot more flexibility, but up to 4 weeks old is ideal. Book before your little one arrives and I will save you a space against your due date.",
  },
  {
    question: "Newborn: do you come to us?",
    answer:
      "Yes. Newborn sessions usually work best in-home, in your little bubble of love.",
  },
  {
    question: "Newborn: what if the baby won't settle?",
    answer:
      "Completely normal, and I plan the whole session around your baby's rhythm, not the other way round.",
  },
];

const SINGLETONS = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: "Cam Velucci Photography",
    locationText: "Hertfordshire",
    bannerEnabled: false,
    bannerText: "Pumpkin patch mini sessions — Saturday 10th October, now booking",
    bannerHref: "/mini-sessions",
    newsletterHeading: "Mini session dates, before anyone else.",
    newsletterBody:
      "Occasional notes from me — new dates, offers, and the odd thing I've learned while photographing little ones.",
    newsletterPrivacyNote:
      "By submitting you agree to be added to my mailing list. You can unsubscribe anytime.",
    popupEnabled: false,
    contactEmail: "hello@camvelucci.com",
    instagramHandle: "camvelucciphotography",
    instagramUrl: "https://instagram.com/camvelucciphotography",
    footerBlurb:
      "Maternity, newborn and family photographer in Hertfordshire, for families who feel it all — the chaos and the giggles included.",
    footerSeoLine:
      "Story-led family and motherhood photography in St Albans, Harpenden, Hitchin, Welwyn Garden City, Hertford, London and further afield.",
  },
  {
    _id: "miniSessionPage",
    _type: "miniSessionPage",
    enabled: false,
    heroEyebrow: "Mini sessions",
    heroHeading: "Pumpkin patch mini sessions",
    heroStandfirst: "The Pop Up Farm, Flamstead · Saturday 10th October",
    bookingUrl: "https://camvelucciphotography.pixieset.com/booking/pumpkin-festival-minis",
    introHeading: "Come have some fun at the Pumpkin & Squash Festival with me.",
    introBody: [
      "I'm setting up at The Pop Up Farm for mini sessions: just you, your little gang and a whole lot of pumpkins.",
      "I'll gently guide you where I need to, then let little ones do their thing — hunting down the biggest pumpkin they can carry, running through the giant straw maze — while I catch the real, giggly moments in between.",
    ],
    detailsHeading: "The details",
    details: [
      { _key: "d1", label: "When", value: "Saturday 10th October — slots from 9:30am" },
      { _key: "d2", label: "Where", value: "The Pop Up Farm, Flamstead — just off the M1, J9" },
      { _key: "d3", label: "How long", value: "20 minutes" },
      {
        _key: "d4",
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
        _key: "n1",
        heading: "Farm entry",
        body: "The £60 covers your session and one image. Farm entry is separate, booked through The Pop Up Farm.",
      },
      { _key: "n2", heading: "Payment", body: "Taken when you book, to hold your slot." },
      {
        _key: "n3",
        heading: "Weather",
        body: "We'll be outside, so I'll keep half an eye on the forecast. If it's really wet, we move to the back-up date: Saturday 17th October.",
      },
    ],
  },
];

async function query(groq) {
  const res = await fetch(`${API}/data/query/${TARGET}?query=${encodeURIComponent(groq)}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const { result } = await res.json();
  return result;
}

async function mutate(mutations, label) {
  if (!mutations.length) return;
  const res = await fetch(`${API}/data/mutate/${TARGET}`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) {
    console.error(`  ! ${label} failed:`, JSON.stringify(await res.json(), null, 2));
    return;
  }
  console.log(`  ✓ ${label} (${mutations.length})`);
}

async function main() {
  console.log(`Seeding "${TARGET}"…\n`);

  await mutate(
    SINGLETONS.map((doc) => ({ createOrReplace: doc })),
    "singletons",
  );

  const existingTypes = await query('count(*[_type=="sessionType"])');
  if (existingTypes === 0) {
    await mutate(
      SESSION_TYPES.map((doc) => ({ create: { _type: "sessionType", ...doc } })),
      "session types",
    );
  } else {
    console.log(`  – session types already present (${existingTypes}), left alone`);
  }

  const existingFaqs = await query('count(*[_type=="faqItem"])');
  if (existingFaqs === 0) {
    await mutate(
      FAQS.map((faq, i) => ({ create: { _type: "faqItem", ...faq, order: i } })),
      "FAQs",
    );
  } else {
    console.log(`  – FAQs already present (${existingFaqs}), left alone`);
  }

  const existingTestimonials = await query('count(*[_type=="testimonial"])');
  if (existingTestimonials === 0) {
    await mutate(
      [
        {
          create: {
            _type: "testimonial",
            quote:
              "Cam made my son feel completely at ease which ensured the pictures were natural.",
            name: "Tove Moulton",
            order: 0,
          },
        },
      ],
      "testimonials",
    );
  } else {
    console.log(`  – testimonials already present (${existingTestimonials}), left alone`);
  }

  console.log(
    "\nDone. Page singletons (home, about, sessions) are intentionally left empty —",
    "\nthe site falls back to the approved design copy until you add photographs.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
