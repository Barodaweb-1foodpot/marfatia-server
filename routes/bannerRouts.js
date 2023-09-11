const express = require("express");
const {
  getBanner,
  addNewBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
  getAllIncDelBanner,
} = require("../controllers/bannerMasterController");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/banner/");
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();
    const newFileName = `${Date.now()}_banner.${extension}`;
    cb(null, newFileName);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

router.get("/", getBanner);
router.get("/all", getAllIncDelBanner);
router.post("/", upload.single("imagePath"), addNewBanner);
router.get("/:id", getBannerById);
router.put("/:id", upload.single("imagePath"), updateBanner);
router.delete("/:id", deleteBanner);

module.exports = router;
