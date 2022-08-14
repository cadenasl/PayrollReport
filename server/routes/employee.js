const express = require("express");
const router = express.Router();
const { addEmployee } = require("../controllers/employeeControllers");

router.post("/add-employee", addEmployee);

module.exports = router;
