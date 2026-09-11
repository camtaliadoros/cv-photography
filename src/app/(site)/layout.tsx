import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "@/components/Banner";
import { CookieConsent } from "@/components/CookieConsent";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery, miniSessionPageQuery, journalPostsQuery } from "@/sanity/lib/queries";
import type { SiteSettings, MiniSessionPage, JournalPost } from "@/sanity/lib/types";
import { settingsContent } from "@/lib/content";
import { site } from "@/lib/site";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, mini, posts] = await Promise.all([
    sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]),
    sanityFetch<MiniSessionPage>(miniSessionPageQuery, {}, ["miniSessionPage"]),
    sanityFetch<JournalPost[]>(journalPostsQuery, {}, ["journalPost"]),
  ]);

  // Both sections stay out of the nav until there's something behind them —
  // Cam asked for them built but hidden, so publishing content reveals them.
  const showMini = mini?.enabled === true;
  const showJournal = (posts?.length ?? 0) > 0;

  const items = [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/sessions", label: "Sessions" },
    ...(showMini ? [{ href: "/mini-sessions", label: "Mini sessions" }] : []),
    ...(showJournal ? [{ href: "/journal", label: "Journal" }] : []),
    { href: site.instagramUrl, label: "Instagram", external: true },
  ];

  return (
    <>
      {settings?.bannerEnabled && settings.bannerText && (
        <Banner text={settings.bannerText} href={settings.bannerHref ?? "/mini-sessions"} />
      )}
      <Header items={items} />
      <main id="main">{children}</main>
      <Footer
        newsletterHeading={settings?.newsletterHeading ?? settingsContent.newsletterHeading}
        newsletterBody={settings?.newsletterBody ?? settingsContent.newsletterBody}
        blurb={settings?.footerBlurb ?? settingsContent.footerBlurb}
        seoLine={settings?.footerSeoLine ?? settingsContent.footerSeoLine}
      />
      <CookieConsent />
      {settings?.popupEnabled && <NewsletterPopup />}
    </>
  );
}
