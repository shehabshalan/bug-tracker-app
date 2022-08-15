import React from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./context/AuthContext";

function ProtectedRoutes() {
  const { user } = useAuthContext();

  return user === null ? <Navigate to="/login" /> : <Sidebar />;
}

export default ProtectedRoutes;
