"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

const linkClass =
  "text-xs font-black tracking-[0.18em] uppercase transition-colors";

/**
 * One nav for every page: a linen bar that sits under the announcement banner
 * and sticks to the top as the page scrolls. Heroes no longer run behind it.
 */
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 right-0 left-0 z-40 border-b border-linen-deep bg-[rgba(240,234,224,.93)] backdrop-blur-[8px]">
      <div className="flex flex-wrap items-center justify-between gap-6 px-(--gutter) py-3">
        <Link href="/" aria-label={`${brandName} — home`}>
          <Image
            src="/logo/logo-oneline-forest.png"
            alt={brandName}
            width={2207}
            height={481}
            priority
            sizes="156px"
            className="h-[34px] w-auto"
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-[clamp(12px,2vw,26px)] lg:flex"
        >
          {items.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} />
          ))}
          {/* Contact is the same text treatment as the rest, picked out in honey. */}
          <Link
            href="/contact"
            className={`${linkClass} text-honey-deep hover:text-forest`}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpenFor(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={`${linkClass} text-forest lg:hidden`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full h-svh bg-linen px-(--gutter) py-10 lg:hidden"
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
              href="/contact"
              className="font-display mt-2 inline-flex w-fit items-center gap-3 border-b-[1.5px] border-honey pb-1.5 text-[22px] text-forest"
            >
              Contact
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

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const className = `${linkClass} ${active ? "text-honey-deep" : "text-forest"} hover:text-honey-deep`;

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
