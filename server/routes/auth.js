const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  userById,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", authMiddleware, getAllUsers);
router.post("/setavatar/:id", authMiddleware, setAvatar);
router.get("/userById", authMiddleware, userById);
router.get("/logout/:id", authMiddleware, logOut);

module.exports = router;
