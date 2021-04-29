//Require
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");
global.appRoot = path.resolve(__dirname);
const serverConfig = require(appRoot + "/config/serverConfig");


//Setting Port
app.set("port", (process.env.PORT || serverConfig.port));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Listen Port
app.listen(app.get("port"), () => {
  console.log("App is running on port: ", serverConfig.port);
});

//Welcome API
app.get("/", (req, res) => {
  res.send("Welcome to drive_explorer!");
});

//Require Services
const driveService = require('./services/driveService');



//Configure Services
driveService.configure(app);

