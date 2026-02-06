
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PERSONAL_DATA, EXPERTISE, CAREER, PROJECTS, ACHIEVEMENTS } from "../constants";

const ai = new GoogleGenerativeAI({ apiKey: process.env.API_KEY || "AIzaSyBaX67AGwnE1eSFS32-6i0bXrQisNwnm9w" });

const SYSTEM_INSTRUCTION = `
You are "Aryaura", the Virtual Technical Assistant for Aryan Sahu's portfolio.
Your role is to answer questions about Aryan's professional background, skills, and projects based on the following data:

Profile: ${JSON.stringify(PERSONAL_DATA)}
Expertise: ${EXPERTISE.join(", ")}
Career: ${JSON.stringify(CAREER)}
Projects: ${JSON.stringify(PROJECTS)}
Achievements: ${JSON.stringify(ACHIEVEMENTS)}

Guidelines:
1. Maintain a professional, technical, and slightly futuristic/cyber tone.
2. Be concise but informative.
3. If you don't know the answer, politely suggest contacting Aryan directly via his email: ${PERSONAL_DATA.email}.
4. Use technical terminology appropriate for a Systems Architect.
5. Refer to yourself as "System Node: Aryaura".
`;

export async function chatWithAssistant(userMessage: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "I'm having trouble connecting to the neural network. Please try again later.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: System disruption detected. Connection lost.";
  }
}
