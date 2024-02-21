const express = require("express");
const {
  getEmailById,
  getEmails,
  getAllIncDel,
  addNewEmail,
  updateEmail,
  deleteEmail
} = require("../controllers/emailSettingController");
const router = express.Router();

router.get("/", getEmails);
router.get("/all", getAllIncDel);
router.post("/", addNewEmail);
router.get("/:id", getEmailById);
router.put("/:id", updateEmail);
router.delete("/:id", deleteEmail);

module.exports = router;
