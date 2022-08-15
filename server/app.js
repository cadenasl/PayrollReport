require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const employee = require("./routes/employee");
const weeklyTimeCard = require("./routes/weeklyTImeCard");
const app = express();

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(logger("dev"));

connectDB();
app.use(cors());
app.use("/employee", employee);
app.use("/timecard", weeklyTimeCard);
const Port = process.env.port || 4001;
app.listen(Port, () => {
  console.log(`server running on port ${Port}`);
});
