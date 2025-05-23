import express from "express";
import authRoutes from "@routes/auth.routes";
import chatRoutes from "@routes/chat.routes";
import contractRoutes from "@routes/contract.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("Hello from TypeScript Backend 👋");
});
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.use("/api", contractRoutes);

export default app;
