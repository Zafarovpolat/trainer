// server/index.ts
import express from "express";

export function createServer() {
  const app = express();

  // Простые API роуты (без catch-all)
  app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  // Добавьте другие API роуты здесь

  return app;
}
