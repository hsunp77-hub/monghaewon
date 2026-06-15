import app from "./api/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend in production
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// Route all other requests to index.html (Express 5 syntax)
app.get("/*splat", (req, res) => {
  if (!req.path.startsWith("/api/")) {
    res.sendFile(path.join(distPath, "index.html"));
  } else {
    res.status(404).json({ error: "API route not found" });
  }
});

const PORT = process.env.PORT || 5088;
app.listen(PORT, () => {
  console.log(`[Monghaewon Server] Running on http://localhost:${PORT}`);
});
