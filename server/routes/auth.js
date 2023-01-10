const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  firebaseLogin,
  checkUsername,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/firebaseLogin", firebaseLogin);
router.post("/checkusername", checkUsername);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
