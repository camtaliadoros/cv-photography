import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { ConsentForm } from "./ConsentForm";

/*
 * Where clients say whether, and where, their photos can be shared. Linked
 * from emails only: like the pop-up page it sits outside the (site) group,
 * isn't in the menu or sitemap, and is marked noindex.
 *
 * ?name= pre-fills the name. Email is deliberately never taken from the URL,
 * so it stays out of server logs and analytics.
 */
export const metadata: Metadata = {
  title: "Sharing your photos",
  robots: { index: false, follow: false },
};

export default async function ShareYourPhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { name } = await searchParams;
  const initialName = typeof name === "string" ? name.trim().slice(0, 120) : "";

  return (
    <main
      id="main"
      className="min-h-dvh bg-linen px-6 pt-10 pb-12 text-[17px] leading-[1.6] text-charcoal"
    >
      <div className="mx-auto w-full max-w-[32rem]">
        <Image
          src="/logo/logo-full-forest.png"
          alt={site.name}
          width={2777}
          height={619}
          sizes="180px"
          priority
          className="h-auto w-[180px]"
        />
        <ConsentForm initialName={initialName} />
      </div>
    </main>
  );
}
