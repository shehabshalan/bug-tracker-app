import React from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function ProtectedRoutes() {
  const [user, setUser] = React.useState(null);
  return <Sidebar />;
}

export default ProtectedRoutes;
