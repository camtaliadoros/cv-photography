import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pageOpenGraph } from "@/lib/metadata";
import { journalPostQuery, journalSlugsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { JournalPost, SanityPhoto, SiteSettings } from "@/sanity/lib/types";
import { IntrinsicPhoto, Photo } from "@/components/Photo";
import { Cta, TextLink } from "@/components/Cta";
import { PageHero, Quote } from "@/components/sections";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(journalSlugsQuery, {}, ["journalPost"]);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/journal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await sanityFetch<JournalPost>(journalPostQuery, { slug }, ["journalPost"]);
  if (!post) return {};

  return {
    title: post.title,
    description: post.seoDescription ?? post.standfirst,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      ...(await pageOpenGraph(`/journal/${slug}`, post.coverImage)),
      type: "article",
      title: post.title,
      description: post.seoDescription ?? post.standfirst,
      publishedTime: post.publishedAt,
    },
  };
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityPhoto }) => (
      <figure className="my-12 -mx-6 sm:mx-0">
        <div className="relative aspect-[3/2] overflow-hidden ">
          <Photo photo={value} sizes="(max-width: 768px) 100vw, 720px" />
        </div>
        {value.alt && (
          <figcaption className="mt-3 text-sm text-muted">{value.alt}</figcaption>
        )}
      </figure>
    ),
  },
  block: {
    normal: ({ children }) => <p className="mb-6 text-[18px] text-charcoal/85">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-honey-deep underline"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default async function JournalPostPage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const [post, settings] = await Promise.all([
    sanityFetch<JournalPost>(journalPostQuery, { slug }, ["journalPost"]),
    sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]),
  ]);
  if (!post) notFound();

  const brandName = settings?.brandName ?? site.name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.standfirst,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Cam Velucci" },
    publisher: { "@type": "Organization", name: brandName },
    mainEntityOfPage: `${site.url}/journal/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <PageHero
          eyebrow={
            <>
              {post.category}
              {post.publishedAt && (
                <>
                  {" "}
                  &middot;{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </>
              )}
            </>
          }
          heading={post.title ?? ""}
          standfirst={post.standfirst}
          headingMax="22ch"
          narrow
        />
        {post.coverImage?.asset && (
          <section className="px-(--gutter)">
            <IntrinsicPhoto
              photo={post.coverImage}
              priority
              sizes="(max-width: 1200px) 100vw, 1140px"
              className="mx-auto block h-auto max-h-[min(80vh,760px)] w-auto max-w-full"
            />
          </section>
        )}


        <div className="mx-auto max-w-[680px] px-(--gutter) pt-(--section) pb-[clamp(40px,5vw,64px)]">
          {post.body && <PortableText value={post.body} components={components} />}
          {post.pullQuote && (
            <Quote className="mt-8 text-[clamp(22px,2.6vw,32px)]">{post.pullQuote}</Quote>
          )}
        </div>

        {post.gallery && post.gallery.length > 0 && (
          <section className="px-(--gutter) pb-[clamp(56px,7vw,88px)]">
            <ul className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-4">
              {post.gallery.map((photo, i) => (
                <li key={i}>
                  <IntrinsicPhoto photo={photo} sizes="(max-width: 768px) 100vw, 380px" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <section className="px-(--gutter) pb-[clamp(72px,10vw,120px)]">
        <div className="mx-auto flex max-w-[680px] flex-wrap items-center gap-5 border-t border-linen-deep pt-[clamp(28px,4vw,44px)]">
          <TextLink href="/journal">All journal entries</TextLink>
          <Cta href="/contact">Enquire about a session</Cta>
        </div>
      </section>
    </>
  );
}
