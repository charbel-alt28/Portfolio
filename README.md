# Charbel Serhal — Portfolio Website

A single-page, cybersecurity-themed portfolio built from your CV. Theme: dark slate SOC console with a red signal accent — the whole site is styled like a security operations dashboard (status bar, "operations log" for experience, "case files" for projects, "capability matrix" for skills).

## Files

```
portfolio/
├── index.html          → all page content & structure
├── css/style.css        → all styling (design tokens at the top)
├── js/script.js          → nav, clock, scroll-reveal, typing effect, contact form
├── assets/
│   └── SerhalCharbel-CV.pdf   → powers the "Download CV" button
└── README.md
```

## How to view it locally

Just double-click `index.html` — no build step, no dependencies to install. It's plain HTML/CSS/JS.

## How to deploy it (pick one — all are free)

**GitHub Pages**
1. Create a new GitHub repo (e.g. `charbel-portfolio`).
2. Upload the contents of this `portfolio/` folder to the repo root.
3. Go to **Settings → Pages**, set the source branch to `main` and folder to `/root`.
4. Your site goes live at `https://<your-username>.github.io/charbel-portfolio/`.

**Netlify**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `portfolio` folder onto the page.
3. It deploys instantly with a free `*.netlify.app` URL — you can add a custom domain later from the site settings.

**Vercel**
1. Run `npx vercel` from inside the `portfolio` folder (requires Node.js), or import the folder/repo at [vercel.com/new](https://vercel.com/new).
2. Accept the defaults — there's no framework to configure since this is static HTML.

Any of these are genuinely production-ready; for a personal portfolio, Netlify or GitHub Pages is the simplest path.

## About the contact form

You chose to route messages through Gmail rather than a third-party form service. The form on the site uses a `mailto:` link: when a visitor fills it out and hits **Send via Gmail**, their own email client opens with a pre-filled message addressed to `charbelserhal824@gmail.com`, subject and body already populated from what they typed. They still have to hit send themselves — there's no backend, no API keys, and nothing for you to maintain.

The trade-off: it depends on the visitor having a configured email client (most desktop users do; some mobile users without a default mail app set up may need to copy your email manually — the email and phone number are also listed as direct links right next to the form). If you'd ever rather have messages land directly in your inbox without that dependency, Formspree (free tier, no backend code) or EmailJS (sends from a hidden API key, also free tier) are the usual upgrades — happy to wire either in later if you want.

## Things you may want to personalize before publishing

- **LinkedIn / GitHub links**: your CV didn't list profile URLs, so none are in the nav or footer. If you have them, I can add icon links to the top bar and footer in under a minute.
- **Profile photo**: the hero currently uses a typographic "CS" mark instead of a headshot, in keeping with the terminal aesthetic. If you'd like a real photo in the About section, send it over and I'll wire it in with proper alt text and responsive sizing.
- **Domain**: once deployed, you can point a custom domain (e.g. `charbelserhal.com`) at any of the hosts above for a small annual fee — not required, but worth it if you're sending this link to recruiters.

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), a skip-to-content link, and visible keyboard focus states are built in.
- All content is real HTML present in the page — animations (typing effect, scroll reveals) are progressive enhancement and respect `prefers-reduced-motion`.
- No build tooling, no external JS frameworks, no render-blocking scripts — it should load fast on its own. Fonts are loaded from Google Fonts via `<link>` with `preconnect` for speed; if you'd rather not depend on Google Fonts, I can self-host them instead.
