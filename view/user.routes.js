import express from "express";
import {users,signup,login,reset,logout,singleUser} from "../controllers/users.controller.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.put("/reset", reset);

router.get("/logout", logout);

router.get("/users", users);

router.get("/users/:id", singleUser);

export default router;
