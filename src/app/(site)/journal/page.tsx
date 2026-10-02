import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { journalPostsQuery } from "@/sanity/lib/queries";
import type { JournalPost } from "@/sanity/lib/types";
import { journalContent } from "@/lib/content";
import { IntrinsicPhoto } from "@/components/Photo";
import { Label, PageHero } from "@/components/sections";

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
        images={posts.slice(0, 3).map((post) => post.coverImage)}
        eyebrow={journalContent.heroEyebrow}
        heading={journalContent.heroHeading}
        standfirst={journalContent.heroStandfirst}
        headingMax="16ch"
      />

      <section className="px-(--gutter) pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,10vw,120px)]">
        <ul className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(24px,3vw,44px)]">
          {posts.map((post) => (
            <li key={post._id}>
              <article>
                <Link href={`/journal/${post.slug?.current}`} className="group block">
                  <IntrinsicPhoto
                    photo={post.coverImage}
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="h-auto w-full transition-opacity duration-[240ms] group-hover:opacity-[.92]"
                  />
                  <Label className="mt-5">
                    {post.category}
                    {post.publishedAt && <> &middot; {formatDate(post.publishedAt)}</>}
                  </Label>
                  <h2 className="mt-2.5 text-2xl leading-[1.25]">{post.title}</h2>
                  <p className="mt-2.5 text-base text-muted">{post.standfirst}</p>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
