const router = require("express").Router();

const clothingItem = require("./clothingItem");

const userRouter = require("./users");

const {NOT_FOUND} = require("../utils/errors");

const {signin} = require("../controllers/users");

const {createUser} = require("../controllers/users")

router.post("/signin", signin);
router.post("/signup", createUser);

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
