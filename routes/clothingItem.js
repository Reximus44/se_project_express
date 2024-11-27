const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  deleteLikeItem,
} = require("../controllers/clothingItem");

router.post("/", createItem);

router.get("/", getItems);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", deleteLikeItem);

module.exports = router;
