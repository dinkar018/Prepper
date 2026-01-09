import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

const isValidMobile = (mobile: string) =>
  /^[6-9]\d{9}$/.test(mobile); // Indian 10-digit rule

export const registerUser = async (
  mobile: string,
  password: string,
  name?: string
) => {
  if (!isValidMobile(mobile)) {
    throw new Error("Invalid mobile number");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      mobile,
      name,
      password: hashedPassword,
    },
  });
};

export const loginUser = async (mobile: string, password: string) => {
  if (!isValidMobile(mobile)) {
    throw new Error("Invalid mobile number");
  }

  const user = await prisma.user.findUnique({ where: { mobile } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};
