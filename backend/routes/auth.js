import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetchUser from "../middleware/fetchUser.js";
dotenv.config();
//ROUTE 1 : Create a User using POST: "/api/auth/signup".No Login Required
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
     let success = false;
    //if there are errors,return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      //Check whether the user with email already exists.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry a user with this already exists." });
      }
      //password hash.
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new user.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({success,authToken});
    } catch (error) {
      success = false;
      console.error(error.message);
     res.status(500).json({success,error: "Internal Server Error" });
    }
  },
);
//ROUTE 2 : Authenticate a User using POST: "/api/auth/login".No Login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors,return bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "Please try to login with correct credentials." });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success,error: "Please try to login with correct credentials." });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({success,authToken});
    } catch (error) {
        success = false;
        console.error(error.message);
      res.status(500).json({ success,error: "Internal Server Error" });
    }
  },
);
//ROUTE 3 : GET loggedin User details using POST: "/api/auth/getuser". Login Required
router.post("/getuser", fetchUser, async (req, res) => {
    try {
     const userId =  req.user.id;
     const user = await User.findById(userId).select("-password");
     res.send(user);
    } catch (error) {
        console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
//ROUTE 4 : GET project members using POST: "/api/auth/getprojectmembers". Login Required
router.post("/getprojectmembers", fetchUser, async (req, res) => {
  try {
    const { members } = req.body;
     console.log("Received Members:", members);
     const user = await User.findById("6ae028f9a8cf0b226a9dce75");

console.log("User Found:", user);
    const users = await User.find({ _id: { $in: members } }).select("-password");
     console.log("Found Users:", users);
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// ROUTE 5: Get all registered users. Login Required
router.get("/getallusers", fetchUser, async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ name: 1 });

    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
