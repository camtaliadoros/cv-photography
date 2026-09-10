import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { journalPostsQuery, miniSessionPageQuery } from "@/sanity/lib/queries";
import type { JournalPost, MiniSessionPage } from "@/sanity/lib/types";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, mini] = await Promise.all([
    sanityFetch<JournalPost[]>(journalPostsQuery, {}, ["journalPost"]),
    sanityFetch<MiniSessionPage>(miniSessionPageQuery, {}, ["miniSessionPage"]),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/portfolio`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/sessions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/enquire`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.1 },
  ];

  // Hidden sections stay out of the sitemap until they actually exist.
  if (mini?.enabled) {
    staticRoutes.push({
      url: `${site.url}/mini-sessions`,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  const journalRoutes: MetadataRoute.Sitemap = (posts ?? []).length
    ? [
        { url: `${site.url}/journal`, changeFrequency: "weekly", priority: 0.6 },
        ...(posts ?? []).map((post) => ({
          url: `${site.url}/journal/${post.slug?.current}`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
          changeFrequency: "yearly" as const,
          priority: 0.5,
        })),
      ]
    : [];

  return [...staticRoutes, ...journalRoutes];
}
