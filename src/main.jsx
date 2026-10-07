import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./styles.css";
import "./professional.css";
const root = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter>
      <App initialPosts={window.__NIVRA_POSTS__ ?? []} />
    </BrowserRouter>
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
