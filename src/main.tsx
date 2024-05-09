import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import { Layout } from "./components/Layout/Layout";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout />
    <Analytics />
  </React.StrictMode>
);
