
import { GoogleGenAI, Type } from "@google/genai";

// Always use the named parameter for API key initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `You are the "Har Sach News & Career Guru". 
Your mission is to provide truthful updates on current affairs and professional career advice.
1. Help users find news topics.
2. Assist with career questions.
3. Maintain a professional tone.`;

const VERIFICATION_PROMPT = `You are an AI News Verifier for Har Sach. 
Analyze the following news submission and return a JSON object with:
- "isReliable": boolean
- "score": number (1-10)
- "reason": string (why it's flagged or approved)
Check for hate speech, extreme sensationalism, or obvious rumors.`;

const COMMENT_FILTER_PROMPT = `You are an AI Comment Moderator for Har Sach. 
Analyze the comment text for:
- Hate speech or abuse
- Fake news spread
- Extreme spam
Return a JSON object with:
- "isApproved": boolean
- "reason": string`;

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
    return "Maaf kijiye, hum abhi connect nahi kar pa rahe hain.";
  }
};

export const verifyNewsAI = async (title: string, content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${VERIFICATION_PROMPT}\nTitle: ${title}\nBody: ${content}`,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isReliable: { type: Type.BOOLEAN },
            score: { type: Type.NUMBER },
            reason: { type: Type.STRING },
          },
          required: ["isReliable", "score", "reason"],
        },
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("News Verification Error:", error);
    return { isReliable: true, score: 5, reason: "Manual review required" };
  }
};

export const filterCommentAI = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${COMMENT_FILTER_PROMPT}\nComment: ${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isApproved: { type: Type.BOOLEAN },
            reason: { type: Type.STRING },
          },
          required: ["isApproved", "reason"],
        },
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { isApproved: true, reason: "Bypassed filter" };
  }
};
