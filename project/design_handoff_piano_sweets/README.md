# Handoff: Piano Sweets — Informative Brand Website

## Overview
A single-page **informative / brand website** for **Piano Sweets (بيانو حلويات)**, a luxury French-chocolate brand in Kuwait whose concept is "chocolate composed like music." The site tells the brand story, presents the philosophy (Brand DNA), introduces the founder, showcases collections and occasions, and provides an enquiry/order form. The site is **RTL Arabic-primary**, with English brand wording retained for elegance.

## About the Design Files
The file in this bundle (`Piano Sweets.dc.html`) is a **design reference created in HTML** — a prototype showing the intended look, layout, copy, and behavior. **It is not production code to ship directly.** The `.dc.html` format uses a custom in-house preview runtime (`<x-dc>`, `support.js`); none of that runtime should be carried into the real project.

Your task: **recreate this design in the target codebase's environment.** If a stack already exists, use its patterns and libraries. If starting fresh, a good default is **Next.js (React) + plain CSS / CSS Modules** (no heavy UI kit needed — this is a content/marketing site). Keep the markup semantic and the layout responsive.

> The HTML uses inline `style="..."` everywhere because of the preview runtime's constraints. In the real build, **move these into CSS/CSS Modules or styled-components** — do not replicate inline styles. The values below are the source of truth.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are specified. Recreate the UI faithfully. The only placeholders are **product/founder imagery** (striped placeholder boxes) — see Assets.

## Tech & Direction
- **Direction:** RTL (`dir="rtl"`), Arabic-primary. Latin brand words ("PIANO", "SWEETS", English pull-quotes) stay LTR inline.
- **Aesthetic:** elegant, calm, minimal luxury. Generous whitespace, hairline gold dividers, thin "piano string" vertical lines, and a recurring **oval-with-two-dots motif** (taken from the logo monogram frame) used as a small decorative icon.
- **Section rhythm:** alternating backgrounds — burgundy → cream → burgundy → deep-burgundy → cream → burgundy → cream(form) → deep-burgundy(quote) → burgundy(footer).

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| Burgundy (primary bg) | `#3E1E21` | hero, philosophy, occasions, footer backgrounds; text on cream |
| Deep Burgundy | `#2C1517` | founder section, quote banner, nav scrolled bg, button hover |
| Hero radial light | `#4A262A` | center of hero radial gradient |
| Champagne (primary text on dark) | `#DDC9A4` | body text/headlines on burgundy |
| Champagne light | `#EBDDC2` | emphasized headings, italic pull-quotes on dark |
| Gold accent | `#C2A063` | dividers, eyebrows, motif strokes, small numerals |
| Gold accent (on cream) | `#B0894E` | eyebrow labels on cream |
| Cream (light bg) | `#F6F1E7` | story, collections, enquiry section backgrounds |
| Ink on cream (body) | `#5A3B36` / `#6A4A43` | paragraph text on cream |
| Card stripe light | `#ECE2CF` / `#E6DAC2` | placeholder image stripes (collections) |
| Card border on cream | `#D8C8A6` / `#DDCCAC` | placeholder & input borders |

`::selection` = champagne bg `#DDC9A4`, burgundy text `#3E1E21`.

### Typography
Google Fonts: **Cormorant Garamond**, **Jost**, **Tajawal**.
- **Cormorant Garamond** (serif, often italic) — English display, pull-quotes, "PIANO" wordmark, decorative numerals. Weights 300–600.
- **Jost** (geometric sans) — Latin eyebrow labels & buttons, **wide letter-spacing** (`.30em–.50em`), small sizes (9–11px). "SWEETS" caption.
- **Tajawal** (Arabic sans) — all Arabic. Headings weight 300 (light), body 300, emphasis 500, ultralight 200 for taglines.

Type scale (responsive via `clamp`):
- Section headings (Arabic): `clamp(32px, 5vw, 58px)`, weight 300.
- Eyebrow labels: 11px, Jost, letter-spacing `.42em`, uppercase, gold.
- Body: 15–17px, line-height ~2.0–2.1, weight 300.
- Pull-quotes: Cormorant italic, `clamp(22px, 4.4vw, 52px)`.
- Hero tagline EN: Cormorant italic `clamp(26px, 3.6vw, 40px)`; AR `clamp(17px, 2vw, 21px)` letter-spacing `.32em`.

### Spacing & misc
- Section vertical padding: `clamp(90px, 12vw, 160px)`, horizontal 24px.
- Content max-widths: 980px (story), 1080px (founder/occasions/footer/form), 1120–1180px (philosophy/collections).
- Border radius: 2px (buttons, inputs, cards) — nearly square, luxury feel.
- Divider: 40–54px × 1px gold line.
- Motif (oval+2 dots): rounded-rect 46×70 / 60×90, border 1px gold/champagne, `border-radius: 23/30px`, with two 3.5–4px dots centered near top & bottom.
- Reveal-on-scroll: opacity 0→1, translateY 26px→0, `transition: 1.1s cubic-bezier(.2,.7,.2,1)`, staggered by `~0.09s` per column. Triggered via IntersectionObserver at threshold 0.12.
- Hero logo: subtle float `translateY(±7px)` over 7s ease-in-out infinite.

## Screens / Views
Single scrolling page. Fixed translucent top nav with blur; nav bg darkens to `rgba(44,21,23,.86)` after scrollY > 60.

**Nav** — brand lockup (PIANO + SWEETS) on the right (RTL start); links: قصتنا `#story` · الفلسفة `#philosophy` · المؤسس `#founder` · المجموعات `#collections` · اطلب `#enquiry` · تواصل `#contact`. Hidden under 760px.

1. **Hero** (`#top`, burgundy radial) — floating logo image, gold divider, "Composed like music" / "مؤلَّفة كالموسيقى", intro line, champagne CTA button "DISCOVER PIANO" → `#story`. Faint vertical "piano string" lines in background (5 × 1px champagne gradients, opacity .06).
2. **Brand Story** (`#story`, cream) — eyebrow OUR STORY, heading قصة العلامة, brand-story paragraph, italic English pull-quote.
3. **Philosophy / Brand DNA** (`#philosophy`, burgundy) — 6-cell grid (3-col desktop / 2 / 1) with a 1px champagne hairline grid. Each cell: ♪ glyph (gold), Arabic value, English caps label, description. Values: الانسجام/HARMONY, الرُقيّ/SOPHISTICATION, العاطفة/EMOTION, الحِرفية/CRAFTSMANSHIP, الفخامة الفنية/ARTISTIC LUXURY, التجربة الحسية/SENSORY EXPERIENCE.
4. **Founder** (`#founder`, deep burgundy) — 2-col: left placeholder portrait (4:5, striped + motif, label "FOUNDER PORTRAIT"); right eyebrow THE FOUNDER, heading "شوكولاتييه وعازف بيانو", two paragraphs.
5. **Collections** (`#collections`, cream) — heading المجموعات, italic "Every flavor plays a different note." 3 cards (4:5 striped placeholder w/ Roman numeral I/II/III + "COLLECTION SHOT" label, hover lift), Arabic title, English caps, description. Collections: مجموعة التوقيع/SIGNATURE NOTES, الإهداء الفاخر/GIFTING SUITE, مناسبات مميزة/CELEBRATIONS.
6. **Occasions** (`#occasions`, burgundy) — 3 bordered cards with motif icon: الأفراد/INDIVIDUALS, الشركات/CORPORATE, الإهداء/GIFTING.
7. **Enquiry / Order** (`#enquiry`, cream) — 2-col. Left: eyebrow ENQUIRIES & ORDERS, heading "اطلب تجربتك الخاصة", intro, address + phone. Right: form (name + phone row, request-type select [أفراد / إهداء فاخر / مناسبة-عُرس / شركات], details textarea, "SEND ENQUIRY" burgundy button). On submit → success card "شكراً لك" with motif + "SEND ANOTHER" reset.
8. **Quote banner** (deep burgundy) — italic "Where emotion inspires creation." / "حيث تُلهم العاطفة الإبداع".
9. **Footer** (`#contact`, burgundy) — 3-col: brand lockup + blurb; VISIT US (مجمع الغوالي — الكويت / Al Ghawali Complex, Kuwait); CONNECT (Instagram / WhatsApp / Enquiries — currently placeholder `#`). Bottom row: copyright + "Crafted in harmony."

## Interactions & Behavior
- Smooth-scroll anchor nav; logo click scrolls to top.
- Scroll-reveal via IntersectionObserver (see tokens); unobserve after reveal.
- Nav background darkens on scroll.
- Hover: nav links opacity .78→1; CTA buttons lift/lighten; collection cards lift 6px; occasion cards border/bg brighten.
- Enquiry form: client-side only in the prototype — on submit it swaps to a thank-you card. **In production, wire this to a real backend / WhatsApp lead / email.** Add validation (name required, phone required + format).
- Responsive: grids collapse 3→2→1; founder/footer/form 2→1 at ≤760px; nav links hidden at ≤760px (add a mobile menu — not built in the prototype).

## State Management
- `sent: boolean` — toggles enquiry form vs. thank-you card; `reset()` flips back. That's the only stateful piece. Everything else is static content.

## Assets
- `assets/piano-logo.jpeg` — official logo (champagne on burgundy). Currently used with `mix-blend-mode: lighten` over the burgundy hero so it blends seamlessly. **Request a transparent PNG/SVG** from the client for clean placement on any background.
- `assets/PIANO Brand Def.pdf` — full brand foundation: brand story, founder story, Brand DNA, personality, key phrases, competitor analysis. Source for all copy.
- **Product imagery (3)** and **founder portrait (1)** — NOT yet provided; shown as striped placeholders (4:5). Drop real images in when available.
- Brand key phrases available for future copy: "Composed like music." · "Inspired by harmony." · "Every flavor plays a different note." · "Where emotion inspires creation." · "A sensory composition of flavor and elegance." · "Crafted in harmony."

### Contact placeholders to replace with real data
- Phone `+965 0000 0000`, social links `#`, exact address — all placeholder. Confirm with client.

## Files
- `Piano Sweets.dc.html` — the full design reference (open in a browser to view; ignore the `<x-dc>` / `support.js` runtime wrapper).
- `assets/piano-logo.jpeg` — logo.
- `assets/PIANO Brand Def.pdf` — brand guidelines & all copy.
