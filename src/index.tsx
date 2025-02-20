import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@pages/App";
import { Web3Provider } from "@/pages/Web3Provider";
const container = document.getElementById("app");
const root = createRoot(container!);
import "./style.css";
root.render(
  <Web3Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Web3Provider>
);
