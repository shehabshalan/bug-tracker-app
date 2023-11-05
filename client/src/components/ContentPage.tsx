import { Box } from "@mui/material";
import React from "react";

function ContentPage({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        mb: { xs: "4rem" },
      }}
    >
      {children}
    </Box>
  );
}

export default ContentPage;
