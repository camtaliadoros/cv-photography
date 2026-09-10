import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { journalPostsQuery } from "@/sanity/lib/queries";
import type { JournalPost } from "@/sanity/lib/types";
import { journalContent } from "@/lib/content";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { PageHero } from "@/components/sections";

export const metadata: Metadata = {
  title: journalContent.seoTitle,
  description: journalContent.seoDescription,
  alternates: { canonical: "/journal" },
};

export default async function JournalPage() {
  const posts = await sanityFetch<JournalPost[]>(journalPostsQuery, {}, ["journalPost"]);

  // Built and ready, but the journal doesn't exist publicly until it has a post.
  if (!posts || posts.length === 0) notFound();

  return (
    <>
      <PageHero
        image={posts[0]?.coverImage}
        eyebrow={journalContent.heroEyebrow}
        heading={journalContent.heroHeading}
        standfirst={journalContent.heroStandfirst}
      />

      <section className="mx-auto max-w-[1200px] px-6 py-(--spacing-section) lg:px-10">
        <ul className="grid gap-12 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal as="li" key={post._id} delay={i * 90}>
              <article>
                <Link href={`/journal/${post.slug?.current}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Photo
                      photo={post.coverImage}
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="eyebrow mt-6 text-terracotta">
                    {post.category}
                    {post.publishedAt && (
                      <> &middot; {formatDate(post.publishedAt)}</>
                    )}
                  </p>
                  <h2 className="mt-3 text-2xl leading-snug">{post.title}</h2>
                  <p className="mt-3 text-sm text-charcoal/80">{post.standfirst}</p>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-forest px-6 py-(--spacing-section) text-center lg:px-10">
        <h2 className="mx-auto max-w-[22ch] text-linen text-[clamp(26px,3.2vw,42px)]">
          Whatever chapter you are in.
        </h2>
        <div className="mt-10 flex justify-center">
          <Cta href="/enquire">Enquire about a session</Cta>
        </div>
      </section>
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}
