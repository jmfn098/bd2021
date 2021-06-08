const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require("path");
require("dotenv").config();
const app = express();
const db = require("./model");

db.sequelize.sync();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const authRouter = require("./controllers/auth");
const funcionarioRouter = require("./controllers/funcionarios");
const temperaturaRouter = require("./controllers/temperatura");

app.use("/api/funcionarios", funcionarioRouter);
app.use("/api/temperaturas", temperaturaRouter);
app.use("/api/auth", authRouter);


app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

module.exports = app;
