const express = require("express");
const {
  getAllIncDelFeedback,
  getFeedback,
  getFeedbackById,
  addNewFeedback,
  deleteFeedback,
  updateFeedback,
} = require("../controllers/feedBackController");
const router = express.Router();

router.get("/", getFeedback);
router.get("/all", getAllIncDelFeedback);
router.post("/", addNewFeedback);
router.get("/:id", getFeedbackById);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;
