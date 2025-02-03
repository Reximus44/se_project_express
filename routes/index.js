const router = require("express").Router();

const clothingItem = require("./clothingItem");

const userRouter = require("./users");

const { NOT_FOUND } = require("../utils/errors");

const { signin } = require("../controllers/users");

const { createUser } = require("../controllers/users");
const {
  validateLogin,
  validateSignupBody,
} = require("../middlewares/validation");

// remove after testing
router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", validateLogin, signin);
router.post("/signup", validateSignupBody, createUser);

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
