import express = require("express");

const app: express.Application = express();

app.get("/", (req, res): void => {
  res.send("Working");
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
