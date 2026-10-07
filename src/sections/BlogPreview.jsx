import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default function BlogPreview({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    if (initialPosts.length) return;
    const controller = new AbortController();
    fetch("/blog/posts.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Blog index unavailable");
        return response.json();
      })
      .then((items) => setPosts(items.slice(0, 2)))
      .catch((error) => {
        if (error.name !== "AbortError") console.warn(error);
      });
    return () => controller.abort();
  }, [initialPosts]);

  return (
    <section className="blog-preview wrap">
      <Reveal className="home-split-head">
        <span className="kicker">04 / Insights</span>
        <h2>Insights on software and digital products.</h2>
      </Reveal>
      <div className="blog-preview-list">
        {posts.map((post, index) => (
          <article key={post.slug}>
            <span className="blog-preview-number">0{index + 1}</span>
            <div>
              <span className="blog-preview-meta">
                {post.category} · {formatDate(post.date)}
              </span>
              <h3>
                <a href={post.url}>{post.title}</a>
              </h3>
              <p>{post.description}</p>
            </div>
            <a href={post.url} aria-label={`Read ${post.title}`}>
              ↗
            </a>
          </article>
        ))}
      </div>
      <a className="text-link" href="/blog/">
        All notes <span>↗</span>
      </a>
    </section>
  );
}
