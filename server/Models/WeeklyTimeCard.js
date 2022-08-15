const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeeklyTimeCardSchema = new Schema(
  {
    employeeId: { type: String, required: true },
    name: { type: String, required: true },
    week: { type: Date, required: true },
    hoursWorked: { type: Number, required: true },
    weeklyPay: { type: Number, required: true },
    taxes: { type: Number },
    netPay: { type: Number },
  },
  { timestamps: true }
);

module.exports = WeeklyTimeCard = mongoose.model(
  "weeklyTimeCard",
  WeeklyTimeCardSchema
);
