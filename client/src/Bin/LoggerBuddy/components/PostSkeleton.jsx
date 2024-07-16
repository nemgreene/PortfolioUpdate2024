import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const cardStyles = {
  margin: "10px 0px 10px 0px",
  padding: "5px 15px",
  width: "100%",
};

export default function PostSkeleton() {
  return (
    <Card sx={{ ...cardStyles }}>
      <CardContent>
        <Stack spacing={1}>
          <Grid container>
            <Grid item container xs={8} justifyContent={"center"}>
              <Skeleton variant="rectangular" width={"100%"} height={"30vh"} />
            </Grid>
            <Grid item container xs={4} justifyContent={"center"}>
              <Grid
                item
                container
                justifyContent={"center"}
                xs={12}
                sx={{ pl: 1, pb: 0.5 }}
              >
                <Skeleton variant="rectangular" width={"90%"} height={"100%"} />
              </Grid>
              <Grid
                item
                container
                justifyContent={"center"}
                xs={12}
                sx={{ pl: 1, pt: 0.5 }}
              >
                <Skeleton variant="rectangular" width={"90%"} height={"100%"} />
              </Grid>
            </Grid>
          </Grid>
          <Skeleton variant="rounded" width={"50%"} height={60} />
          <Skeleton variant="rounded" width={"100%"} height={200} />
        </Stack>
      </CardContent>
    </Card>
  );
}
