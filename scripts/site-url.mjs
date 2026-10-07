export function resolveSiteUrl(config) {
  const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const candidate =
    process.env.SITE_URL ||
    (productionDomain ? `https://${productionDomain}` : config.siteUrl);

  let url;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error(
      "Set a valid HTTPS site URL in SITE_URL or seo.config.json.",
    );
  }

  if (
    url.protocol !== "https:" ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error("The canonical site URL must be an HTTPS origin only.");
  }

  return url.origin;
}
