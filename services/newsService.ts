import { GoogleGenAI } from "@google/genai";
import { Article } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-2.5-flash"; 

// Helper to generate a consistent fake image based on string hash
const getImageUrl = (seed: string, width = 800, height = 600) => {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
};

// Helper to parse the custom format we ask Gemini for
const parseNewsResponse = (text: string, defaultCategory: string): Article[] => {
  const articles: Article[] = [];
  const parts = text.split('---ITEM---');
  
  parts.forEach((part) => {
    if (!part.trim()) return;
    
    const titleMatch = part.match(/TITLE:\s*(.+)/);
    const summaryMatch = part.match(/SUMMARY:\s*(.+)/);
    const catMatch = part.match(/CATEGORY:\s*(.+)/);
    const dateMatch = part.match(/DATE:\s*(.+)/);

    if (titleMatch && summaryMatch) {
      const title = titleMatch[1].trim();
      articles.push({
        id: Math.random().toString(36).substr(2, 9),
        title: title,
        summary: summaryMatch[1].trim(),
        category: catMatch ? catMatch[1].trim() : defaultCategory,
        publishedAt: dateMatch ? dateMatch[1].trim() : 'Just now',
        author: 'GNN Staff',
        imageUrl: getImageUrl(title),
      });
    }
  });
  
  return articles;
};

export const fetchNewsByCategory = async (category: string): Promise<Article[]> => {
  try {
    const prompt = `
      You are a professional news aggregator. Search for the latest and most important news stories specifically about "${category}". 
      Find at least 8 distinct stories from reliable sources.
      
      Format the output strictly as follows for each story, separating them with "---ITEM---":
      
      ---ITEM---
      TITLE: [Insert Headline Here]
      SUMMARY: [Insert a 2-sentence summary here]
      CATEGORY: [${category}]
      DATE: [Insert relative time, e.g., 2 hours ago]
      
      Do not include any introductory or concluding text. Just the list.
    `;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType is NOT used with googleSearch
      },
    });

    // We can also use grounding chunks if we want exact links, 
    // but for the UI flow we parse the text first for a consistent list.
    const text = response.text || "";
    return parseNewsResponse(text, category);

  } catch (error) {
    console.error("Error fetching news:", error);
    // Fallback data in case of API error or quota issues
    return [
      {
        id: 'error-1',
        title: 'Unable to fetch live news at the moment',
        summary: 'Please check your connection or API key configuration. Displaying cached content.',
        category: category,
        publishedAt: 'Now',
        author: 'System',
        imageUrl: getImageUrl('error'),
      }
    ];
  }
};

export const searchNews = async (query: string): Promise<Article[]> => {
  try {
    const prompt = `
      Search for recent news articles related to: "${query}".
      Find at least 6 relevant stories.
      
      Format the output strictly as follows for each story, separating them with "---ITEM---":
      
      ---ITEM---
      TITLE: [Insert Headline Here]
      SUMMARY: [Insert a brief summary here]
      CATEGORY: General
      DATE: [Insert relative time]
    `;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return parseNewsResponse(response.text || "", "General");
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

export const generateFullArticle = async (headline: string, summary: string): Promise<string> => {
  try {
    const prompt = `
      Write a full, detailed news article based on the following headline and summary. 
      The article should be approximately 400-600 words.
      Use a journalistic tone (inverted pyramid style).
      Include subheadings.
      
      Headline: ${headline}
      Summary: ${summary}
    `;

    const response = await ai.models.generateContent({
      model: modelName, // Using standard model for generation
      contents: prompt,
      // No tools needed here, we are generating content based on the prompt context
    });

    return response.text || "Content generation unavailable.";
  } catch (error) {
    console.error("Article generation error:", error);
    return "We are unable to generate the full article at this time. Please try again later.";
  }
};
