const express = require("express");
const router = express.Router();
const {
  createWeeklyTimeCard,
  modifyWeeklyTimeCard,
  generateAllWeeklyReports,
  generatebyWeek,
  getTimeCard,
} = require("../controllers/TimeCardControllers");

router.post("/create-timecard", createWeeklyTimeCard);
router.post("/modify-timecard", modifyWeeklyTimeCard);
router.get("/generate-weekly-report", generateAllWeeklyReports);
router.post("/get-specific-timecard", getTimeCard);
router.post("/generate-by-week", generatebyWeek);

module.exports = router;
