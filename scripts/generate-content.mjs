import {
  readFile,
  readdir,
  mkdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const targetName = process.argv.includes("--dist") ? "dist" : "public";
const outputRoot = path.join(projectRoot, targetName);
const contentRoot = path.join(projectRoot, "content", "blog");
const config = JSON.parse(
  await readFile(path.join(projectRoot, "seo.config.json"), "utf8"),
);
const siteUrl = (process.env.SITE_URL || config.siteUrl).replace(/\/$/, "");
const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

if (!/^https:\/\/[^/]+$/.test(siteUrl)) {
  throw new Error("Set an HTTPS siteUrl in seo.config.json or SITE_URL.");
}

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );

const escapeXml = escapeHtml;
const safeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const absolute = (route) => `${siteUrl}${route}`;
const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

function requiredText(value, name, filename) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${filename}: "${name}" must be non-empty text.`);
  }
  return value.trim();
}

function parseDate(value, name, filename) {
  const date =
    value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())
  ) {
    throw new Error(`${filename}: "${name}" must be YYYY-MM-DD.`);
  }
  return date;
}

async function loadPosts() {
  const files = (await readdir(contentRoot)).filter((file) =>
    file.endsWith(".md"),
  );
  const posts = [];

  for (const file of files) {
    const slug = file.slice(0, -3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`${file}: use a lowercase, hyphenated filename.`);
    }

    const source = await readFile(path.join(contentRoot, file), "utf8");
    const { data, content } = matter(source);
    if (data.draft === true) continue;

    const title = requiredText(data.title, "title", file);
    const description = requiredText(data.description, "description", file);
    const date = parseDate(data.date, "date", file);
    const updated = data.updated
      ? parseDate(data.updated, "updated", file)
      : date;
    const category = requiredText(data.category, "category", file);
    const author = data.author
      ? requiredText(data.author, "author", file)
      : config.siteName;

    if (!content.trim()) throw new Error(`${file}: article body is empty.`);
    posts.push({
      slug,
      title,
      description,
      date,
      updated,
      category,
      author,
      readTime: Math.max(
        1,
        Math.ceil(content.trim().split(/\s+/).length / 220),
      ),
      body: markdown.render(content),
      url: `/blog/${slug}/`,
    });
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

function head({ title, description, route, type = "website", schema }) {
  const canonical = absolute(route);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#1d2923">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="${escapeHtml(config.siteName)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta name="twitter:card" content="summary">
  <link rel="alternate" type="application/rss+xml" title="NivraSolutions Notes" href="/rss.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/blog.css">
  ${schema ? `<script type="application/ld+json">${safeJson(schema)}</script>` : ""}
</head>`;
}

const blogHeader = `<header class="blog-header">
  <div class="blog-wrap blog-nav">
    <a class="blog-brand" href="/" aria-label="NivraSolutions home"><span class="brand-mark" aria-hidden="true"></span>NivraSolutions</a>
    <nav aria-label="Main navigation">
      <a href="/">Home</a><a href="/services/">Services</a><a href="/work/">Work</a><a href="/about/">About</a><a class="active" href="/blog/">Blog</a><a class="nav-cta" href="/contact/">Start a project ↗</a>
    </nav>
  </div>
</header>`;

const blogFooter = `<footer class="blog-footer">
  <div class="blog-wrap footer-grid">
    <div><a class="footer-brand" href="/">NivraSolutions</a><p>Software solutions built with purpose</p></div>
    <div><a href="/">Home</a><a href="/services/">Services</a><a href="/work/">Work</a><a href="/about/">About</a><a href="/blog/">Blog</a><a href="/contact/">Contact</a></div>
    <div><a href="/rss.xml">RSS feed ↗</a><span>© ${new Date().getUTCFullYear()} NivraSolutions</span></div>
  </div>
</footer>`;

function indexHtml(posts) {
  const articles = posts
    .map(
      (post, index) => `<article class="post-row">
    <div class="post-number">${String(index + 1).padStart(2, "0")}</div>
    <div>
      <div class="post-meta">${escapeHtml(post.category)} <span>·</span> ${formatDate(post.date)} <span>·</span> ${post.readTime} min read</div>
      <h2><a href="${post.url}">${escapeHtml(post.title)}</a></h2>
      <p>${escapeHtml(post.description)}</p>
    </div>
    <a class="post-arrow" href="${post.url}" aria-label="Read ${escapeHtml(post.title)}">↗</a>
  </article>`,
    )
    .join("\n");

  return `${head({
    title: `Notes — ${config.siteName}`,
    description:
      "Practical notes on software, digital products, web applications, and better ways of working.",
    route: "/blog/",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `Notes — ${config.siteName}`,
      url: absolute("/blog/"),
      description:
        "Practical notes on software, digital products, web applications, and better ways of working.",
    },
  })}
<body>
  ${blogHeader}
  <main id="top">
    <section class="blog-hero blog-wrap">
      <div class="eyebrow">Nivra insights / Ideas in progress</div>
      <h1>Notes on <em>building better.</em></h1>
      <p>On software, product thinking, and the small decisions that make digital work more useful.</p>
    </section>
    <section class="post-list blog-wrap" aria-label="Articles">
      <div class="list-label">All writing <span>${String(posts.length).padStart(2, "0")} articles</span></div>
      ${articles}
    </section>
    <section class="blog-cta"><div class="blog-wrap"><span>Have an idea worth discussing?</span><h2>Let's make it <em>real.</em></h2><a href="/contact/">Start a conversation ↗</a></div></section>
  </main>
  ${blogFooter}
</body>
</html>`;
}

function postHtml(post, posts) {
  const related = posts
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 2);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: config.siteName },
    mainEntityOfPage: absolute(post.url),
  };

  return `${head({
    title: `${post.title} — ${config.siteName}`,
    description: post.description,
    route: post.url,
    type: "article",
    schema,
  })}
<body>
  ${blogHeader}
  <main id="top">
    <article>
      <header class="article-head blog-wrap">
        <a class="back-link" href="/blog/">← All notes</a>
        <div class="post-meta">${escapeHtml(post.category)} <span>·</span> ${formatDate(post.date)} <span>·</span> ${post.readTime} min read</div>
        <h1>${escapeHtml(post.title)}</h1>
        <p>${escapeHtml(post.description)}</p>
      </header>
      <div class="article-rule blog-wrap"></div>
      <div class="article-body">${post.body}</div>
      <footer class="article-end">
        <span>Written by ${escapeHtml(post.author)}</span>
        <a href="/blog/">Back to all notes ↗</a>
      </footer>
    </article>
    ${related.length ? `<section class="related blog-wrap"><span class="eyebrow">Keep reading</span><div>${related.map((item) => `<a href="${item.url}"><span>${escapeHtml(item.category)}</span><strong>${escapeHtml(item.title)}</strong><i>↗</i></a>`).join("")}</div></section>` : ""}
  </main>
  ${blogFooter}
</body>
</html>`;
}

function sitemap(posts) {
  const routes = [
    ...config.pages.map(({ path: route }) => ({ route, updated: null })),
    { route: "/blog/", updated: posts[0]?.updated ?? null },
    ...posts.map((post) => ({ route: post.url, updated: post.updated })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(({ route, updated }) => `  <url><loc>${escapeXml(absolute(route))}</loc>${updated ? `<lastmod>${updated}</lastmod>` : ""}</url>`).join("\n")}
</urlset>\n`;
}

function rss(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>NivraSolutions Notes</title>
  <link>${escapeXml(absolute("/blog/"))}</link>
  <description>Practical notes on software, digital products, and better ways of working.</description>
  <language>en</language>
${posts
  .map(
    (post) => `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(absolute(post.url))}</link>
    <guid isPermaLink="true">${escapeXml(absolute(post.url))}</guid>
    <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
    <description>${escapeXml(post.description)}</description>
  </item>`,
  )
  .join("\n")}
</channel></rss>\n`;
}

async function replaceGeneratedBlog() {
  const blogRoot = path.join(outputRoot, "blog");
  const marker = path.join(blogRoot, ".nivra-generated");
  const resolvedOutput = path.resolve(outputRoot);
  const resolvedBlog = path.resolve(blogRoot);
  if (!resolvedBlog.startsWith(resolvedOutput + path.sep)) {
    throw new Error("Generated blog path escaped its output directory.");
  }

  try {
    await stat(blogRoot);
    await stat(marker);
    await rm(blogRoot, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    try {
      await stat(blogRoot);
      throw new Error(`Refusing to replace unmarked directory: ${blogRoot}`);
    } catch (checkError) {
      if (checkError.code !== "ENOENT") throw checkError;
    }
  }

  await mkdir(blogRoot, { recursive: true });
  await writeFile(
    marker,
    "Generated by scripts/generate-content.mjs. Edit content/blog/*.md instead.\n",
  );
  return blogRoot;
}

function enrichSpaShell(html, page, markup, previewPosts) {
  const route = page.path;
  const url = absolute(route);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: config.siteName,
      url: absolute("/"),
    },
  };
  const seo = `<link rel="canonical" href="${escapeHtml(url)}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${escapeHtml(config.siteName)}">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${escapeHtml(url)}">
    <meta name="twitter:card" content="summary">
    <script type="application/ld+json">${safeJson(schema)}</script>`;
  return html
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(page.title)}</title>`,
    )
    .replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(page.description)}">`,
    )
    .replace("</head>", `${seo}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace(
      "</body>",
      `<script>window.__NIVRA_POSTS__=${safeJson(previewPosts)}</script></body>`,
    );
}

async function main() {
  const posts = await loadPosts();
  await mkdir(outputRoot, { recursive: true });
  const blogRoot = await replaceGeneratedBlog();

  await writeFile(path.join(blogRoot, "index.html"), indexHtml(posts));
  await writeFile(
    path.join(blogRoot, "posts.json"),
    JSON.stringify(
      posts.map(
        ({ slug, title, description, date, category, readTime, url }) => ({
          slug,
          title,
          description,
          date,
          category,
          readTime,
          url,
        }),
      ),
      null,
      2,
    ),
  );
  for (const post of posts) {
    const directory = path.join(blogRoot, post.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), postHtml(post, posts));
  }

  await writeFile(path.join(outputRoot, "sitemap.xml"), sitemap(posts));
  await writeFile(path.join(outputRoot, "rss.xml"), rss(posts));
  await writeFile(
    path.join(outputRoot, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${absolute("/sitemap.xml")}\n`,
  );

  if (targetName === "dist") {
    const shell = await readFile(path.join(outputRoot, "index.html"), "utf8");
    const previewPosts = posts
      .slice(0, 2)
      .map(({ slug, title, description, date, category, readTime, url }) => ({
        slug,
        title,
        description,
        date,
        category,
        readTime,
        url,
      }));
    const { createServer } = await import("vite");
    const vite = await createServer({
      configFile: path.join(projectRoot, "vite.config.js"),
      server: { middlewareMode: true },
      appType: "custom",
      logLevel: "error",
    });
    try {
      const { renderPage } = await vite.ssrLoadModule("/src/entry-server.jsx");
      for (const page of config.pages) {
        const filename =
          page.path === "/"
            ? path.join(outputRoot, "index.html")
            : path.join(outputRoot, page.path.slice(1), "index.html");
        await mkdir(path.dirname(filename), { recursive: true });
        await writeFile(
          filename,
          enrichSpaShell(
            shell,
            page,
            renderPage(page.path, previewPosts),
            previewPosts,
          ),
        );
      }
      const notFound = shell
        .replace(
          /<title>[\s\S]*?<\/title>/,
          "<title>Page not found — NivraSolutions</title>",
        )
        .replace(
          /<meta\s+name="description"[^>]*>/,
          '<meta name="description" content="This page could not be found.">',
        )
        .replace("</head>", '<meta name="robots" content="noindex"></head>')
        .replace(
          '<div id="root"></div>',
          `<div id="root">${renderPage("/404/", previewPosts)}</div>`,
        );
      await writeFile(path.join(outputRoot, "404.html"), notFound);
    } finally {
      await vite.close();
    }
  }

  console.log(
    `Generated ${posts.length} blog posts, SEO files, and ${targetName === "dist" ? "page metadata" : "dev content"} in ${targetName}/`,
  );
}

await main();
