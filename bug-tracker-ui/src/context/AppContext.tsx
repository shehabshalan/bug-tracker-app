import { createContext, useContext, useState } from "react";
import { createTheme } from "@mui/material";

const appContext = createContext<any>({});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState("light");
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
  const [checked, setChecked] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serviceStatus, setServiceStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const [openType, setOpen] = useState({
    openMember: false,
    openTicket: false,
    openProject: false,
    openUser: false,
  });

  const handleClickOpen = (
    type: "openMember" | "openTicket" | "openProject" | "openUser"
  ) => {
    setOpen({ ...openType, [type]: true });
    // console.log(type);
  };

  const handleClose = () => {
    setOpen({
      ...openType,
      openMember: false,
      openTicket: false,
      openProject: false,
      openUser: false,
    });
  };

  return (
    <appContext.Provider
      value={{
        checked,
        serviceStatus,
        loading,
        mode,
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
