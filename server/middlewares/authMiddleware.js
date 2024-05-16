const verfiyToken = require("../utils/verfiyToken");

const authMiddleware = (req, res, next) => {
  const auth = req.headers?.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Headers are not there" });
  }
  const token = auth.split("Bearer ")[1];
  try {
    const decodedToken = verfiyToken(token);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports = authMiddleware;
