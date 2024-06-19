const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

//import your models
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_STRING);
// // using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json({ limit: "5mb" }));

// // enabling CORS for all requests
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, profilerefid(whatever header you need)"
  );
  next();
});

app.use(express.static("./uploads"));

const LoggerBuddyRouter = require("./routes/LoggerBuddy/routes");
const LoggerBuddyProtectedRouter = require("./routes/LoggerBuddy/protectedRotues");
const User = require("./models/LoggerBuddy/User");

const authenitcate = async (req, res, next) => {
  const user = await User.findOne({ _id: req.headers.userid });
  if (user.sessionCookie === req.headers.accesstoken) {
    return next();
  } else res.status(404).send({ error: "Invalid Credentials" });
};

app.use("/loggerBuddy/", LoggerBuddyRouter);
app.use("/loggerBuddy/admin", authenitcate, LoggerBuddyProtectedRouter);

// Step 1:
app.use(express.static(path.resolve(__dirname, "../client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
