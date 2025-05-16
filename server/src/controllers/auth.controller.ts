import { Request, Response } from "express";
import * as AuthService from "@services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.register(req.body);
    res.json({ success: true, data: user });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "User already exists") {
      res.status(403).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await AuthService.login(req.body);
    res.json({ success: true, token });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Invalid credentials") {
      res.status(403).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};
