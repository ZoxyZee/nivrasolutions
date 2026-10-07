import { readFile } from "node:fs/promises";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function serveGeneratedBlog() {
  return {
    name: "serve-generated-blog",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (!["GET", "HEAD"].includes(request.method)) return next();

        const pathname = new URL(request.url, "http://localhost").pathname;
        if (pathname === "/blog") {
          response.statusCode = 301;
          response.setHeader("Location", "/blog/");
          response.end();
          return;
        }

        const match = pathname.match(
          /^\/blog\/(?:([a-z0-9]+(?:-[a-z0-9]+)*)\/)?$/,
        );
        if (!match) return next();

        const filename = match[1]
          ? new URL(`./public/blog/${match[1]}/index.html`, import.meta.url)
          : new URL("./public/blog/index.html", import.meta.url);

        try {
          const html = await readFile(filename);
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          response.setHeader("Cache-Control", "no-store");
          response.end(request.method === "HEAD" ? undefined : html);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [serveGeneratedBlog(), react()],
  build: { outDir: "dist" },
});
