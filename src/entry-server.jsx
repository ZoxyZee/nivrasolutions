import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import App from "./App";

export function renderPage(pathname, initialPosts) {
  return renderToString(
    <MemoryRouter initialEntries={[pathname]}>
      <App initialPosts={initialPosts} />
    </MemoryRouter>,
  );
}
