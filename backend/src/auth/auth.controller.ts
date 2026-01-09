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
  const { mobile, password } = req.body;

  const { user, token } = await loginUser(mobile, password);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in prod
  });

  res.json({
    message: "Login successful",
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
