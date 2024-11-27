const router = require("express").Router();

const clothingItem = require("./clothingItem");

const userRouter = require("./users");

const SERVER_ISSUE = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(SERVER_ISSUE).send({ message: "Router not found" });
});

module.exports = router;
