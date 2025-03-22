import "./index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { client } from "@/client";
import { App } from "./App";

client.setConfig({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  method: "GET",
  withCredentials: true,
});

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
