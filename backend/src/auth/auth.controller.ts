import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

export const registerController = async (req: Request, res: Response) => {
  const { mobile, password, name } = req.body;

  const user = await registerUser(mobile, password, name);

  res.status(201).json({
    message: "User registered successfully",
    userId: user.id,
  });
};

export const loginController = async (req: Request, res: Response) => {
  console.log("🔥 LOGIN CONTROLLER HIT 🔥");

  const { mobile, password } = req.body;
  const { user, token } = await loginUser(mobile, password);

  console.log("🔥 TOKEN GENERATED:", token);

  return res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      mobile: user.mobile,
      name: user.name,
    },
  });
};


export const logoutController = async (_: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
