"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export function Header({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The home hero is full-bleed, so the nav sits over it until you scroll.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Stop the page scrolling behind the open mobile menu.
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
        overHero ? "fixed" : "sticky",
        transparent
          ? "bg-gradient-to-b from-forest/70 via-forest/40 to-transparent"
          : "border-b border-linen-deep bg-linen/85 backdrop-blur-lg",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className={`font-display text-lg tracking-tight transition-colors ${
            transparent ? "text-linen" : "text-forest"
          }`}
        >
          Cam Velucci
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {items.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              transparent={transparent}
              active={pathname === item.href}
            />
          ))}
          <Link
            href="/enquire"
            className="eyebrow rounded-full bg-terracotta px-6 py-3 text-linen transition-colors hover:bg-terracotta-hover"
          >
            Enquire
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`eyebrow lg:hidden ${transparent ? "text-linen" : "text-forest"}`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[68px] bg-linen px-6 py-10 lg:hidden"
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
              className="eyebrow mt-4 inline-flex w-fit rounded-full bg-terracotta px-8 py-4 text-linen"
            >
              Enquire
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 text-sm text-muted"
            >
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
    "eyebrow transition-colors",
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
