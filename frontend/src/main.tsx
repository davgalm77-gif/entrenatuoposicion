import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import {
  GoogleOAuthProvider
} from "@react-oauth/google";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <BrowserRouter>

      <GoogleOAuthProvider
        clientId="525647677825-0skcg7r2t1vgt30tjbolqrdh8n1nbd6n.apps.googleusercontent.com"
      >

        <App />

      </GoogleOAuthProvider>

    </BrowserRouter>

  </StrictMode>
);