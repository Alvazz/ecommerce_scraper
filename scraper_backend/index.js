const express = require("express");
const cors = require("cors");

const { PORT } = require("./config/env");
const routes = require("./routes");

const routeLogger = require("./middlewares/router_logger_helper");

const app = express();

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors());

app.use("/api", routeLogger, routes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
