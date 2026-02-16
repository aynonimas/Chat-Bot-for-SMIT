import { GoogleGenAI, Chat } from "@google/genai";
import { MODEL_NAME, SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

let chatSession: Chat | null = null;

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    // Initialize chat session if strictly necessary or reconstruct history
    // For simplicity and state management, we re-create the client context or check existing
    // In a stateless web request, we usually send history. Here we keep a running session or send history.
    
    const ai = new GoogleGenAI({ apiKey });
    
    // Map internal message structure to Gemini API history format
    // Filter out the very first greeting if it was locally generated and not part of the 'model' logic yet, 
    // strictly speaking, we can just send the relevant turns.
    const apiHistory = history
      .filter(msg => msg.id !== 'init-0') // Skip the local initial greeting to avoid role confusion if needed, or include it as model turn.
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

    if (!chatSession) {
      chatSession = ai.chats.create({
        model: MODEL_NAME,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: apiHistory
      });
    }

    // If history length changed significantly or reset, we might want to recreate, 
    // but for this simple SPA, we can just send the message if the session tracks it, 
    // or strictly use the generateContent with history if we weren't using the Chat object.
    // However, the Chat object manages history state. 
    // If the component re-renders, chatSession might be lost if not outside the component.
    // Since chatSession is defined outside, it persists.
    
    const result = await chatSession.sendMessage({
      message: newMessage
    });

    return result.text || "I'm sorry, I couldn't process that response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get response from the guide.");
  }
};

export const resetChatSession = () => {
  chatSession = null;
};
