const express = require("express");
const router = express.Router();
const {
  addEmployee,
  modifyEmployee,
  deleteEmployee,
  getAllEmployeeNames
} = require("../controllers/employeeControllers");

router.post("/add-employee", addEmployee);
router.post("/modify-employee", modifyEmployee);
router.delete("/delete-employee", deleteEmployee);
router.get("/",getAllEmployeeNames)

module.exports = router;
