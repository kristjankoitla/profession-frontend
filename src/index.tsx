import axios from "axios";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8080";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
