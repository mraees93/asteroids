import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./state/store";

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
