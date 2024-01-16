import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";

export const protectedRoute = asyncHandler(async (req, res, next) => {
  try {
    let token = req.body.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } else {
      res.status(400);
      throw new Error("Not Authorized, Invalid Token");
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not Authroized, No Token");
  }
});
