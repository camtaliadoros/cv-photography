import type { Metadata } from "next";
import Image from "next/image";
import { popupEventName } from "@/lib/popup-events";
import { site } from "@/lib/site";
import { PopupForm } from "./PopupForm";

/*
 * The sign-up sheet parents fill in on a phone or tablet at a pop-up event.
 * It sits outside the (site) group on purpose: no header, footer or
 * newsletter popup to wander off into while they wait. It's shared by link
 * (or QR code) only — not in the menu or sitemap, and marked noindex.
 */
export const metadata: Metadata = {
  title: "Your mini portrait",
  robots: { index: false, follow: false },
};

export default async function PopupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { event } = await searchParams;
  // An unknown or missing slug still takes sign-ups, just untagged — better
  // than a dead page in front of a queue of parents.
  const slug = popupEventName(event) ? (event as string) : undefined;

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
        <PopupForm event={slug} />
      </div>
    </main>
  );
}
