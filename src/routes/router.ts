import express = require("express");
const router: express.Router = express.Router();

router.get("/", (req, res) => {
  res.send("Home here");
});

router.get("/all", (req, res) => {
  res.send("View All chains here");
});

router.get("/peers", (req, res) => {
  res.send("View All peers here");
});

export default router;
