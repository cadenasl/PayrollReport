const express = require("express");
const router = express.Router();
const {
  addEmployee,
  modifyEmployee,
} = require("../controllers/employeeControllers");

router.post("/add-employee", addEmployee);
router.post("/modify-employee", modifyEmployee);

module.exports = router;
