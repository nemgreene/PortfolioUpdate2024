import { Card, Box, Tooltip, useTheme } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function ColumnAdd({ style, containerStyle, props }) {
  const theme = useTheme();
  return (
    <Card sx={{ ...containerStyle, ml: 2, mt: 0.5, mr: 2 }}>
      <Box
        sx={{
          height: `100%`,
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          width: `calc(23vw - ${theme.spacing(2)})`,
          // p: theme.spacing(2),
          // m: 1,
        }}
        onClick={() => {
          props.openModal({ name: "AddColumn" });
        }}
      >
        <Tooltip title="Add Column">
          <AddCircleIcon
            sx={{
              opacity: ".25",
              fontSize: 80,
            }}
          />
        </Tooltip>
      </Box>
    </Card>
  );
}
