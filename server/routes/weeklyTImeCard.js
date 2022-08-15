const express = require("express");
const router = express.Router();
const {
  createWeeklyTimeCard,
  modifyWeeklyTimeCard,
} = require("../controllers/TimeCardControllers");

router.post("/create-timecard", createWeeklyTimeCard);
router.post("/modify-timecard", modifyWeeklyTimeCard);

module.exports = router;
