import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import Home from "./components/Home.jsx";
import AuthGuard from "./components/AuthGuard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthGuard>
        <Home />
      </AuthGuard>
    </BrowserRouter>
  </StrictMode>
);