const http = require("http");
require("dotenv").config();
const app = require("./app");

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// const express = require("express");
// const { spawn } = require("child_process");
// const app = express();
// const port = process.env.PORT || 8080;
// app.get("/leerTemperatura", (req, res) => {
//   var dataToSend;
//   // spawn new child process to call the python script
//   const python = spawn("python3", ["script1.py"]);
//   // collect data from script
//   python.stdout.on("data", function (data) {
//     console.log("Pipe data from python script ...");
//     dataToSend = data.toString();
//   });
//   // in close event we are sure that stream from child process is closed
//   python.on("close", (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // send data to browser
//     res.send(dataToSend);
//   });
// });
// app.listen(port, () =>
//   console.log(`Example app listening on port
// ${port}!`)
// );
