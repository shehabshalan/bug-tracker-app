import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Tickets from "./pages/Tickets";
import Settings from "./pages/Settings";
import { useAppContext } from "./context/AppContext";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

function App() {
  const { mode, setMode, theme } = useAppContext();

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
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
      </QueryClientProvider>
    </main>
  );
}

export default App;
