const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  deleteLikeItem,
} = require("../controllers/clothingItem");

const auth = require("../middlewares/auth");

router.get("/", getItems);
router.use("/", auth);
router.post("/", createItem);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", deleteLikeItem);

module.exports = router;
