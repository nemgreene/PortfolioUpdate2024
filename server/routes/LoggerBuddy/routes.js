const express = require("express");
// const Stream = require("./models/Stream");
const Stream = require("../../models/LoggerBuddy/StreamV2");
const Post = require("../../models/LoggerBuddy/Post");
require("dotenv").config();
const User = require("../../models/LoggerBuddy/User");
const Scrum = require("../../models/LoggerBuddy/Scrum");
const { uuid } = require("uuidv4");
const mongoose = require("mongoose");

const router = express.Router();

//get stream headers
router.get("/streams/headers", async (req, res, next) => {
  try {
    const streams = await Stream.find({});
    // const output = streams.map(({ posts, ...rest }) => rest);
    let ret = streams.map((o) => {
      const { posts, _id, links, ...rest } = o.toObject();
      let stringLinks = links.map((link) => JSON.parse(link));
      return {
        ...rest,
        links: stringLinks,
        streamId: o._id,
        posts: posts.length,
      };
    });
    res.send(ret);
    return;
  } catch (e) {
    res.send(e);
  }
});

//get posts and stream headers by tag/filter
router.post("/posts/tagged", async (req, res, next) => {
  try {
    let { tags, page, trackedStream } = req.body;
    console.log(trackedStream);
    page -= 1;

    console.log(tags);

    const streamFilter =
      trackedStream.length > 0
        ? {
            $or: trackedStream.map((_id) => ({
              _id: new mongoose.Types.ObjectId(_id),
            })),
          }
        : {};

    const taggedFilter =
      tags.length > 0
        ? {
            $or: tags.map((tags) => ({ tags })),
          }
        : {};

    const taggedStreams = await Stream.aggregate([
      {
        $match: {
          $and: [taggedFilter, streamFilter],
        },
      },
    ])
      .sort({ datePosted: -1 })
      .exec();

    const scrums = await Scrum.aggregate([
      {
        $match: {
          $or: taggedStreams.map((v) => ({
            streamId: new mongoose.Types.ObjectId(v._id),
          })),
        },
      },
    ]).exec();

    // find scrums for tagged streams
    // console.log(taggedStreams.map((v) => [v._id, v.streamName]));
    let streams = taggedStreams.map((o) => {
      const { posts, _id, links, ...rest } = o;
      let stringLinks = links.map((link) => JSON.parse(link));
      return {
        ...rest,
        links: stringLinks,
        streamId: o._id,
        posts: posts.length,
      };
    });
    if (!streams.length > 0) {
      return res.status(200).send({ posts: [], streams: [] });
    }

    // const posts = await Post.find(postFilter).sort({ datePosted: -1 });

    const postFilter =
      trackedStream.length > 0
        ? {
            $or: trackedStream.map((_id) => ({
              streamId: new mongoose.Types.ObjectId(_id),
            })),
          }
        : {};

    const postsv2 = await Post.aggregate([
      {
        $match: {
          $and: [
            {
              $or: taggedStreams.map((stream) => ({ streamId: stream._id })),
            },
            postFilter,
          ],
        },
      },
    ])
      .sort({ datePosted: -1 })
      .exec();

    const postsv3 = postsv2.map((v) => {
      const hasScrum =
        scrums.findIndex((t) => t.streamId.equals(v.streamId)) !== -1
          ? { hasScrum: true }
          : {};

      return { ...hasScrum, ...v };
    });

    res
      .status(200)
      .send({ streams, posts: postsv3.slice(page * 5, page * 5 + 5) });
    return;
  } catch (e) {
    res.send(e);
  }
});

router.get("/post/:_id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params._id });
  const stream = await Stream.findOne({ _id: post.streamId });
  const posts = await Post.find({ streamId: post.streamId });
  res.send({ target: post, siblings: posts, stream });
});

// router.get("/posts/:streamId", async (req, res) => {
//   let page = req.headers.page - 1;
//   const posts = await Post.find({ streamId: req.params.streamId }).sort({
//     datePosted: -1,
//   });
//   res.send(posts.slice(page * 5, page * 5 + 5));
// });

router.post("/login", async (req, res) => {
  const admin = await User.findOne({});
  const { password, ...rest } = admin.toObject();
  if (req.body.password === process.env.PASSWORD) {
    res.status(200).send({ ...rest });
  } else {
    res.status(400).send({ error: "Invalid Credentials" });
  }
});

//SCRUM BOARD
router.get("/scrumData/:trackedStream", async (req, res) => {
  const { trackedStream } = req.params;
  //verify stream exists
  const stream = await Stream.findOne({
    _id: new mongoose.Types.ObjectId(trackedStream),
  });

  const scrum = await Scrum.findOne({ streamId: trackedStream });
  if (!scrum) {
    return res
      .status(201)
      .send({ error: "Scrum not found", streamName: stream.streamName });
  }
  const labels = [
    ...new Set(
      scrum.tasks
        .reduce((acc, curr) => {
          return [...acc, curr.labels];
        }, [])
        .flat(1)
        .map((v) => JSON.stringify(v))
    ),
  ].map((v) => JSON.parse(v));

  res.send({ ...scrum.toObject(), streamName: stream.streamName, labels });
});

module.exports = router;
