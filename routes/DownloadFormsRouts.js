const express = require("express");
const {
  addNewDownload,
  deleteDownload,
  updateDownload,
  getAllIncDel,
  getDownloadById,
  getDownloads,
} = require("../controllers/downloadsFormsController");
const router = express.Router();

router.get("/", getDownloads);
router.get("/all", getAllIncDel);
router.post("/", addNewDownload);
router.get("/:id", getDownloadById);
router.put("/:id", updateDownload);
router.delete("/:id", deleteDownload);

module.exports = router;
