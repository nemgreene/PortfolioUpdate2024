import React, { useState, useRef, Children } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pictures from "./Pictures";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import { Link, useNavigate } from "react-router-dom";
import { linkIcons } from "./Utility";
import { Box, Tooltip } from "@mui/material";
import FormattedText from "../../Utilities/FormattedText";
import PageviewIcon from "@mui/icons-material/Pageview";
import PostSkeleton from "./PostSkeleton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  whiteSpace: " pre-line",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const cardStyles = {
  margin: "10px 0px 10px 0px",
  padding: "5px 15px",
  width: "100%",
};

function ContentCard({
  postObj,
  trackedStream,
  changeTrackedStream,
  changeScrollRef,
  credentials,
  openEditModal,
  changeEditPost,
  page = false,
  streamTracking = true,
  children,
}) {
  const [expanded, setExpanded] = useState(false);
  const myRef = useRef(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        ...cardStyles,
        backgroundColor: postObj.displayCard ? postObj.color + "20" : "none",
      }}
      ref={myRef}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ backgroundColor: postObj["color"] ? postObj.color : "" }}
            aria-label="recipe"
          >
            {postObj["streamName"] ? postObj.streamName[0] : ""}
          </Avatar>
        }
        action={
          <>
            {credentials?.accessToken ? (
              <Tooltip title="Edit Post">
                <IconButton
                  aria-label="follow_stream"
                  onClick={() => {
                    changeEditPost({ ...postObj });
                    openEditModal();
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : null}
            {postObj.displayCard ? (
              false
            ) : !trackedStream?.length > 0 ? (
              streamTracking ? (
                <Tooltip title="Track This Stream">
                  <IconButton
                    aria-label="follow_stream"
                    onClick={() => {
                      changeTrackedStream([postObj.stream]);
                      changeScrollRef(postObj._id);
                    }}
                  >
                    <AccountTreeIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                false
              )
            ) : (
              <Tooltip title="Untrack Stream">
                <IconButton
                  aria-label="all_streams"
                  onClick={() => {
                    changeTrackedStream((p) =>
                      [...p].filter((s) => s.streamId !== postObj.streamId)
                    );
                  }}
                >
                  <AssignmentReturnIcon />
                </IconButton>
              </Tooltip>
            )}
            {!page ? (
              <Tooltip title="Page View">
                <IconButton
                  aria-label="page_viwew"
                  onClick={() => {
                    console.log(postObj._id);
                    navigate(`/loggerBuddy/post/${postObj._id}`);
                  }}
                >
                  <PageviewIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </>
        }
        title={postObj["streamName"] ? postObj.streamName : ""}
        subheader={`${postObj.displayCard ? "Created" : "Posted"}: ${
          postObj["datePosted"]
            ? new Date(postObj.datePosted).toDateString()
            : new Date().toDateString()
        }`}
      />
      {postObj["images"] && postObj["images"][0] ? (
        <Pictures images={postObj.images} />
      ) : null}
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {postObj.h1}
        </Typography>
        <br />
        <Typography
          variant="h6"
          sx={{ paddingBottom: "7px" }}
          color="text.secondary"
        >
          {postObj.h2}
        </Typography>
        <FormattedText>{postObj.body}</FormattedText>
        {children}
      </CardContent>
      <CardActions disableSpacing>
        {postObj.hasScrum && (
          <Link to={`scrum/${postObj.streamId}`}>
            <Tooltip title={"Scrum Board"}>
              <IconButton aria-label={"Scrum Board"}>
                <LogoDevIcon />
              </IconButton>
            </Tooltip>
          </Link>
        )}

        {postObj?.stream?.links.map((v, k) => {
          return (
            <Tooltip key={k} title={v.tooltip}>
              <a target="_blank" href={v.url}>
                <IconButton aria-label={v.tooltip}>
                  {linkIcons[v.icon]}
                </IconButton>
              </a>
            </Tooltip>
          );
        })}

        {postObj.cut ? (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{ whiteSpace: " pre-line" }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        ) : null}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <FormattedText>{postObj.cut}</FormattedText>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default function PostCard({
  postObj,
  trackedStream,
  changeTrackedStream,
  changeScrollRef,
  credentials,
  openEditModal,
  changeEditPost,
  page = false,
  streamTracking,
  compact = false,
  children,
}) {
  const theme = useTheme();
  if (compact) {
    return (
      <Card
        sx={{
          ...cardStyles,
          overflow: "hidden",
          height: "100%",
        }}
      >
        <CardContent sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              pb: 1,
            }}
          >
            <Typography sx={{ flex: 1 }} variant="h5" color="text.secondary">
              {postObj.h1}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {postObj.h2}
            </Typography>
          </Box>
          <Box sx={{ pb: 2 }}>
            {postObj["images"] && postObj["images"][0] ? (
              <Pictures images={postObj.images} compact={true} />
            ) : (
              false
            )}
          </Box>
          <FormattedText>{postObj.body}</FormattedText>
        </CardContent>
      </Card>
    );
  }
  return postObj ? (
    <ContentCard
      postObj={postObj}
      trackedStream={trackedStream}
      changeTrackedStream={changeTrackedStream}
      changeScrollRef={changeScrollRef}
      credentials={credentials}
      openEditModal={openEditModal}
      changeEditPost={changeEditPost}
      page={page}
      streamTracking={streamTracking}
      children={children}
    />
  ) : (
    // skeleton post
    <PostSkeleton>{children}</PostSkeleton>
  );
}
