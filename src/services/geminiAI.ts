import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_GOOGLE_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const getResponseForGivenPrompt = async (inputValue: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(inputValue);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("Failed to generate content");
  }
};
