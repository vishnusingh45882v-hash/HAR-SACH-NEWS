
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `You are the AI Engine for "SACH NEWS" (harsach.in). 
Your goal is to fetch and summarize the absolute latest posts from https://www.harsach.in.
Users rely on you to see what has been uploaded to the website recently.
Always refer to harsach.in as the source of truth.`;

export const getGeminiResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: { systemInstruction: SYSTEM_PROMPT },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf kijiye, harsach.in assistant abhi connect nahi kar pa raha hai.";
  }
};

export const fetchLatestFromWeb = async () => {
  try {
    // We use Gemini 3 Pro with search grounding to specifically target the website uploads
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: "Go to https://www.harsach.in/ and identify the 10 most recently uploaded articles or job posts. For each post, extract the title, a 2-sentence summary of the content, the category (like News, Jobs, Tech, etc.), the date uploaded, and the URL of the featured image. Return this data as a valid JSON array.",
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              thumbnail: { type: Type.STRING },
              type: { type: Type.STRING, description: "Must be 'news' or 'job'" },
              category: { type: Type.STRING },
              date: { type: Type.STRING },
            },
            required: ["title", "content", "type"]
          }
        }
      },
    });
    
    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Scraping Sync Error:", error);
    return [];
  }
};
