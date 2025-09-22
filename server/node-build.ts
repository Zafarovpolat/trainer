// server/node-build.ts
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import path from "path";
import { fileURLToPath } from "url";

// ВАЖНО: Импортируйте из правильного места
import { createServer } from "./index.js"; // или './server.js' в зависимости от структуры

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
const serverApp = createServer();
app.use("/api", serverApp);

// Для Vercel serverless
export const handler = serverless(app);

// Для локального запуска
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
