"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BANNER_CHANGE_EVENT } from "./Banner";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

const linkClass =
  "text-xs font-black tracking-[0.18em] uppercase transition-colors";

export function Header({
  items,
  brandName,
  email,
}: {
  items: NavItem[];
  brandName: string;
  email: string;
}) {
  const pathname = usePathname();
  // Held against a path, so following a link closes the menu with no effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const [scrolled, setScrolled] = useState(false);
  const [top, setTop] = useState(0);

  // Every page but the privacy policy opens on a dark hero, so the nav can ride
  // over the photograph and only go solid once you've scrolled past it.
  const overHero = pathname !== "/privacy";
  const isHome = pathname === "/";

  useEffect(() => {
    // The announcement banner scrolls away; while it's still on screen the
    // fixed header rides below it, then pins to the top once it's gone. It's
    // measured on every pass, because the banner only mounts after hydration,
    // can be dismissed, and rewraps as the viewport changes.
    const onScroll = () => {
      const y = window.scrollY;
      const bannerHeight =
        document.querySelector<HTMLElement>("[data-announcement]")?.offsetHeight ?? 0;
      setScrolled(y > 40);
      if (overHero) {
        setTop((current) => {
          const next = Math.max(0, bannerHeight - y);
          return next === current ? current : next;
        });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener(BANNER_CHANGE_EVENT, onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener(BANNER_CHANGE_EVENT, onScroll);
    };
  }, [overHero]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparent = overHero && !scrolled;

  return (
    <header
      style={overHero ? { top } : undefined}
      className={[
        "right-0 left-0 z-40 transition-colors duration-300",
        // Fixed so the nav stays with you while the hero scrolls past beneath.
        overHero ? "fixed" : "sticky top-0",
        transparent
          ? isHome
            ? "bg-[linear-gradient(180deg,rgba(42,53,39,.72)_0%,rgba(42,53,39,.4)_52%,rgba(42,53,39,0)_100%)] pb-14"
            : "bg-[linear-gradient(180deg,rgba(42,53,39,.82)_0%,rgba(42,53,39,.62)_46%,rgba(42,53,39,.22)_80%,rgba(42,53,39,0)_100%)] pb-16"
          : "border-b border-linen-deep bg-linen/85 backdrop-blur-lg",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center justify-between gap-6 px-(--gutter) py-5">
        <Link href="/" aria-label={`${brandName} — home`}>
          <Image
            src={transparent ? "/logo/logo-full-linen.png" : "/logo/logo-full-forest.png"}
            alt={brandName}
            width={2775}
            height={620}
            priority
            sizes="233px"
            className={isHome ? "h-[52px] w-auto" : "h-[42px] w-auto"}
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-[clamp(12px,2vw,26px)] lg:flex"
        >
          {items.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              transparent={transparent}
              active={pathname === item.href}
            />
          ))}
          {/* Enquire is the same text treatment as the rest, picked out in straw gold. */}
          <Link
            href="/enquire"
            className={`${linkClass} ${
              transparent
                ? "text-straw hover:text-linen"
                : "text-honey-deep hover:text-forest"
            }`}
          >
            Enquire
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpenFor(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`${linkClass} lg:hidden ${transparent ? "text-linen" : "text-forest"}`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className={`fixed inset-0 ${isHome ? "top-[92px]" : "top-[82px]"} bg-linen px-(--gutter) py-10 lg:hidden`}
        >
          <nav aria-label="Main" className="flex flex-col gap-6">
            {items.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-black tracking-[0.18em] text-forest uppercase"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-black tracking-[0.18em] text-forest uppercase"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/enquire"
              className="font-display mt-2 inline-flex w-fit items-center gap-3 border-b-[1.5px] border-honey pb-1.5 text-[22px] text-forest"
            >
              Enquire
              <span aria-hidden className="font-sans text-[15px] leading-none font-black">
                &rarr;
              </span>
            </Link>
            <a href={`mailto:${email}`} className="mt-6 text-sm text-muted">
              {email}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  item,
  transparent,
  active,
}: {
  item: NavItem;
  transparent: boolean;
  active: boolean;
}) {
  const className = [
    linkClass,
    transparent ? "text-linen hover:text-straw" : "text-forest hover:text-honey-deep",
    active && !transparent ? "text-honey-deep" : "",
  ].join(" ");

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}
