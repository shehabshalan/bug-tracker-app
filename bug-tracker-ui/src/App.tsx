import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Tickets from "./pages/Tickets";
import Settings from "./pages/Settings";
import { useAppContext } from "./context/AppContext";
import ProjectDetails from "./pages/ProjectTickets";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const { theme } = useAppContext();

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </main>
  );
}

export default App;
