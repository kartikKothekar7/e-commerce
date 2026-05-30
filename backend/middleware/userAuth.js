import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log("Error while authenticating user: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default userAuth;