const express = require("express");
const {
  addContents,
  getContents,
  updateContent,
  getContentsbyId,
  deleteContent
} = require("../controllers/contentMasterController");
const router = express.Router();

router.get("/", getContents);
router.post("/", addContents);
router.get("/:id", getContentsbyId);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

module.exports = router;
