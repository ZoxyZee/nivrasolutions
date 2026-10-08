# NivraSolutions — project brain

## Purpose

NivraSolutions is a software solutions company website. It explains custom software, web application, automation, and product engineering services, showcases supplied projects, introduces the team, and offers direct contact options.

## Creative direction

- Product-led B2B presentation: a clear sans-serif type system, concise headings, and direct calls to action.
- A charcoal-navy first screen and translucent navigation establish a credible opening. Warm ivory content, muted blue links, and a restrained copper call-to-action color give the site clearer hierarchy without making every section blue. Neutral project surfaces, compact corners, calm shadows, and measured spacing keep it formal but not sterile.
- The navy-and-teal N monogram in `public/brand-mark.svg` is shared by the site header, blog header, and browser-tab favicon. Keep those references aligned if the logo changes.
- The homepage leads with capabilities before two deployed projects, so prospective clients understand the offer before browsing examples. Decorative grids and strong glows are deliberately omitted.
- The first screen pairs a software proposition with an illustrative interface preview. UI mockups are not presented as actual client screenshots.
- Restrained motion, including a one-time dashboard chart reveal, simple borders, and legible component layouts replace the former oversized editorial typography and decorative marquee.
- Responsive layout with a compact, scrollable mobile menu; phone-sized hero and project cards; wrapped contact details and blog navigation; sticky navigation, scroll progress, and reduced-motion support.
- A shared two-layer cursor adds a small companion dot and softly trailing outline across the React pages, blog, and 404 page. It adapts to dark sections, reacts to interactive elements, and hides over text fields. The native pointer remains; touch/coarse pointers and reduced-motion users get no extra cursor.
- An explicit Home link, a manually controlled project preview in the hero, and expandable project details on Work provide useful interaction without autoplay or decorative effects.

## Code map

```text
index.html                  HTML shell and page metadata
src/main.jsx                React entry point and static-page hydration
src/entry-server.jsx        Build-time rendering for crawlable page HTML
src/App.jsx                 Route configuration, page titles, scroll reveal observer
src/components/            Shared UI and project visuals
src/hooks/                 Anchor scroll behavior
src/pages/                 Home, Services, Work, About, Contact, 404 pages
src/sections/              One component per page section
content/blog/              Hand-written Markdown articles
scripts/generate-content.mjs  Blog HTML, static page HTML, and SEO output generator
src/data/siteContent.js     Editable services, projects, team, values, process, email
src/styles.css              Design tokens, section styles, responsive rules
src/professional.css         Product-led visual system and responsive overrides
public/blog.css             Static blog styles
seo.config.json             Canonical site URL and page metadata
vite.config.js              Vite configuration
public/_redirects           Static-host route fallback for direct page URLs
.openai/hosting.json        Private Sites project identity and build output
```

## Adding a project

1. Add an object to the `projects` array in `src/data/siteContent.js`, using an accurate `status` (`Deployed` or `Built`), concise `brief`, optional `highlights` and verified `stack`. Set `featured: true` for a deployed project to show it on Home and in the hero.
2. Add a visual component and its `type` mapping in `src/components/ProjectVisual.jsx`. You can later replace the CSS mockup with an approved image or screenshot.
3. Add any project-specific card colors or sizing in `src/styles.css`.
4. Do not call a project deployed unless that status and public display are confirmed. Keep any interface mockup marked as illustrative unless it is an approved screenshot.

## Page routes

- `/` — company overview and two featured deployed projects.
- `/services/` — full service list and process.
- `/work/` — deployed and built projects with short details. ATS Testing Platform is an Automatic Transfer Switch test workspace, not an applicant-tracking product.
- `/about/` — company story, values, and team names.
- `/contact/` — email, direct phone contacts, and project inquiry guidance.
- `/blog/` — static article index, with each post at `/blog/<slug>/`.

React Router handles navigation. The production build renders each route into its own HTML file and hydrates it on the client. Add new pages in `src/pages/`, register the route in `src/App.jsx` and its SEO metadata in `seo.config.json`, then add links in shared navigation/footer where appropriate.

## Adding the three team profiles

Edit the three `teamMembers` objects in `src/data/siteContent.js`. Each accepts `name`, `role`, `linkedin`, `phone`, and `email`. The provided names appear on About; individual phone numbers and email addresses appear only on Contact. Add approved roles and full `https://www.linkedin.com/...` profile URLs when available. Blank or invalid LinkedIn links are omitted.

The Contact page derives its `contactPeople` list from `teamMembers`, so names, phone numbers, and email addresses stay in sync. Contact links use `tel:` and `mailto:` URLs.

## Publishing a blog post

1. Create `content/blog/your-post-slug.md`. Keep the filename lowercase with hyphens; it becomes the permanent URL.
2. Start with YAML front matter: `title`, `description`, `date` (YYYY-MM-DD), and `category`. Optional: `author`, `updated`, or `draft: true`. Write the article underneath in Markdown, starting with `##` headings (the page generates its own H1).
3. Run `npm run blog:build` while developing, or restart `npm run dev`. The home page's latest posts list, blog index, and article pages update from the same files.
4. Run `npm run build` before deployment. It writes static article HTML, unique page metadata, `sitemap.xml`, `rss.xml`, and `robots.txt` into `dist/`.

Edit the Markdown source, not generated `public/blog/` or `dist/` files. Use `draft: true` to keep an unfinished post out of the generated site. Avoid changing a published filename because that changes its URL.

The build sets absolute canonical URLs and sitemap links from one URL resolver. `SITE_URL` takes priority; on Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used when available (including a future custom domain); otherwise the fallback is `seo.config.json`. The React route metadata uses the same resolved URL. Check the deployed canonical and sitemap against the live public domain before submitting the sitemap to Search Console. The fallback Sites URL is private and should not be treated as the public domain.

## Content to confirm before launch

- The public contact address is `info.nivrasolutions@gmail.com`; update `contactEmail` in `src/data/siteContent.js` if it changes.
- Confirm the public wording for the Hospital Management System and AttendX deployments before launch. The Home interface previews are illustrative. The Work page uses a sanitized HMS dashboard visual and PDF-extracted screenshots for ATS Testing Platform and AttendX; its other previews are illustrative.
- The HMS image at `public/images/projects/hms-dashboard-sanitized.png` was created with the built-in image editor from the user-supplied dashboard screenshot. The edit hides the hospital name, address, phone number, live metrics, and inventory batch details while retaining the interface structure. Keep the original screenshot out of public assets.
- ATS screenshots are from safe demo-mode overview and guided-test pages. AttendX uses a mobile navigation screenshot. Screens showing employee names, attendance records, PLC addresses, and connection details were deliberately excluded from public assets. ATS is marked `Built` until deployment status is confirmed.
- ERP and Servify are marked `Built`; add their exact scope, stack, and deployment status when confirmed. The supplied AttendX repository path was not publicly verifiable, so no repository link is shown yet.
- Confirm the three public names and phone numbers; add approved roles and LinkedIn URLs when available.
- Review the software service list against the company's actual capabilities before launch.
- Replace the canonical URL in `seo.config.json` if the public domain changes.

## Commands

- `npm install` — install dependencies.
- `npm run dev` — local development.
- `npm run build` — production build into `dist/`.
- `npm run preview` — preview the production build.
- `npm run blog:build` — regenerate the local blog after Markdown edits.
- `npm run format` — format source and documentation.
- `npm run format:check` — verify formatting without changing files.

## Deployment state

The site has a private Sites project ID in `.openai/hosting.json`. Local source is not deployed. A source push requires separate authorization because the automatic approval review blocked upload to the Cloudflare-backed repository.
