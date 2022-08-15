import React from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./context/AuthContext";

function ProtectedRoutes() {
  const { token } = useAuthContext();

  return token === null ? <Navigate to="/login" /> : <Sidebar />;
}

export default ProtectedRoutes;
