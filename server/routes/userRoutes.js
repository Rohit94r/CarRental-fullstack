import express from "express";
import { registerUser, loginUser, getUserData, getCars } from "../controllers/userController.js";
import protect from "../middleware/auth.js";

const userRouter = express.Router();

// ✅ Register & Login routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// ✅ Protected route (needs token)
userRouter.get("/data", protect, getUserData);

// ✅ Public route (used in homepage/car list)
userRouter.get("/cars", getCars); // ✅ Uncommented

export default userRouter;
