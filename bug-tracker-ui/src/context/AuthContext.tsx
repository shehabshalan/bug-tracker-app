import React from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { Endpoints } from "../services/endpoints";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext<any>({} as any);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  function login(email: string, password: string) {
    setLoading(true);
    return axios
      .post(Endpoints.login, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("token", JSON.stringify(res.data.token));
          setLoading(false);
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  }
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
