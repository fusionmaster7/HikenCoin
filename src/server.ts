import express = require("express");
import router from "./routes/router";

const PORT: number | string = process.env.PORT || 8000;

const app: express.Application = express();

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
