const router = require("express").Router();

const clothingItem = require("./clothingItem");

const userRouter = require("./users");

const { signin } = require("../controllers/users");

const { createUser } = require("../controllers/users");

const NotFoundError = require("../errors/NotFoundError");

const {
  validateLogin,
  validateSignupBody,
} = require("../middlewares/validation");

router.post("/signin", validateLogin, signin);
router.post("/signup", validateSignupBody, createUser);

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use(() => {
  throw new NotFoundError("Authorization required");
});

module.exports = router;
