const WeeklyTimeCard = require("../Models/WeeklyTimeCard");
const Employee = require("../Models/Employee");
const moment = require("moment");

exports.createWeeklyTimeCard = async (req, res) => {
  const { name, week, hoursWorked, weeklyPay, taxes, netPay } =
    req.body.submissiondata;
  console.log("req.body====", req.body);
  try {
    //edge case where employee wasnt created first
    const employee = await Employee.findOne({ name: name });
    console.log("employee===", employee, employee._id, employee.name);
    if (!employee) {
      return res.status(400).json({
        message:
          "Please create an Employee to database before creating weekly time card",
      });
    }
    const weeklyTimeCard = new WeeklyTimeCard({
      name: employee.name,
      employeeId: employee._id,
      week: week,
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
exports.getTimeCard = async (req, res) => {
  const { _id } = req.body;
  try {
    const timeCard = await WeeklyTimeCard.findById(_id);

    res.status(200).json({ timeCard: timeCard });
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
  const { _id, week, hoursWorked, weeklyPay, taxes, netPay } =
    req.body.submissiondata;
  console.log(req.body.submissiondata);

  try {
    //find if time card exist for week and add more to time card
    const updatedTimeCard = await WeeklyTimeCard.findOneAndUpdate(
      { _id: _id },
      { hoursWorked, weeklyPay, taxes, netPay, week },
      { new: true }
    );
    console.log("updatedTimeCard====", updatedTimeCard);
    res.status(200).json({ timeCard: updatedTimeCard });
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

exports.generateAllWeeklyReports = async (req, res) => {
  const { date } = req.body;
  try {
    const report = await WeeklyTimeCard.aggregate([
      [
        { $sort: { name: -1, week: -1 } },
        {
          $lookup: {
            from: "employees",
            localField: "name",
            foreignField: "name",
            as: "employeeInfo",
          },
        },
      ],
    ]);
    console.log(report);
    res.status(200).json({ report: report });
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
exports.groupByWeek = async (req, res) => {
  try {
    const report = await WeeklyTimeCard.aggregate([
      {
        $group: {
          name: "$name",
        },
      },
      {
        $group: {
          _id: { $week: "$week" },
          totalHours: { $sum: "$hoursWorked" },
        },
      },
    ]);
    console.log(report);
    res.status(200).json({ report: report });
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
exports.generatebyWeek = async (req, res) => {
  const { date } = req.body;
  const endingWeek = moment(date).add(7, "days");
  try {
    const report = await WeeklyTimeCard.aggregate([
      {
        $match: {
          week: { $gte: new Date(date), $lt: new Date(endingWeek) },
        },
      },
    ]);
    console.log(report);
    res.status(200).json({ report: report });
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
