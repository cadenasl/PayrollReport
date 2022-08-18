const e = require("express");
const Employee = require("../Models/Employee");
const WeeklyTimeCard = require("../Models/WeeklyTimeCard");

exports.addEmployee = async (req, res) => {
  const { name, isCurrent } = req.body.data;
  console.log("name", req.body);
  try {
    const foundEmployee = await Employee.findOne({ name: name });
    console.log("foundEmployee===", foundEmployee);
    if (foundEmployee) {
      return res.status(400).json({ message: "employee exists already" });
    }
    const newEmployee = new Employee({ name, isCurrent });
    await newEmployee.save();
    res.status(200).send("suceeded");
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

exports.modifyEmployee = async (req, res) => {
  const { id, name, isCurrent } = req.body.data;
  console.log("req.body===", req.body);
  try {
    const employee = await Employee.findOneAndUpdate(
      { name: name },
      { name, isCurrent },
      { new: true }
    );
    if (!employee) {
      return res.status(400).json({
        message:
          "employee Name could not be found in our Database. Please enter a valid name",
      });
    }
    res.status(200).json({ employee });
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
exports.deleteEmployee = async (req, res) => {
  try {
    const { name } = req.body;
    const employee = await Employee.findOne({ name: name });
    if (!employee) {
      return res.status(400).json({
        message:
          "employee Name could not be found in our Database. Please enter a valid name",
      });
    }
    await WeeklyTimeCard.deleteMany({ employeeId: employee._id });
    await Employee.deleteOne({ _id: employee._id });
    res.status(200).send("deleted sucessfully");
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
