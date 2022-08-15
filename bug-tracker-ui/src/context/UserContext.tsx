import React from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import lodash from "lodash";
import { Endpoints } from "../services/endpoints";
const UserContext = createContext<any>({} as any);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <UserContext.Provider
      value={{
        open,
        handleClickOpen,
        handleClose,
        setOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
