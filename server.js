const app = require("./app");
const mongose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT;

(async () => {
  await mongose.connect(process.env.MONGO_URL);
  console.log("MongoDB Contected :))");
})();

app.listen(port, () => {
  console.log(`Server running  on port ${port} `);
});
