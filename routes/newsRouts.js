const express = require("express");
const {
    getNews,
    addNews,
    getNewsbyId,
    updateNews,
    deleteNews,
    getAllIncDel
} = require("../controllers/newsController");
const router = express.Router();

router.get("/", getNews);
router.post("/", addNews);
router.get("/:id", getNewsbyId);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
