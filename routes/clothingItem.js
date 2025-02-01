const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  deleteLikeItem,
} = require("../controllers/clothingItem");

const auth = require("../middlewares/auth");
const {
  validateClothingItemId,
  validateCardBody,
} = require("../middlewares/validation");

router.get("/", getItems);

router.use("/", auth);

router.post("/", validateCardBody, createItem);

router.put("/:itemId/likes", validateClothingItemId, likeItem);

router.delete("/:itemId", validateClothingItemId, deleteItem);
router.delete("/:itemId/likes", validateClothingItemId, deleteLikeItem);

module.exports = router;
