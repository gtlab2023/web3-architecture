import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@pages/App";
const container = document.getElementById("app");
const root = createRoot(container!);
import "./style.css";
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
