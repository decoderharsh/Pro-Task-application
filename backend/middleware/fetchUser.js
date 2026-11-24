import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const fetchUser = (req, res, next) => {
  //Get the user from jwt token and add it to req object
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send({ error: "please authenticate a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
  } catch (error) {
    return res.status(401).send({ error: "please authenticate a valid token" });
  }

  next();
};
export default fetchUser;
