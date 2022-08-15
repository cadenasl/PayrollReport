const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: true },
    isCurrent: { type: Boolean },
    weeklyReports: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "weeklyTimeCard",
    },
  },
  { timestamps: true }
);

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
