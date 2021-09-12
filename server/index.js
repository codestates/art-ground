require("dotenv").config();
const app = require("./app.js");
const PORT = process.env.HTTPS_PORT || 80;

app.listen(PORT, () => {
  console.log("Express listening on port", PORT);
});
