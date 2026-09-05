import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for raw original high-res photos
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API Route to permanently save original raw uploaded photo to public folder
  app.post("/api/upload-photo", (req, res) => {
    try {
      const { type, imageBase64 } = req.body;
      if (!type || !imageBase64) {
        return res.status(400).json({ error: "Missing type or imageBase64" });
      }

      const fileName = type === "childhood" ? "childhood_aarshi.jpg" : "today_aarshi.jpg";
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Save to public directory
      const publicDir = path.join(process.cwd(), "public");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const publicFilePath = path.join(publicDir, fileName);
      fs.writeFileSync(publicFilePath, buffer);

      // Also save to dist directory if it exists
      const distDir = path.join(process.cwd(), "dist");
      if (fs.existsSync(distDir)) {
        const distFilePath = path.join(distDir, fileName);
        fs.writeFileSync(distFilePath, buffer);
      }

      console.log(`[Upload] Successfully saved exact original photo to ${publicFilePath} (${buffer.length} bytes)`);
      return res.json({ 
        success: true, 
        message: `Original photo saved permanently as ${fileName}`, 
        url: `/${fileName}?t=${Date.now()}` 
      });
    } catch (err: any) {
      console.error("[Upload] Error saving photo:", err);
      return res.status(500).json({ error: err.message || "Failed to save photo" });
    }
  });

  // Serve static files from public
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite middleware for development vs static for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
