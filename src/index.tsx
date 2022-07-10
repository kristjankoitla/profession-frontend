import axios from "axios";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import FormView from "./views/app/FormView";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_LOCATION;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CookiesProvider>
    <FormView />
    <ToastContainer />
  </CookiesProvider>
);
