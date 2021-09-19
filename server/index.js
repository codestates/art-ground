require("dotenv").config();
const app = require("./app.js");
const PORT = process.env.HTTPS_PORT || 80;
const https_PORT = 443;
const https = require("https");
const fs = require("fs");

// healthcheck
// app.get("/health-check", (req, res) => {
//   res.send("Health Success");
// });

// redirect
// 로드 밸런싱 사용 시 Header에 X-Forwarded-Proto 포함되어 요청됨
// if (process.env.APP_ENV === "production") {
// app.use(function (req, res, next) {
//   if (!req.secure && req.get("X-Forwarded-Proto") !== "https") {
//     res.redirect("https://" + req.get("Host") + req.url);
//   } else next();
// });
// }

// https
//   .createServer(
//     {
//       key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
//       cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
//     },
//     function (req, res) {
//       res.write("hello world!");
//       res.end();
//     }
//   )
//   .listen(PORT, () => {
//     console.log("Express listening on port", PORT);
//   });

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
