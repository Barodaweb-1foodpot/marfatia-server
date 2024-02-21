const express = require("express");
const {
  addNewcontect,
  deletecontectModel,
  updatecontectModel,
  getcontectModelById,
  getAllIncDelcontectModel,
  getContect,
} = require("../controllers/quickContectController");
const router = express.Router();

router.get("/", getContect);
router.get("/all", getAllIncDelcontectModel);
router.post("/", addNewcontect);
router.get("/:id", getcontectModelById);
router.put("/:id", updatecontectModel);
router.delete("/:id", deletecontectModel);

module.exports = router;
