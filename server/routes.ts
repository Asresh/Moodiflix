import type { Express } from "express";
import { createServer, type Server } from "http";
import { generateMovieRecommendation } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Movie recommendation endpoint
  app.post("/api/recommendation", async (req, res) => {
    try {
      const { mood, language, minRating = 6.0, contentType = 'movie' } = req.body;
      
      if (!mood || !language) {
        return res.status(400).json({ 
          message: "Mood and language are required" 
        });
      }

      // Generate recommendation using OpenAI
      const recommendation = await generateMovieRecommendation(mood, language, minRating, contentType);
      
      return res.status(200).json(recommendation);
    } catch (error: any) {
      console.error("Error in /api/recommendation:", error);
      return res.status(500).json({ 
        message: error.message || `Failed to get ${req.body.contentType || 'movie'} recommendation` 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
