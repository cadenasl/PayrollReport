const WeeklyTimeCard = require("../Models/WeeklyTimeCard");
const Employee = require("../Models/Employee");
const moment = require("moment");

exports.createWeeklyTimeCard = async (req, res) => {
  const { name, employeeId, date, hoursWorked, weeklyPay, taxes, netPay } =
    req.body;
  console.log("req.body====", req.body);
  try {
    //edge case where employee wasnt created first
    const employee = await Employee.findOne({ name: name });
    console.log("employee===", employee, employee._id, employee.name);
    if (!employee) {
      return res.status(400).json({
        errorMessage:
          "Please create an Employee to database before creating weekly time card",
      });
    }
    const weeklyTimeCard = new WeeklyTimeCard({
      name: employee.name,
      employeeId: employee._id,
      week: date,
      hoursWorked: hoursWorked,
      weeklyPay: weeklyPay,
      taxes: taxes,
      netPay: netPay,
    });
    await weeklyTimeCard.save();

    await Employee.findByIdAndUpdate(
      employee._id,
      {
        $push: {
          weeklyReports: weeklyTimeCard,
        },
      },
      { new: true }
    );
    res.status(200).json({ msg: "succeeded" });
  } catch (error) {
    console.log(error);
    const err =
      (error.response && error.response.data) || error.response || error;
    const statusCode =
      (error.response && error.response.status) ||
      error.status ||
      error.statusCode ||
      500;
    res.status(statusCode).send(err);
  }
};

exports.modifyWeeklyTimeCard = async (req, res) => {
  const { employeeId, date, hoursWorked, weeklyPay, taxes, netPay } = req.body;
  const updatedTimeCard = WeeklyTimeCard.findOneAndUpdate(
    { date, employeeId },
    { hoursWorked, weeklyPay, taxes, netPay }
  );
  res.status(200).json({ timeCard: updatedTimeCard });
  try {
    //find if time card exist for week and add more to time card
  } catch (error) {
    console.log(error);
    const err =
      (error.response && error.response.data) || error.response || error;
    const statusCode =
      (error.response && error.response.status) ||
      error.status ||
      error.statusCode ||
      500;
    res.status(statusCode).send(err);
  }
};
