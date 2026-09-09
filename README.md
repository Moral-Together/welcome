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
- Language switcher with English as default, plus Hebrew and Russian.
- Mobile-first responsive layout.
- Splash screen on load.
- Two featured projects at the top, each with its own social strip inside the tile:
  - M1 Radio (m1-radio.com)
  - Stage of Stars (stageofstars.com)
- Three project tiles below, in one row:
  - Moral for Good
  - Zuzim.cash
  - Trust Mom
- On phones the two featured projects stack full width; the three tiles stay in one row.
- Social icons come from Font Awesome brands (CDN).

Replace `href="#"` in `index.html` with final project URLs when they are ready.

## Structure

```text
index.html
styles.css
script.js
MoralTogetherLogo.png
logos/
CNAME
.nojekyll
```

## Deployment

Static site served by GitHub Pages from the `main` branch root.
