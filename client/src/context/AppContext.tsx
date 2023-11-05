import { createContext, useContext, useState } from "react";
import { createTheme } from "@mui/material";

const appContext = createContext<any>({});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
    },
    palette: {
      primary: {
        main: "#201c1c",
      },
      secondary: {
        main: "#f50057",
      },
    },
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const [openType, setOpen] = useState({
    openMember: false,
    openTicket: false,
    openProject: false,
    openUser: false,
    openEditTicket: false,
  });

  const handleClickOpen = (
    type:
      | "openMember"
      | "openTicket"
      | "openProject"
      | "openUser"
      | "openEditTicket"
  ) => {
    setOpen({ ...openType, [type]: true });
  };

  const handleClose = () => {
    setOpen({
      ...openType,
      openMember: false,
      openTicket: false,
      openProject: false,
      openUser: false,
      openEditTicket: false,
    });
  };

  return (
    <appContext.Provider
      value={{
        theme,
        openType,
        handleClickOpen,
        handleClose,
        setOpen,
        success,
        error,
        message,
        setSuccess,
        setError,
        setMessage,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}
