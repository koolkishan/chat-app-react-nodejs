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
        message: msg.message.text,
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
    console.log(message)
    let data;
    if(!req.file){
       data = await Messages.create({
        message: { text: message.msg },
        users: [from, to],
        sender: from,
        
      });
      
    }
    else{
       data = await Messages.create({
        message: { text: message.msg },
        users: [from, to],
        sender: from,
        fileUrl: `/uploads/${req.file.filename}`
        
      });
    }

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
