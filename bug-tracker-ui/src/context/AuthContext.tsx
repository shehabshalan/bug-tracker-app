import React from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { Endpoints } from "../services/endpoints";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext<any>({} as any);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axios.post(Endpoints.login, {
        email,
        password,
      });
      if (res.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        setLoading(false);
        window.location.href = "/";
      }
    } catch (error: any) {
      setLoading(false);
      alert(error.response.data);
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

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
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
