import { prisma } from "@lib/prisma";
import { getNameFromEmail } from "@utils/getName";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const hashed = await bcrypt.hash(password, 10);
  const name = getNameFromEmail(email);
  const userExists = await prisma.user.findUnique({
    where: { email },
  });
  if (userExists) {
    throw new Error("User already exists");
  }
  return prisma.user.create({
    data: { name, email, passwordHash: hashed },
  });
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("Invalid credentials");
  }
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
