import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Contact() {
  const theme = useTheme();
  const navigate = useNavigate();

  const elems = [
    [<span>MANCHESTER*</span>, <span>GB</span>],
    [
      <span>
        <a
          style={{
            color: "inherit",
          }}
          target="_blank"
          href="https://nemgreene.artstation.com/"
        >
          ARTSTATION
        </a>
      </span>,
      <span>
        <Link
          style={{
            color: "inherit",
          }}
          to="/loggerBuddy"
          target="_blank"
        >
          BLOG
        </Link>
      </span>,
      <span>
        <a
          style={{
            color: "inherit",
          }}
          target="_blank"
          href="https://github.com/nemgreene"
        >
          GITHUB
        </a>
      </span>,
      //   <span>BLOG</span>,
    ],

    [
      <span>
        <a
          style={{
            color: "inherit",
          }}
          href="mailto: vincent.r.greene@gmail.com"
        >
          VINCENT.R.GREENE@GMAIL.COM
        </a>
      </span>,
    ],
  ];
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        bgcolor: theme.palette.common.eerieBlack,
        color: theme.palette.common.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "fit-content",
          height: "fit-content",
          p: 3,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          zIndex: 500,
        }}
      >
        <Button
          sx={{
            p: 0,
            height: { xs: "30px", sm: "40px", lg: "50px" },
            width: { xs: "30px", sm: "40px", lg: "50px" },
          }}
          disableRipple={true}
          onClick={() => {
            navigate("/");
          }}
        >
          <Grid item sx={{ height: "inherit", width: "inherit" }}>
            <svg width={"inherit"} height={"inherit"} viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="50"
                fill={theme.palette.common.white}
              />
            </svg>
          </Grid>
          <Grid sx={{ height: "inherit" }} item>
            <Typography
              variant="h6"
              style={{ color: theme.palette.common.lightCoral }}
            >
              VG
            </Typography>
          </Grid>
        </Button>
      </Grid>
      <Grid
        item
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "fit-content",
        }}
      >
        {elems.map((v, i) => (
          <Grid
            item
            container
            key={i}
            sx={{ width: "100%", justifyContent: "space-between" }}
          >
            {v.map((s, index) => (
              <Grid item key={index}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "justify",
                    width: "100%",
                  }}
                >
                  {s}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
