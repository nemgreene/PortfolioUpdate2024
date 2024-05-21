module.exports = (app) => {
  app.get("/checkServer", async (req, res) => {
    console.log("arriving");
    return res.send(true);
  });
};
