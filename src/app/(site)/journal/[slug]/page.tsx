import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { journalPostQuery, journalSlugsQuery } from "@/sanity/lib/queries";
import type { JournalPost, SanityPhoto } from "@/sanity/lib/types";
import { Photo } from "@/components/Photo";
import { Cta } from "@/components/Cta";
import { Eyebrow, PullQuote } from "@/components/sections";
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
    normal: ({ children }) => <p className="mb-6 text-charcoal/85">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-terracotta underline"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default async function JournalPostPage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = await sanityFetch<JournalPost>(journalPostQuery, { slug }, ["journalPost"]);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription ?? post.standfirst,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Cam Velucci" },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/journal/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="relative flex min-h-[62vh] items-end overflow-hidden bg-forest">
          {post.coverImage?.asset && (
            <Photo photo={post.coverImage} sizes="100vw" priority alt="" />
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/55 to-forest/20"
          />
          <div className="relative mx-auto w-full max-w-[1200px] px-(--gutter) pt-40 pb-20">
            <Eyebrow tone="straw">
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
            </Eyebrow>
            <h1 className="mt-6 max-w-[22ch] text-linen text-[clamp(30px,4.2vw,54px)]">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-[720px] px-(--gutter) py-(--section)">
          {post.standfirst && (
            <p className="mb-10 text-xl text-charcoal/85">{post.standfirst}</p>
          )}

          {post.body && <PortableText value={post.body} components={components} />}

          {post.pullQuote && (
            <div className="my-14 border-l-2 border-straw pl-6">
              <PullQuote>{post.pullQuote}</PullQuote>
            </div>
          )}
        </div>

        {post.gallery && post.gallery.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-(--gutter) pb-(--section)">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {post.gallery.map((photo, i) => (
                <li key={i}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Photo photo={photo} sizes="(max-width: 768px) 50vw, 380px" />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <section className="bg-forest px-(--gutter) py-(--section) text-center">
        <Link href="/journal" className="text-xs font-extrabold tracking-[0.18em] text-straw uppercase hover:text-linen">
          All journal entries
        </Link>
        <h2 className="mx-auto mt-8 max-w-[22ch] text-linen text-[clamp(26px,3.2vw,42px)]">
          Whatever chapter you are in.
        </h2>
        <div className="mt-10 flex justify-center">
          <Cta href="/enquire" tone="onDark">Enquire about a session</Cta>
        </div>
      </section>
    </>
  );
}
