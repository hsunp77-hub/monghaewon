import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Return whether server-side API key is configured
app.get("/api/config", (req, res) => {
  res.json({
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Proxy to Gemini API
app.post("/api/gemini", async (req, res) => {
  const serverKey = process.env.GEMINI_API_KEY;
  const clientKey = req.headers["x-user-api-key"];
  
  const apiKey = serverKey || clientKey;
  
  if (!apiKey) {
    return res.status(401).json({
      error: {
        message: "Gemini API Key is missing. Please provide it in the server environment or enter it in Settings."
      }
    });
  }

  const { messages, systemPrompt } = req.body;

  // Set up Gemini contents
  const contents = messages.map(m => ({
    role: m.role === "assistant" || m.role === "model" ? "model" : "user",
    parts: [{ text: m.content || m.text || "" }]
  }));

  const systemInstruction = systemPrompt ? {
    parts: [{ text: systemPrompt }]
  } : undefined;

  const generationConfig = {
    maxOutputTokens: 8192,
    temperature: 0.7,
  };

  // Dynamically set JSON response type if systemPrompt asks for JSON
  if (systemPrompt && (systemPrompt.toLowerCase().includes("json") || systemPrompt.includes("JSON"))) {
    generationConfig.responseMimeType = "application/json";
  }

  try {
    // Debug: fetch available models
    try {
      const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      const listData = await listRes.json();
      console.log("[Monghaewon Debug] Available models:", JSON.stringify(listData.models?.map(m => m.name)));
    } catch (e) {
      console.error("[Monghaewon Debug] Failed to list models:", e);
    }

    const attempts = [
      { version: "v1beta", model: "gemini-2.5-flash" },
      { version: "v1beta", model: "gemini-2.5-pro" },
      { version: "v1beta", model: "gemini-3.5-flash" },
      { version: "v1beta", model: "gemini-2.0-flash" },
      { version: "v1beta", model: "gemini-flash-latest" },
      { version: "v1beta", model: "gemini-pro-latest" }
    ];

    let lastError = null;
    let lastStatus = 500;
    let success = false;
    let responseData = null;

    for (const attempt of attempts) {
      try {
        console.log(`[Monghaewon] Trying Gemini API: ${attempt.version}/models/${attempt.model}`);
        
        const requestBody = {
          contents,
          generationConfig
        };

        if (systemInstruction) {
          requestBody.systemInstruction = systemInstruction;
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/${attempt.version}/models/${attempt.model}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        lastStatus = response.status;
        lastError = data;

        if (response.ok) {
          responseData = data;
          success = true;
          console.log(`[Monghaewon] Gemini API Success: ${attempt.version}/models/${attempt.model}`);
          break;
        } else {
          console.warn(`[Monghaewon] Failed ${attempt.version}/models/${attempt.model}: ${data.error?.message || response.status}`);
        }
      } catch (e) {
        console.error(`[Monghaewon] Network error for ${attempt.version}/models/${attempt.model}:`, e);
        lastError = { error: { message: e.message } };
        lastStatus = 500;
      }
    }

    if (!success) {
      return res.status(lastStatus).json(lastError);
    }

    // Format response to match what frontend expects
    const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("[Monghaewon Debug] Raw Response Text:", text);
    res.json({
      content: [{ text }]
    });
  } catch (error) {
    console.error("API Proxy Error:", error);
    res.status(500).json({
      error: {
        message: "Internal Server Error when contacting Gemini API.",
        details: error.message
      }
    });
  }
});

export default app;
