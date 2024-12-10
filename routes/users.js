const router = require("express").Router();

const { getCurrentUser, updateUser } = require("../controllers/users");

const auth = require("../middlewares/auth");

// remove
// router.get("/", getUsers);

// keep this /users/me
router.use("/", auth);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);
module.exports = router;
