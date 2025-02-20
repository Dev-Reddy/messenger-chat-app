import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.put("/update-profile", protectRoute, updateProfile);

// get method to check if user is authenticated or not
// for if user refreshes the page when updating the profile
authRouter.get("/check", protectRoute, checkAuth);
export default authRouter;
