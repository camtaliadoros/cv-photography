/* @ds-bundle: {"format":4,"namespace":"CamVelucciPhotographyDesignSystem_b97b53","components":[{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"QuoteCard","sourcePath":"components/content/QuoteCard.jsx"},{"name":"SectionLabel","sourcePath":"components/content/SectionLabel.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"components/content/Card.jsx":"fb036a1e3332","components/content/QuoteCard.jsx":"abfd5dcbeaca","components/content/SectionLabel.jsx":"74fdcecffd85","components/core/Button.jsx":"d6999171cd61","components/core/Divider.jsx":"69cd640b762b","components/core/Tag.jsx":"88dbfe4e07e2","components/forms/Checkbox.jsx":"f3872cfb3da5","components/forms/Input.jsx":"c119f1aa18f2","components/forms/Select.jsx":"f15b7068b57d","components/forms/Textarea.jsx":"b19f85c35253","ui_kits/website/AboutScreen.jsx":"35d4b9610d63","ui_kits/website/EnquireScreen.jsx":"dea64b1fa037","ui_kits/website/Footer.jsx":"3e3d899ae028","ui_kits/website/HomeScreen.jsx":"8eff8eed5044","ui_kits/website/Icon.jsx":"2b89a73f7f73","ui_kits/website/Nav.jsx":"3c90176c6f4c","ui_kits/website/PortfolioScreen.jsx":"785d378819ac"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CamVelucciPhotographyDesignSystem_b97b53 = window.CamVelucciPhotographyDesignSystem_b97b53 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — Card
 * Portfolio / content card. Soft linen surface, gentle radius, low warm shadow.
 * `image` renders a top media area (children become the body); an optional
 * `tag`/`title`/`meta`. Lifts gently on hover.
 */
function Card({
  image,
  imageAlt = '',
  tag,
  title,
  meta,
  children,
  href,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      textDecoration: 'none',
      color: 'var(--text-body)',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover && (href || onClick) ? 'translateY(-3px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)',
      cursor: href || onClick ? 'pointer' : 'default',
      ...style
    }
  }, rest), image && /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4 / 3',
      overflow: 'hidden',
      background: 'var(--linen-deep)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transform: hover ? 'scale(1.04)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)'
    }
  }, tag && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--terracotta)',
      marginBottom: 8
    }
  }, tag), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 20,
      color: 'var(--forest)',
      lineHeight: 1.25
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 15,
      lineHeight: 1.65,
      marginTop: title ? 8 : 0
    }
  }, children), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 12,
      letterSpacing: '0.02em'
    }
  }, meta)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/QuoteCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — QuoteCard
 * Forest quote card with Cormorant Garamond italic testimonial and a Straw Gold
 * attribution — the social/testimonial treatment from the brand guidelines.
 */
function QuoteCard({
  quote,
  author,
  detail,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      background: 'var(--forest)',
      color: 'var(--warm-linen)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-7) var(--space-6)',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-quote)',
      fontStyle: 'italic',
      fontSize: 56,
      lineHeight: 0.6,
      color: 'var(--straw-gold)',
      height: 30
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-quote)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 26,
      lineHeight: 1.35,
      color: 'var(--warm-linen)'
    }
  }, quote), (author || detail) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 'var(--space-5)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--straw-gold)'
    }
  }, author, detail && /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.7
    }
  }, " \xB7 ", detail)));
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — SectionLabel
 * The tracked-caps eyebrow that sits above headings. Terracotta by default;
 * pair with a short flourish tick. Plus Jakarta Sans Medium.
 */
function SectionLabel({
  tone = 'terracotta',
  tick = true,
  children,
  style,
  ...rest
}) {
  const color = {
    terracotta: 'var(--terracotta)',
    moss: 'var(--moss)',
    gold: 'var(--straw-gold)',
    linen: 'var(--straw-gold)'
  }[tone] || 'var(--terracotta)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      color,
      ...style
    }
  }, rest), tick && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1.5,
      background: 'currentColor'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 13,
      letterSpacing: '0.18em',
      textTransform: 'uppercase'
    }
  }, children));
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — Button
 * Terracotta primary (the CTA colour), Moss secondary, Forest solid, and quiet ghost/link.
 * Pill-shaped, tracked-caps label in Plus Jakarta Sans Medium.
 */
function Button({
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '9px 18px',
      fontSize: 12,
      ls: '0.14em'
    },
    md: {
      padding: '13px 28px',
      fontSize: 13,
      ls: '0.16em'
    },
    lg: {
      padding: '17px 38px',
      fontSize: 14,
      ls: '0.16em'
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--terracotta)',
      color: 'var(--warm-linen)',
      border: '1.5px solid transparent'
    },
    secondary: {
      background: 'var(--moss)',
      color: 'var(--warm-linen)',
      border: '1.5px solid transparent'
    },
    forest: {
      background: 'var(--forest)',
      color: 'var(--warm-linen)',
      border: '1.5px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--forest)',
      border: '1.5px solid var(--forest)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--forest)',
      border: '1.5px solid transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const hoverBg = {
    primary: 'var(--terracotta-hover)',
    secondary: 'var(--moss-hover)',
    forest: 'var(--forest-hover)',
    outline: 'var(--forest)',
    ghost: 'var(--linen-deep)'
  }[variant];
  const hoverColor = variant === 'outline' ? 'var(--warm-linen)' : v.color;
  const style = {
    display: fullWidth ? 'flex' : 'inline-flex',
    appearance: 'none',
    WebkitAppearance: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    fontSize: s.fontSize,
    letterSpacing: s.ls,
    textTransform: 'uppercase',
    padding: s.padding,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    transition: 'background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
    transform: hover && !disabled ? 'translateY(-1px)' : 'none',
    ...v,
    ...(hover && !disabled ? {
      background: hoverBg,
      borderColor: hoverBg === 'var(--linen-deep)' ? 'transparent' : hoverBg,
      color: hoverColor
    } : {})
  };
  const Tag = href && !disabled ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href && !disabled ? href : undefined,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — Divider
 * A thin rule; Straw Gold softens dividers. `flourish` centres a small
 * wave/mountain mark echoing the logo line, quietly present rather than illustrative.
 */
function Divider({
  flourish = false,
  color = 'var(--straw-gold)',
  style,
  ...rest
}) {
  if (flourish) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        color,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 1,
        background: 'currentColor',
        opacity: 0.5
      }
    }), /*#__PURE__*/React.createElement("svg", {
      width: "40",
      height: "12",
      viewBox: "0 0 40 12",
      fill: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1 8 C 8 8, 12 2, 20 2 C 28 2, 32 8, 39 8",
      stroke: "currentColor",
      strokeWidth: "1.4",
      strokeLinecap: "round"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 1,
        background: 'currentColor',
        opacity: 0.5
      }
    }));
  }
  return /*#__PURE__*/React.createElement("hr", _extends({
    style: {
      border: 0,
      height: 1,
      background: color,
      opacity: 0.7,
      margin: 0,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — Tag / Pill
 * Small tracked-caps pill for categories (Family, Motherhood, Newborn).
 * Moss is the default fill for tags & icon fills on Warm Linen.
 */
function Tag({
  tone = 'moss',
  children,
  ...rest
}) {
  const tones = {
    moss: {
      background: 'color-mix(in srgb, var(--moss) 14%, transparent)',
      color: 'var(--moss)',
      border: '1px solid color-mix(in srgb, var(--moss) 28%, transparent)'
    },
    forest: {
      background: 'color-mix(in srgb, var(--forest) 10%, transparent)',
      color: 'var(--forest)',
      border: '1px solid color-mix(in srgb, var(--forest) 24%, transparent)'
    },
    terracotta: {
      background: 'color-mix(in srgb, var(--terracotta) 14%, transparent)',
      color: 'var(--terracotta)',
      border: '1px solid color-mix(in srgb, var(--terracotta) 30%, transparent)'
    },
    onDark: {
      background: 'color-mix(in srgb, var(--straw-gold) 20%, transparent)',
      color: 'var(--straw-gold)',
      border: '1px solid color-mix(in srgb, var(--straw-gold) 40%, transparent)'
    }
  };
  const t = tones[tone] || tones.moss;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      ...t
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — Checkbox
 * Consent / preference checkbox. Moss fill when checked, tracked serif label.
 */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  id,
  style,
  ...rest
}) {
  const fid = id || (label ? `cb-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 10,
      cursor: 'pointer',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: "checkbox",
    checked: on,
    onChange: e => {
      if (!isControlled) setInternal(e.target.checked);
      onChange && onChange(e);
    },
    style: {
      position: 'absolute',
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 20,
      height: 20,
      marginTop: 1,
      borderRadius: 'var(--radius-xs)',
      border: `1.5px solid ${on ? 'var(--moss)' : 'var(--border-strong)'}`,
      background: on ? 'var(--moss)' : 'var(--surface-raised)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)'
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2l2.3 2.3L9.5 3.5",
    stroke: "var(--warm-linen)",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--charcoal)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — Input
 * Text field for enquiry/contact forms. Warm Linen surface, hairline border,
 * Terracotta focus ring. Label in tracked caps, serif-free.
 */
function Input({
  label,
  hint,
  error,
  id,
  type = 'text',
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--forest)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 16,
      color: 'var(--charcoal)',
      background: 'var(--surface-raised)',
      padding: '12px 14px',
      borderRadius: 'var(--radius-sm)',
      border: `1.5px solid ${error ? 'var(--terracotta)' : focus ? 'var(--moss)' : 'var(--border-subtle)'}`,
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      outline: 'none',
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: error ? 'var(--terracotta)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — Select
 * Session-type dropdown. Matches Input styling with a chevron affordance.
 */
function Select({
  label,
  hint,
  id,
  children,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || (label ? `sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--forest)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      appearance: 'none',
      WebkitAppearance: 'none',
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 16,
      color: 'var(--charcoal)',
      background: 'var(--surface-raised)',
      padding: '12px 40px 12px 14px',
      borderRadius: 'var(--radius-sm)',
      border: `1.5px solid ${focus ? 'var(--moss)' : 'var(--border-subtle)'}`,
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      outline: 'none',
      cursor: 'pointer',
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, rest), children), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 5l4 4 4-4",
    stroke: "var(--forest)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cam Velucci Photography — Textarea
 * Multi-line field for enquiry messages. Matches Input styling.
 */
function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || (label ? `ta-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--forest)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 16,
      color: 'var(--charcoal)',
      background: 'var(--surface-raised)',
      padding: '12px 14px',
      borderRadius: 'var(--radius-sm)',
      border: `1.5px solid ${error ? 'var(--terracotta)' : focus ? 'var(--moss)' : 'var(--border-subtle)'}`,
      boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
      outline: 'none',
      resize: 'vertical',
      lineHeight: 1.6,
      transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: error ? 'var(--terracotta)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AboutScreen.jsx
try { (() => {
// About — portrait, story prose, values row.
function AboutScreen({
  onNavigate
}) {
  const {
    Button,
    SectionLabel,
    Divider,
    Tag
  } = window.CamVelucciPhotographyDesignSystem_b97b53;
  const values = [['Down to earth', 'Not chasing perfect — the real, whole story.'], ['Sentimental', 'The moments you\'ll come back to for years.'], ['Gently guided', 'Never stiff posing; soft, warm direction.']];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 72,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sample-4.jpg",
    alt: "Cam Velucci",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "terracotta"
  }, "Hello, I'm Cam"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      fontSize: 44,
      color: 'var(--forest)',
      letterSpacing: '-0.015em',
      margin: '18px 0 24px',
      lineHeight: 1.1
    }
  }, "A photographer for the whole range of feelings"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 19,
      lineHeight: 1.75,
      color: 'var(--charcoal)',
      margin: 0
    }
  }, "I photograph families and mothers who feel it all \u2014 the soft and the pretty, the chaos and the giggles, the tantrums as much as the triumphs. My work is story-led and documentary in spirit: gently guided, never stiff."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 19,
      lineHeight: 1.75,
      color: 'var(--charcoal)',
      margin: '18px 0 0'
    }
  }, "I'm in the early stages of building my business here in Hertfordshire, and I'd be honoured to tell your family's story."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNavigate('Enquire')
  }, "Work with me")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--forest)',
      padding: '80px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "gold"
  }, "What I believe")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 40,
      marginTop: 40
    }
  }, values.map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--warm-linen)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--straw-gold)',
      margin: '10px 0 0'
    }
  }, d)))))));
}
Object.assign(window, {
  AboutScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AboutScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/EnquireScreen.jsx
try { (() => {
// Enquire — split layout: warm intro + working enquiry form with success state.
function EnquireScreen() {
  const {
    Button,
    Input,
    Textarea,
    Select,
    Checkbox,
    SectionLabel
  } = window.CamVelucciPhotographyDesignSystem_b97b53;
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: '0.85fr 1.15fr',
      gap: 72,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "terracotta"
  }, "Say hello"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      fontSize: 42,
      color: 'var(--forest)',
      letterSpacing: '-0.015em',
      margin: '18px 0 20px',
      lineHeight: 1.1
    }
  }, "Let's talk about your session"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 18,
      lineHeight: 1.7,
      color: 'var(--charcoal)',
      margin: 0
    }
  }, "Tell me a little about your family and what you'd love to remember. I read every message myself and reply within a couple of days."), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sample-5.jpg",
    alt: "",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-lg)',
      marginTop: 32,
      boxShadow: 'var(--shadow-sm)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 40,
      boxShadow: 'var(--shadow-sm)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-quote)',
      fontStyle: 'italic',
      fontSize: 32,
      color: 'var(--forest)'
    }
  }, "Thank you \u2014 message received."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 17,
      color: 'var(--text-muted)',
      marginTop: 12
    }
  }, "I'll be in touch within a couple of days."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setSent(false)
  }, "Send another"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Your name",
    placeholder: "First and last",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@email.com",
    required: true
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Session type"
  }, /*#__PURE__*/React.createElement("option", null, "Family session"), /*#__PURE__*/React.createElement("option", null, "Motherhood session"), /*#__PURE__*/React.createElement("option", null, "In-home story")), /*#__PURE__*/React.createElement(Input, {
    label: "Rough timing",
    placeholder: "e.g. this autumn"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Textarea, {
    label: "Tell me about your family",
    rows: 4,
    placeholder: "Who's in the picture, and what would you love to remember?"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Add me to the seasonal mini-session list"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true
  }, "Send enquiry")))));
}
Object.assign(window, {
  EnquireScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/EnquireScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Site footer — reversed logo on Forest, Straw Gold details, social + contact.
function Footer({
  onNavigate
}) {
  const {
    Divider
  } = window.CamVelucciPhotographyDesignSystem_b97b53;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--forest)',
      color: 'var(--warm-linen)',
      padding: '72px 40px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 340
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-full-warm-linen.png",
    alt: "Cam Velucci Photography",
    style: {
      height: 64,
      marginBottom: 18
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-quote)',
      fontStyle: 'italic',
      fontSize: 21,
      lineHeight: 1.4,
      color: 'var(--straw-gold)',
      margin: 0
    }
  }, "Expressive photography for families who feel it all.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 64
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--straw-gold)',
      marginBottom: 16
    }
  }, "Explore"), ['Home', 'Portfolio', 'About', 'Journal'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    onClick: () => onNavigate(l),
    style: {
      display: 'block',
      cursor: 'pointer',
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 15,
      color: 'var(--warm-linen)',
      marginBottom: 10,
      opacity: 0.85
    }
  }, l))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--straw-gold)',
      marginBottom: 16
    }
  }, "Say hello"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 12,
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "mail",
    size: 17,
    color: "var(--straw-gold)"
  }), "hello@camvelucci.com"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 12,
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "instagram",
    size: 17,
    color: "var(--straw-gold)"
  }), "@camvelucci"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "map-pin",
    size: 17,
    color: "var(--straw-gold)"
  }), "Hertfordshire, England")))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '48px 0 24px'
    }
  }, /*#__PURE__*/React.createElement(Divider, {
    color: "var(--straw-gold)",
    style: {
      opacity: 0.35
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '0.04em',
      color: 'var(--straw-gold)',
      opacity: 0.75
    }
  }, "\xA9 2026 Cam Velucci Photography \xB7 Story-led family & motherhood sessions")));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
// Home — hero, session categories, about teaser, testimonial, CTA band.
function HomeScreen({
  onNavigate
}) {
  const {
    Button,
    SectionLabel,
    Card,
    QuoteCard,
    Divider,
    Tag
  } = window.CamVelucciPhotographyDesignSystem_b97b53;
  const sessions = [{
    image: '../../assets/sample-1.jpg',
    tag: 'Motherhood',
    title: 'Motherhood',
    body: 'The tender, ordinary in-between — just you and them.'
  }, {
    image: '../../assets/sample-2.jpg',
    tag: 'Family',
    title: 'Family sessions',
    body: 'The chaos and the giggles, all of it, honoured.'
  }, {
    image: '../../assets/sample-3.jpg',
    tag: 'At home',
    title: 'In-home stories',
    body: 'Documentary-style, in the place you know best.'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 620,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hero.jpg",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(42,53,39,0.72) 0%, rgba(42,53,39,0.34) 55%, rgba(42,53,39,0.15) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 40px',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "gold"
  }, "Story-led family & motherhood"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      fontSize: 60,
      lineHeight: 1.04,
      letterSpacing: '-0.015em',
      color: 'var(--warm-linen)',
      margin: '18px 0 0'
    }
  }, "Expressive photography for families who feel it all."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 20,
      lineHeight: 1.6,
      color: 'var(--warm-linen)',
      opacity: 0.92,
      margin: '22px 0 0',
      maxWidth: 500
    }
  }, "The soft and the pretty, the chaos and the giggles \u2014 the moments quietly writing your family's chapters."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onNavigate('Enquire')
  }, "Book a session"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    onClick: () => onNavigate('Portfolio'),
    style: {
      color: 'var(--warm-linen)',
      borderColor: 'var(--warm-linen)'
    }
  }, "View portfolio"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '96px 40px 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "terracotta"
  }, "The sessions")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 38,
      color: 'var(--forest)',
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, "The whole range of feelings"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 380,
      margin: '20px auto 48px'
    }
  }, /*#__PURE__*/React.createElement(Divider, {
    flourish: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 28,
      textAlign: 'left'
    }
  }, sessions.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.title,
    image: s.image,
    tag: s.tag,
    title: s.title,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate('Portfolio');
    }
  }, s.body)))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sample-4.jpg",
    alt: "",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "moss"
  }, "A note from Cam"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 23,
      lineHeight: 1.6,
      color: 'var(--charcoal)',
      margin: '20px 0 0'
    }
  }, "I believe in honouring your unique family story \u2014 the tantrums as much as the triumphs. I'm in the early stages of building my business, and I'd love to tell yours."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onNavigate('About')
  }, "Read my story \u2192")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--linen-soft)',
      padding: '88px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(QuoteCard, {
    quote: "She captured the moments I didn't know I'd want to remember \u2014 the ones I'll come back to for years.",
    author: "Sarah M.",
    detail: "Family session, Hertfordshire"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '96px 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      fontSize: 42,
      color: 'var(--forest)',
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, "Let's tell your family's story"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontWeight: 300,
      fontSize: 19,
      color: 'var(--text-muted)',
      margin: '16px 0 32px'
    }
  }, "Sessions across Hertfordshire and beyond."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onNavigate('Enquire')
  }, "Enquire about a session")));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Icon.jsx
try { (() => {
// Icon — thin-line icons via Lucide (CDN). Substitution flagged in readme/ICONOGRAPHY.
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.6,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        nameAttr: 'data-lucide',
        attrs: {
          width: size,
          height: size,
          stroke: color,
          'stroke-width': strokeWidth
        }
      });
    }
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      ...style
    }
  });
}
Object.assign(window, {
  Icon
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
// Site navigation bar — Forest logo on Warm Linen, tracked-caps links, Terracotta CTA.
function Nav({
  current,
  onNavigate
}) {
  const {
    Button
  } = window.CamVelucciPhotographyDesignSystem_b97b53;
  const links = ['Home', 'Portfolio', 'About', 'Journal'];
  const [scrolled, setScrolled] = React.useState(false);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'color-mix(in srgb, var(--warm-linen) 92%, transparent)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 40px',
      height: 78,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate('Home'),
    style: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-oneline-forest.png",
    alt: "Cam Velucci Photography",
    style: {
      height: 30
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 38
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    onClick: () => onNavigate(l),
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      fontSize: 13,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: current === l ? 'var(--terracotta)' : 'var(--forest)',
      paddingBottom: 3,
      borderBottom: current === l ? '1.5px solid var(--terracotta)' : '1.5px solid transparent',
      transition: 'color var(--dur-fast) var(--ease-standard)'
    }
  }, l)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onNavigate('Enquire')
  }, "Enquire"))));
}
Object.assign(window, {
  Nav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PortfolioScreen.jsx
try { (() => {
// Portfolio — masonry-ish gallery with filter pills and a lightbox.
function PortfolioScreen({
  onNavigate
}) {
  const {
    Button,
    SectionLabel,
    Divider
  } = window.CamVelucciPhotographyDesignSystem_b97b53;
  const filters = ['All', 'Motherhood', 'Family', 'At home'];
  const [active, setActive] = React.useState('All');
  const [lightbox, setLightbox] = React.useState(null);
  const shots = [{
    src: '../../assets/sample-1.jpg',
    cat: 'Motherhood',
    tall: true
  }, {
    src: '../../assets/sample-2.jpg',
    cat: 'Family'
  }, {
    src: '../../assets/sample-3.jpg',
    cat: 'At home'
  }, {
    src: '../../assets/sample-4.jpg',
    cat: 'Motherhood',
    tall: true
  }, {
    src: '../../assets/sample-5.jpg',
    cat: 'Family'
  }, {
    src: '../../assets/sample-session.jpg',
    cat: 'At home'
  }, {
    src: '../../assets/hero-2.jpg',
    cat: 'Family'
  }, {
    src: '../../assets/hero.jpg',
    cat: 'Motherhood',
    tall: true
  }];
  const shown = active === 'All' ? shots : shots.filter(s => s.cat === active);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '72px 40px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    tone: "terracotta"
  }, "The portfolio")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      fontSize: 46,
      color: 'var(--forest)',
      letterSpacing: '-0.015em',
      margin: 0
    }
  }, "Real, fleeting moments"), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 300,
      margin: '20px auto 36px'
    }
  }, /*#__PURE__*/React.createElement(Divider, {
    flourish: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, filters.map(f => {
    const on = active === f;
    return /*#__PURE__*/React.createElement("button", {
      key: f,
      onClick: () => setActive(f),
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '9px 20px',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        border: `1.5px solid ${on ? 'var(--forest)' : 'var(--border-subtle)'}`,
        background: on ? 'var(--forest)' : 'transparent',
        color: on ? 'var(--warm-linen)' : 'var(--forest)',
        transition: 'all var(--dur-fast) var(--ease-standard)'
      }
    }, f);
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 40px 96px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      columnCount: 3,
      columnGap: 20
    }
  }, shown.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => setLightbox(s.src),
    style: {
      breakInside: 'avoid',
      marginBottom: 20,
      cursor: 'pointer',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.src,
    alt: s.cat,
    style: {
      width: '100%',
      display: 'block'
    }
  }))))), lightbox && /*#__PURE__*/React.createElement("div", {
    onClick: () => setLightbox(null),
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(42,53,39,0.86)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: lightbox,
    alt: "",
    style: {
      maxWidth: '86%',
      maxHeight: '86%',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)'
    }
  })));
}
Object.assign(window, {
  PortfolioScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PortfolioScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Card = __ds_scope.Card;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
