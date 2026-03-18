import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Proxy for Claim Submission
  app.post("/api/submit-claim", async (req, res) => {
    const affiliateId = process.env.VITE_AFFILIATE_ID || "a4429cda-e36a-472a-8291-ae01a49349d8";
    const apiKey = process.env.VITE_API_KEY || "8714de54-a64d-441b-8ef9-4a64318380b0";

    try {
      const response = await fetch(`https://r2r.theclaimsystem.co.uk/api/v1/affiliate/${affiliateId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'API-KEY': apiKey
        },
        body: JSON.stringify(req.body)
      });

      const result = await response.json();
      res.status(response.status).json(result);
    } catch (error: any) {
      console.error("Proxy Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
