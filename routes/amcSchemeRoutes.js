const express = require("express");
const {
    addNewScheme
} = require("../controllers/amcSchemeController");
const router = express.Router();

router.get("/", addNewScheme);
// router.get("/all", getAllIncDelAmcCategory);
// router.post("/", addNewAmcCategory);
// router.get("/:id", getaAcCategoryById);
// router.put("/:id", updateAmcCategory);
// router.delete("/:id", deleteamcCategory);

module.exports = router;
