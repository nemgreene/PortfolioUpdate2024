import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashSidebar from "./DashSidebar";
import { Outlet } from "react-router-dom";

export default function DashContainer({ context, credentials, client }) {
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <DashSidebar
        credentials={credentials}
        client={client}
        open={open}
        context={context}
        handleDrawerOpen={() => setOpen(true)}
        handleDrawerClose={() => setOpen(false)}
      />
      <Box sx={{ mt: 10, width: "100%" }}>
        <Outlet context={context} />
      </Box>
    </Box>
  );
}
