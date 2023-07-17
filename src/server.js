const app = require("./app");
const ConnectDb = require("./config/db");
const { serverPort } = require("./secret");

app.listen(serverPort, async () => {
  console.log(`Server is ruuning  at http://localhost:${serverPort}`);
  await ConnectDb();
});
