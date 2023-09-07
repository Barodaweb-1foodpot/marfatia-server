const express = require("express");
const {
    getamcCategory,
  addNewAmcCategory,
  getaAcCategoryById,
  updateAmcCategory,
  deleteamcCategory,
  getAllIncDelAmcCategory,
} = require("../controllers/amcCategoryMasterControler");
const router = express.Router();

router.get("/", getamcCategory);
router.get("/all", getAllIncDelAmcCategory);
router.post("/", addNewAmcCategory);
router.get("/:id", getaAcCategoryById);
router.put("/:id", updateAmcCategory);
router.delete("/:id", deleteamcCategory);

module.exports = router;
