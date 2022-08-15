import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { Endpoints } from "../services/endpoints";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext<any>({} as any);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState();
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
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    try {
      setLoading(true);
      const res = await axios.post(Endpoints.adminSignUp, {
        email,
        password,
        passwordConfirmation,
        name,
        role: "admin",
      });

      window.location.href = "/login";
    } catch (error: any) {
      setLoading(false);
      alert(error.response.data);
    }
  };
  // const verify = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const decoded = jwt_decode(token);
  //       const res = await axios.get(Endpoints.verifySession, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (res.data.user) {
  //         setUser(res.data.user);
  //       }
  //     }
  //   } catch (error: any) {
  //     alert(error.response.data);
  //   }
  // };
  // useEffect(() => {
  //   verify();
  // }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        signup,
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
