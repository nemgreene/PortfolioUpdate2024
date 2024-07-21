import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostSkeleton from "../../PostSkeleton";
import PostCard from "../../PostCard";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { taggedParams } from "../../Utility";
const Moment = require("moment");

export default function PostPage({ client, credentials }) {
  const [postObj, setPostObj] = useState({});
  const [streamData, setStreamData] = useState();
  const [olderSiblings, setOlderSiblings] = useState();
  const [youngerSiblings, setYoungerSiblings] = useState();
  const [loading, setLoading] = useState(true);

  const { postId } = useParams();
  const theme = useTheme();

  const loadPost = async () => {
    const res = await client.getPost(postId);
    if (!res.data) {
      client.redirect("/loggerBuddy");
      return;
    }
    setPostObj(res.data.target);
    setStreamData(res.data.stream);

    setYoungerSiblings(
      res.data.siblings
        .filter(
          (v) =>
            new Moment(v.datePosted) < new Moment(res.data.target.datePosted)
        )
        .reverse()
    );
    setOlderSiblings(
      res.data.siblings.filter(
        (v) => new Moment(v.datePosted) > new Moment(res.data.target.datePosted)
      )
    );
    setLoading(false);
    // setSiblings(res.data.siblings);
  };

  useEffect(() => {
    loadPost();
  }, [postId]);

  useEffect(() => {}, [youngerSiblings, olderSiblings]);

  const PreviewPost = ({ next = true, postObj = undefined }) => {
    let active =
      (!next && youngerSiblings && youngerSiblings[0]) ||
      (next && olderSiblings && olderSiblings[0]);
    if (loading) {
      return <PostSkeleton />;
    }
    return (
      <Box
        sx={{
          overflow: "hidden",
          position: "relative",
          height: "25vh",
        }}
      >
        {/* OVERLAY */}
        {active || !postObj ? (
          <Card
            onClick={() => {
              if (!active) {
                return;
              }
              let targ = next ? olderSiblings[0] : youngerSiblings[0];
              if (!targ._id) {
                client.modalHandler(400, "Sorry, something went wrong");
                client.redirect("/loggerBuddy");
              }
              client.redirect(`/loggerBuddy/post/${targ._id}`);
            }}
            sx={{
              cursor: active ? "pointer" : "auto",
              zIndex: 2,
              position: "absolute",
              width: "100%",
              height: "100%",
              background: `linear-gradient(#00000000, ${theme.palette.background.paper})`,
            }}
          >
            <CardContent
              sx={{
                alignItems: "flex-end",
                justifyContent: next ? "flex-start" : "flex-end",
                height: "100%",
                display: "flex",
              }}
            >
              <Typography variant={"h5"} sx={{ p: 2 }}>
                {!postObj
                  ? `No ${next ? "Newer" : "Older"} Posts`
                  : next
                  ? "Newer Posts"
                  : "Older Posts"}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
        {/* UNderlay */}
        <PostCard
          trackedStream={streamData}
          compact={true}
          postObj={postObj || {}}
          page={true}
          streamTracking={false}
        />
      </Box>
    );
  };

  const streamTags = () => {
    if (!streamData || !streamData.links) {
      return;
    }
    return (
      <Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
        <Typography variant="subtitle1" sx={{ pr: 1 }}>
          Tags:
        </Typography>
        {streamData.tags.map((v, i) => (
          <Typography variant={"subtitle2"} sx={{ pr: 0.5 }} key={i}>
            <Link
              to={taggedParams({
                url: { pathname: "/loggerBuddy" },
                tags: [v],
                streams: [],
              })}
            >
              {v}
            </Link>
            {/* {v} {i !== streamData.tags.length - 1 ? "," : ""} */}
          </Typography>
        ))}
      </Box>
    );
  };

  return (
    <Box
      className="utilCenter"
      sx={{
        flexDirection: "column",
        width: "100vw",
      }}
    >
      {/*
       */}
      <Box sx={{ width: "80vw", p: 1 }}>
        {postObj._id ? (
          <PostCard
            // activeTags={activeTags}
            page={true}
            // trackedStream={}
            credentials={credentials}
            postObj={postObj}
            streamTracking={false}
          />
        ) : (
          <PostSkeleton />
        )}
      </Box>

      {/* More about bar */}
      <Typography className="utilCenter" variant={"h6"}>
        More about {postObj.streamName}
      </Typography>
      {streamData ? (
        <Grid container sx={{ width: "80vw", p: 1 }}>
          <PostCard
            page={true}
            trackedStream={streamData}
            credentials={credentials}
            postObj={{
              streamId: streamData.streamId,
              h1: `${streamData.posts.length} Post${
                streamData.posts.length > 1 ? "s" : ""
              }`,
              body: `${streamData.streamDescription}`,
              h2: "Stream Description: ",
              datePosted: streamData.dateCreated,
              displayCard: true,
              color: streamData.color,
              streamName: streamData.streamName,
              images: [],
              stream: streamData,
              hasScrum: credentials._id && credentials.accessToken,
            }}
          >
            <Box>{streamTags()}</Box>
          </PostCard>
        </Grid>
      ) : null}
      <Grid container sx={{ width: "80vw", pb: 10 }}>
        <Grid item xs={6} sx={{ p: 1, height: "100%" }}>
          <PreviewPost postObj={olderSiblings ? olderSiblings[0] : null} />
        </Grid>
        <Grid item xs={6} sx={{ p: 1 }}>
          <PreviewPost
            postObj={youngerSiblings ? youngerSiblings[0] : null}
            next={false}
          />
        </Grid>
      </Grid>
      {/* Post */}
    </Box>
  );
}
