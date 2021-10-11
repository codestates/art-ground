require("dotenv").config();
const app = require("./app.js");
const PORT = process.env.HTTPS_PORT || 80;
const https = require("https");
const fs = require("fs");

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log("Express listening on port", PORT));
} else {
  server = app.listen(PORT, () => {
    console.log("Express listening on port", PORT);
  });
}
//
