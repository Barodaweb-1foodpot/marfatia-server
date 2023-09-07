const express = require("express");
const {
    addNewTransfer
} = require("../controllers/TransferController");
const router = express.Router();

router.get("/", addNewTransfer);
// router.get("/all", getAllIncDelAmcCategory);
// router.post("/", addNewAmcCategory);
// router.get("/:id", getaAcCategoryById);
// router.put("/:id", updateAmcCategory);
// router.delete("/:id", deleteamcCategory);

module.exports = router;
