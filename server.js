const express = require("express");
const cors = require("cors");
const { getAllRoutes } = require("./routes/routes");
const dbConnection = require("./db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(cors());

getAllRoutes(app);

app.listen(9000, () =>
{
  console.log("running on 9000");
});
