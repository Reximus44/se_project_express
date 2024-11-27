const router = require("express").Router();

const clothingItem = require("./clothingItem");

const userRouter = require("./users");

const NOT_FOUND = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
