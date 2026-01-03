import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.routes";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/quizzes", quizRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
