const Employee = require("../Models/Employee");

exports.addEmployee = async (req, res) => {
  const { name, isCurrent } = req.body;
  try {
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
  const { id, name, isCurrent } = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, isCurrent },
      { new: true }
    );
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
