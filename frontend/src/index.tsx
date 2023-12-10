/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./styles/index.css";
import i18n from "./modules/i18n"
import { I18nextProvider } from "react-i18next";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <I18nextProvider i18n={i18n}>
    <Router />
  </I18nextProvider>
);
