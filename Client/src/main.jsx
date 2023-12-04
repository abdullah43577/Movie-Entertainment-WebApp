import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Sass/styles.scss";
import { AuthProvider } from "./components/Auth/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
