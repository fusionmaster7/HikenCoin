import express = require("express");
const router: express.Router = express.Router();

/* 
BASIC ENDPOINTS ARE:
    1. HOME
    2. /blocks FOR VIEWING ALL THE BLOCKS
    3. /blocks/mine  FOR MINING A BLOCK
    4. /peers FOR VIEWING PEERS
    5. /peers/add FOR ADDING
*/

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
