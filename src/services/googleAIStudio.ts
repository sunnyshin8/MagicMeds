import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GOOGLE_AI_STUDIO_API_KEY) {
  throw new Error('GOOGLE_AI_STUDIO_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY);

export const getHealthAssistantResponse = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in AI response generation:', error);
    throw new Error('Failed to get AI response');
  }
};