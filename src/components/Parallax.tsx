/**
 * A photograph layer that drifts more slowly than the page, so scrolling past a
 * section pans through more of the frame than its crop would otherwise show.
 *
 * The layer is cut taller than the section by `depth` at each end and slides
 * through that slack as the section crosses the viewport. It runs entirely on
 * CSS scroll-driven animations (see `.parallax` in globals.css): no scroll
 * listeners, nothing on the main thread, and browsers without support — or
 * readers who prefer reduced motion — simply see the still photograph.
 *
 * The parent section must be `relative overflow-hidden` and carry the
 * `parallax-frame` class, which names the timeline the layer follows.
 */
export function Parallax({
  children,
  depth = 0.15,
  hero = false,
}: {
  children: React.ReactNode;
  /** Slack at each end, as a fraction of the section's height. */
  depth?: number;
  /**
   * Heroes start at the top of the page already in view, so they drift only
   * as they leave it, from their resting crop downward.
   */
  hero?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={hero ? "parallax parallax-hero" : "parallax"}
      style={{ "--parallax-depth": depth } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
