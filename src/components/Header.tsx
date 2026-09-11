"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

const linkClass =
  "text-xs font-extrabold tracking-[0.18em] uppercase transition-colors";

export function Header({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The home hero is full-height, so the nav sits over it until you scroll.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparent = overHero && !scrolled;

  return (
    <header
      className={[
        "top-0 right-0 left-0 z-40 transition-colors duration-300",
        overHero ? "absolute" : "sticky",
        transparent
          ? "bg-[linear-gradient(180deg,rgba(42,53,39,.72)_0%,rgba(42,53,39,.4)_52%,rgba(42,53,39,0)_100%)] pb-14"
          : "border-b border-linen-deep bg-linen/85 backdrop-blur-lg",
      ].join(" ")}
    >
      <div className="flex flex-wrap items-center justify-between gap-6 px-(--gutter) py-5">
        <Link href="/" aria-label="Cam Velucci Photography — home">
          <Image
            src={transparent ? "/logo/logo-full-linen.png" : "/logo/logo-full-forest.png"}
            alt="Cam Velucci Photography"
            width={2775}
            height={620}
            priority
            sizes="233px"
            className="h-[52px] w-auto"
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-[clamp(12px,2vw,28px)] lg:flex"
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
                : "text-terracotta hover:text-forest"
            }`}
          >
            Enquire
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
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
          className="fixed inset-0 top-[92px] bg-linen px-(--gutter) py-10 lg:hidden"
        >
          <nav aria-label="Main" className="flex flex-col gap-6">
            {items.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-3xl text-forest"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-3xl text-forest"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/enquire"
              className="font-display w-fit border-b-[1.5px] border-terracotta pb-1.5 text-3xl text-terracotta"
            >
              Enquire
            </Link>
            <a href={`mailto:${site.email}`} className="mt-6 text-sm text-muted">
              {site.email}
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
    transparent ? "text-linen hover:text-straw" : "text-forest hover:text-terracotta",
    active && !transparent ? "text-terracotta" : "",
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
