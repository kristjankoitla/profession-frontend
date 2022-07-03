import axios from "axios";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./components/app/App";
import "./index.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_LOCATION;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CookiesProvider>
    <App />
    <ToastContainer />
  </CookiesProvider>
);
