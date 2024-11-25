import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./global.less";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./themeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ThemeProvider>
);
