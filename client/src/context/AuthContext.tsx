import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { endpoints } from "../api/endpoints";
import request from "../api/request";

const AuthContext = createContext<any>({} as any);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(localStorage.getItem("user") || {});
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await request.post(endpoints.login, {
        email,
        password,
      });
      if (res.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
        localStorage.setItem("user", JSON.stringify(res.data.user));
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
    localStorage.removeItem("user");
    setToken(null);
    setUser({});
  };

  const getUserRole = () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (!token) {
      return null;
    }
    const user = jwt_decode(token) as any;
    return user.role;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    try {
      setLoading(true);
      await request.post(endpoints.adminSignUp, {
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

  const getMembers = async () => {
    try {
      const res = await request.get(endpoints.getAllMembers);
      setMembers(res.data.result);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const refetchMembers = async () => {
    await getMembers();
  };

  const verify = async () => {
    try {
      await request.get(endpoints.verifySession);
    } catch (error: any) {
      logout();
    }
  };

  useEffect(() => {
    verify();
    getMembers();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        refetchMembers,
        user,
        getUserRole,
        members,
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
