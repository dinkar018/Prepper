import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.routes";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/auth.routes";
import attemptRoutes from "./routes/attempt.routes";
configDotenv();
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Next.js
  credentials: true,
}));
app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/attempt", attemptRoutes);
app.use("/api/quizzes", quizRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
