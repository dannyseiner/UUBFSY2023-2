import ReactDOM from "react-dom/client";
import App from "./Router";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
