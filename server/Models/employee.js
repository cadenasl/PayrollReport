const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    employeeName: { type: String, required: true },
    isCurrent: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = Employee = mongoose.model("employee", employeeSchema);
