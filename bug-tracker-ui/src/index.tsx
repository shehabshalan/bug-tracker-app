import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
);
