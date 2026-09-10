import type { PortableTextBlock } from "@portabletext/types";
import type { MaybeRichText } from "@/lib/text";

export interface SanityPhoto {
  asset?: { _ref: string; _type: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  /** Base64 preview from Sanity's asset metadata — used as the blur placeholder. */
  lqip?: string;
  dimensions?: { width: number; height: number; aspectRatio: number };
}

export interface Prose {
  heading?: string;
  body?: MaybeRichText;
}

export interface LabelledValue {
  label?: string;
  value?: string;
}

export interface SiteSettings {
  bannerEnabled?: boolean;
  bannerText?: string;
  bannerHref?: string;
  newsletterHeading?: string;
  newsletterBody?: string;
  popupEnabled?: boolean;
  footerBlurb?: string;
  footerSeoLine?: string;
}

export interface HomePage {
  heroImage?: SanityPhoto;
  heroHeading?: string;
  heroSubline?: string;
  introEyebrow?: string;
  introHeading?: string;
  introBody?: string[];
  introImage?: SanityPhoto;
  approachHeading?: string;
  approachBody?: string[];
  approachPullQuote?: string;
  approachImage?: SanityPhoto;
  closingHeading?: string;
  closingBody?: string;
  closingImage?: SanityPhoto;
  seoTitle?: string;
  seoDescription?: string;
}

export interface AboutPage {
  heroImage?: SanityPhoto;
  heroEyebrow?: string;
  heroHeading?: string;
  story?: string[];
  storyPullQuote?: string;
  portrait?: SanityPhoto;
  approachHeading?: string;
  approachColumns?: Prose[];
  approachPullQuote?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SessionsPage {
  heroImage?: SanityPhoto;
  heroEyebrow?: string;
  heroHeading?: string;
  heroStandfirst?: string;
  introBody?: string;
  approachHeading?: string;
  approachBody?: string[];
  approachPullQuote?: string;
  approachImage?: SanityPhoto;
  priceHeading?: string;
  priceStandard?: string;
  priceIntro?: string;
  priceIntroLabel?: string;
  priceIntroNote?: string;
  priceIncludes?: string[];
  priceNotes?: Prose[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface MiniSessionPage {
  enabled?: boolean;
  heroImage?: SanityPhoto;
  heroEyebrow?: string;
  heroHeading?: string;
  heroStandfirst?: string;
  bookingUrl?: string;
  introHeading?: string;
  introBody?: string[];
  gallery?: SanityPhoto[];
  detailsHeading?: string;
  details?: LabelledValue[];
  price?: string;
  priceLabel?: string;
  priceIncludes?: string[];
  priceAddOns?: string[];
  priceNotes?: Prose[];
  seoTitle?: string;
  seoDescription?: string;
}

export type SessionCategory = "maternity" | "newborn" | "families";

export interface SessionType {
  _id: string;
  title?: string;
  category?: SessionCategory;
  tagline?: string;
  description?: string;
  image?: SanityPhoto;
  order?: number;
}

export interface PortfolioImage {
  _id: string;
  image?: SanityPhoto;
  category?: SessionCategory;
  featured?: boolean;
  order?: number;
}

export interface Testimonial {
  _id: string;
  quote?: string;
  name?: string;
}

export interface FaqItem {
  _id: string;
  question?: string;
  answer?: MaybeRichText;
}

export interface JournalPost {
  _id: string;
  title?: string;
  slug?: { current: string };
  category?: string;
  publishedAt?: string;
  standfirst?: string;
  coverImage?: SanityPhoto;
  body?: PortableTextBlock[];
  pullQuote?: string;
  gallery?: SanityPhoto[];
  seoDescription?: string;
}
