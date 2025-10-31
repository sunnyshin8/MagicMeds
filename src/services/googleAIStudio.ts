import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Check for API key
if (!process.env.GOOGLE_AI_STUDIO_API_KEY) {
  throw new Error("GOOGLE_AI_STUDIO_API_KEY is not set in environment variables");
}

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY);

// Create a reusable model instance
let model: GenerativeModel;

export const getHealthAssistantResponse = async (prompt: string): Promise<string> => {
  try {
    // Initialize model if not already done
    if (!model) {
      model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    }
    
    // Create the healthcare context with specific instructions
    const content = `You are MagicMeds AI, a healthcare assistant with access to a verified medicine database. 
    For the query: "${prompt}"
    
    Instructions:
    1. First, identify the symptoms mentioned.
    2. If no age/gender is provided, ask for it.
    3. For common conditions like cough, cold, fever, or minor ailments:
       - Suggest over-the-counter medications from our database
       - Include dosage information based on age
       - List potential side effects
       - Mention when to seek medical help
    4. Include a brief disclaimer at the end
    5. Keep responses concise and practical
    6. If symptoms are serious or require diagnosis, emphasize seeing a doctor
    
    Format your response in a clear, structured way with bullet points or sections.`;

    // Generate content using the Gemini model
    const result = await model.generateContent(content);    // Wait for the response
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error in AI response generation:", error);
    console.error("Detailed error:", JSON.stringify(error, null, 2));
    throw new Error("Failed to get AI response");
  }
};