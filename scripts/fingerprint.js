/**
 * Extracts a structural fingerprint from a rendered page.
 *
 * Runs in the browser against both the design prototype and the built site, so
 * the two can be diffed without anyone eyeballing screenshots. Deliberately
 * records *computed* values — what actually painted — rather than markup, since
 * the two are built completely differently and only the result should match.
 */
window.__fingerprint = function fingerprint() {
  const px = (v) => (v && v !== "0px" ? v : null);
  const rgb = (v) => (v && v !== "rgba(0, 0, 0, 0)" ? v : null);

  // Only the page body — chrome is compared separately.
  const root = document.querySelector("main") || document.body;

  const sections = [...root.querySelectorAll("section")]
    .filter((s) => s.offsetHeight > 40)
    .map((s) => {
      const cs = getComputedStyle(s);
      const inner = s.firstElementChild ? getComputedStyle(s.firstElementChild) : null;
      return {
        bg: rgb(cs.backgroundColor),
        bgImage: cs.backgroundImage !== "none" ? "yes" : null,
        padY: px(cs.paddingTop) || px(inner?.paddingTop),
        padX: px(cs.paddingLeft) || px(inner?.paddingLeft),
        minH: px(cs.minHeight),
        innerMaxW: px(inner?.maxWidth),
        cols: inner?.gridTemplateColumns?.split(" ").length || null,
      };
    });

  const headings = [...root.querySelectorAll("h1,h2,h3")].map((h) => {
    const cs = getComputedStyle(h);
    return {
      tag: h.tagName,
      text: h.textContent.trim().slice(0, 28),
      size: Math.round(parseFloat(cs.fontSize)),
      family: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
      weight: cs.fontWeight,
      colour: cs.color,
      maxW: px(cs.maxWidth),
    };
  });

  // Underlined text links — the treatment that has drifted most.
  const links = [...root.querySelectorAll("a,span,button")]
    .filter((e) => parseFloat(getComputedStyle(e).borderBottomWidth) > 1)
    .map((e) => {
      const cs = getComputedStyle(e);
      return {
        text: e.textContent.replace(/[→\s]+$/, "").trim().slice(0, 26),
        size: Math.round(parseFloat(cs.fontSize)),
        rule: cs.borderBottomColor,
        colour: cs.color,
        arrow: /→/.test(e.textContent),
      };
    });

  const labels = [...root.querySelectorAll("p,span,dt,cite,h3")]
    .filter((e) => getComputedStyle(e).textTransform === "uppercase" && e.textContent.trim())
    .map((e) => {
      const cs = getComputedStyle(e);
      return {
        text: e.textContent.trim().slice(0, 24),
        size: Math.round(parseFloat(cs.fontSize)),
        colour: cs.color,
        tracking: cs.letterSpacing,
        weight: cs.fontWeight,
        // The short rule that precedes most eyebrows.
        hasRule: !!e.parentElement?.querySelector('span[aria-hidden], span[style*="currentColor"]'),
      };
    });

  const images = [...root.querySelectorAll("img")].map((i) => {
    const cs = getComputedStyle(i);
    return { radius: cs.borderRadius, fit: cs.objectFit };
  });

  const quotes = [...root.querySelectorAll("blockquote, p")]
    .filter((e) => getComputedStyle(e).fontStyle === "italic" && e.textContent.trim())
    .map((e) => {
      const cs = getComputedStyle(e);
      return {
        size: Math.round(parseFloat(cs.fontSize)),
        family: cs.fontFamily.split(",")[0].replace(/["']/g, ""),
        maxW: px(cs.maxWidth),
        colour: cs.color,
      };
    });

  return { sections, headings, links, labels, images, quotes };
};
