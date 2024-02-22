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
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/downloads/");
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    cb(null, originalFileName);
    console.log(originalFileName)
  },
});
const upload = multer({ storage: storage });
router.get("/", getDownloads);
router.get("/all", getAllIncDel);
router.post("/", upload.single("filePath"),addNewDownload);
router.get("/:id", getDownloadById);
router.put("/:id",upload.single("filePath"), updateDownload);
router.delete("/:id", deleteDownload);

module.exports = router;
