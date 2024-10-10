const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: {
          msg: msg.message.text,
          fileUrl: msg.fileUrl,
        }
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    let data;
    console.log(message.fileUrl)
    if(!message.fileUrl){
       data = await Messages.create({
        message: { text: message.msg },
        users: [from, to],
        sender: from,
        
      });
      
    }
    else{

       data = await Messages.create({
        message: { text: message.msg || "File" },
        users: [from, to],
        sender: from,
        fileUrl: message.fileUrl
        
      });
    }

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
