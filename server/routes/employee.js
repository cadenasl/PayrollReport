const express = require("express");
const router = express.Router();
const {
  addEmployee,
  modifyEmployee,
  deleteEmployee,
} = require("../controllers/employeeControllers");

router.post("/add-employee", addEmployee);
router.post("/modify-employee", modifyEmployee);
router.delete("/delete-employee", deleteEmployee);

module.exports = router;
