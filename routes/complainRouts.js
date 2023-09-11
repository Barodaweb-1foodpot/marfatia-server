const express = require("express");
const {
  addComplains,
  getComplains,
  updateComplain,
  getComplainsbyId,
  
} = require("../controllers/complainController");
const router = express.Router();

router.get("/", getComplains);
router.post("/", addComplains);
router.get("/:id", getComplainsbyId);
router.put("/:id", updateComplain);

module.exports = router;
