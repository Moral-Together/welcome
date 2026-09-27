# Moral Together — Welcome

A lightweight Linktree-style public hub for Moral Together projects, websites and client-facing work.

## Live site

```text
https://welcome.moraltogether.com
```

GitHub Pages fallback:

```text
https://moral-together.github.io/welcome/
```

## Current features

- Colorful Linktree-style portfolio hub for Moral Together.
- Language switcher: Hebrew, English, Russian. Opens in the language picked earlier by hand, else the browser language if it is one of the three, else Hebrew.
- Short opening splash (about a second), then the tiles fade in.
- Mobile-first responsive layout: one column on phones and small windows (up to 640px), two columns above.
- The Moral Together logo at the top links to moraltogether.com; on hover or keyboard focus a rainbow border draws itself round it from the top and bottom and a soft gradient fades in behind.
- Every project is a tile with its logo; below the logo either a social strip or a short description from the brief.
- Projects without a site yet are greyed out with a "Coming soon" badge (`.feat.is-soon`); give the tile a link and drop the class when the site is ready.
- Social icons are inline SVG (Font Awesome Free brand icons, CC BY 4.0) — no icon font to download.
- Link previews for WhatsApp / Telegram / Facebook / X via Open Graph tags and `og-image.jpg`.
- Font: Rubik (same family as the main site), served from `fonts/`, not Google Fonts: the page makes no third-party requests.
- Footer links to the main site's accessibility statement and privacy policy (same operator), plus the support email.
- Accessibility (IS 5568 / WCAG AA), matching what the main site's statement promises for its subdomains:
  skip link, visible keyboard focus, screen-reader labels in the page language, links that open a new tab say so,
  and the same Open-Nagish widget as the main site (`a11y-widget.js`, `vendor/`, loaded when the browser is idle).
  Last checked with axe-core on 2026-09-27 in all three languages: no violations. If the page changes,
  re-check it and keep the main site's accessibility statement in step.

## Images

Pages load the `.webp` files. The `.png` files next to them are the full-size sources:
when a logo changes, replace the `.png` and export a new `.webp` at about twice its on-screen size
(tile logos ~440px, header logo ~760px wide), then bump the `?v=` numbers in `index.html` if needed.

## Structure

```text
index.html
styles.css
script.js
MoralTogetherLogo.webp / .png
logos/            project logos (.webp served, .png sources)
og-image.jpg      link preview image, 1200x630
vendor/           Open-Nagish accessibility widget 1.1.5 (MIT)
a11y-widget.js    loads and themes the widget
fonts/            Rubik (Hebrew, Latin, Cyrillic), variable woff2
favicon.ico, icon-192.png, apple-touch-icon.png
robots.txt, sitemap.xml
CNAME
.nojekyll
```

## Deployment

Static site served by GitHub Pages from the `main` branch root.
