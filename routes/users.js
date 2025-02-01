const router = require("express").Router();

const { getCurrentUser, updateUser } = require("../controllers/users");

const auth = require("../middlewares/auth");
const { validateUserUpdateBody } = require("../middlewares/validation");

router.use("/", auth);

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdateBody, updateUser);
module.exports = router;
