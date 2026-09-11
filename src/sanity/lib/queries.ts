import { groq } from "next-sanity";

const PHOTO = `{ asset, alt, hotspot, "lqip": asset->metadata.lqip, "dimensions": asset->metadata.dimensions }`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  bannerEnabled, bannerText, bannerHref,
  newsletterHeading, newsletterBody, popupEnabled,
  footerBlurb, footerSeoLine
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroImage${PHOTO}, heroHeading, heroSubline,
  introEyebrow, introHeading, introBody,
  introImage${PHOTO}, introImageSecondary${PHOTO},
  approachHeading, approachBody, approachPullQuote, approachImage${PHOTO},
  closingHeading, closingBody, closingImage${PHOTO},
  seoTitle, seoDescription
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heroImage${PHOTO}, heroEyebrow, heroHeading,
  story, storyPullQuote, gallery[]${PHOTO},
  approachHeading, approachColumns, approachPullQuote,
  seoTitle, seoDescription
}`;

export const sessionsPageQuery = groq`*[_type == "sessionsPage"][0]{
  heroImage${PHOTO}, heroEyebrow, heroHeading, heroStandfirst, introBody,
  approachHeading, approachBody, approachPullQuote, testimonialImage${PHOTO},
  priceHeading, priceStandard, priceIntro, priceIntroLabel, priceIntroNote,
  priceIncludes, priceNotes,
  seoTitle, seoDescription
}`;

export const miniSessionPageQuery = groq`*[_type == "miniSessionPage"][0]{
  enabled,
  heroImage${PHOTO}, heroEyebrow, heroHeading, heroStandfirst, bookingUrl,
  introHeading, introBody, gallery[]${PHOTO},
  detailsHeading, details,
  price, priceLabel, priceIncludes, priceAddOns, priceNotes,
  seoTitle, seoDescription
}`;

export const sessionTypesQuery = groq`*[_type == "sessionType"] | order(order asc){
  _id, title, category, tagline, description, image${PHOTO}, order
}`;

export const portfolioImagesQuery = groq`*[_type == "portfolioImage"] | order(order asc){
  _id, image${PHOTO}, category, featured, order
}`;

export const featuredImagesQuery = groq`*[_type == "portfolioImage" && featured == true] | order(order asc){
  _id, image${PHOTO}, category, order
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id, quote, name
}`;

export const faqsQuery = groq`*[_type == "faqItem"] | order(order asc){
  _id, question, answer
}`;

export const journalPostsQuery = groq`*[_type == "journalPost"] | order(publishedAt desc){
  _id, title, slug, category, publishedAt, standfirst, coverImage${PHOTO}
}`;

export const journalPostQuery = groq`*[_type == "journalPost" && slug.current == $slug][0]{
  _id, title, slug, category, publishedAt, standfirst, coverImage${PHOTO},
  body, pullQuote, gallery[]${PHOTO}, seoDescription
}`;

export const journalSlugsQuery = groq`*[_type == "journalPost" && defined(slug.current)].slug.current`;

export const enquirePageQuery = groq`*[_type == "enquirePage"][0]{
  heroImage${PHOTO}, asideImage${PHOTO}
}`;
