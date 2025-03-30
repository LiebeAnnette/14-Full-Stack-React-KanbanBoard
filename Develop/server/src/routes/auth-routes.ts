import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// TODO [x]: If the user exists and the password is correct, return a JWT token
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const secret = process.env.JWT_SECRET_KEY!;
    const token = jwt.sign({ username: user.username }, secret, {
      expiresIn: "1h",
    });

    res.json({ token });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong during login" });
    return;
  }
};

const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
