const express = require("express");
const {
  addNewAmc,
  updateAmc,
  getAmcById,
  deleteAmc,
  getAllIncDelAmc,
  getAmc,
} = require("../controllers/amcMasterController");
const router = express.Router();

router.get("/", getAmc);
router.get("/all", getAllIncDelAmc);
router.post("/", addNewAmc);
router.get("/:id", getAmcById);
router.put("/:id", updateAmc);
router.delete("/:id", deleteAmc);

module.exports = router;
