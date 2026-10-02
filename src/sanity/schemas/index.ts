import siteSettings from "./siteSettings";
import homePage from "./homePage";
import aboutPage from "./aboutPage";
import sessionsPage from "./sessionsPage";
import miniSessionPage from "./miniSessionPage";
import enquirePage from "./enquirePage";
import portfolioPage from "./portfolioPage";
import sessionType from "./sessionType";
import portfolioImage from "./portfolioImage";
import testimonial from "./testimonial";
import faqItem from "./faqItem";
import journalPost from "./journalPost";

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  sessionsPage,
  miniSessionPage,
  enquirePage,
  portfolioPage,
  // Collections
  sessionType,
  portfolioImage,
  testimonial,
  faqItem,
  journalPost,
];
