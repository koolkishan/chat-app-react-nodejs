const { addMessage, getMessages } = require("../controllers/messageController");
const upload = require("../controllers/multerContorller");
const router = require("express").Router();

router.post("/addmsg/", upload.single('file'), addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;
