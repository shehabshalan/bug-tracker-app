import { Box, Button, Paper, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";

import React from "react";
import { useAppContext } from "../context/AppContext";

function ContentTab({
  children,
  title,
  buttonText,
  buttonAction,
}: {
  children: React.ReactNode;
  title: string;
  buttonText?: string;
  buttonAction?: string;
}) {
  const [value] = React.useState("1");
  const { handleClickOpen } = useAppContext();

  return (
    <Box sx={{ width: "100%", typography: "body1" }} component={Paper}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box
            sx={{
              display: "flex ",
              alignItems: "center ",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography>
              <strong>{title}</strong>
            </Typography>
            {buttonText && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleClickOpen(buttonAction)}
              >
                {buttonText}
              </Button>
            )}
          </Box>
        </Box>
        <TabPanel value="1">{children}</TabPanel>
      </TabContext>
    </Box>
  );
}

export default ContentTab;
