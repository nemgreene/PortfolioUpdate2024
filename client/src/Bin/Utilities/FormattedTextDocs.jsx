import { Box, Button, Link, Grid, Typography } from "@mui/material";
import React from "react";

export default function FormattedTextDocs() {
  return (
    <Grid container sx={{ pt: 3 }}>
      <Grid
        item
        sx={{
          p: 1,
          pb: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant={"body2"}>Formatter Docs:</Typography>
      </Grid>
      <Grid
        item
        sx={{
          p: 1,
          pb: 0,
          flex: 1,
        }}
      >
        <Button
          fullWidth
          href="https://remarkjs.github.io/react-markdown/"
          target="_blank"
        >
          remarkjs
        </Button>
      </Grid>
      <Grid
        item
        sx={{
          p: 1,
          pb: 0,
          flex: 1,
        }}
      >
        <Button
          fullWidth
          xs={12}
          md={6}
          href="https://commonmark.org/help/"
          target="_blank"
        >
          commonMark
        </Button>
      </Grid>
      <Grid
        item
        sx={{
          p: 1,
          pb: 0,
          flex: 1,
        }}
      >
        <Button
          fullWidth
          xs={12}
          md={6}
          href="https://github.github.com/gfm/#inlines"
          target="_blank"
        >
          gfm
        </Button>
      </Grid>
    </Grid>
  );
}
