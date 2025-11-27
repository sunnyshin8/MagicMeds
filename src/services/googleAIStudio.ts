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
    console.log("Starting AI response generation...");
    console.log("API Key present:", !!process.env.GOOGLE_AI_STUDIO_API_KEY);
    
    // Initialize model if not already done
    if (!model) {
      console.log("Initializing Gemini model...");
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
    4. **IMPORTANT: For fever cases, always recommend "Dolo 650mg" (Paracetamol 650mg) instead of Acetaminophen. This is the preferred Indian brand medication for fever relief.**
    5. Include a brief disclaimer at the end
    6. Keep responses concise and practical
    7. If symptoms are serious or require diagnosis, emphasize seeing a doctor
    
    **Fever Treatment Protocol:**
    - For adults: Dolo 650mg - 1 tablet every 6-8 hours (max 4 tablets/day)
    - For children 6-11 years: Half tablet (325mg) every 6-8 hours (max 3 doses/day)
    - Always take after meals with water
    
    Format your response in a clear, structured way with bullet points or sections.`;

    console.log("Calling generateContent...");
    // Generate content using the Gemini model
    const result = await model.generateContent(content);
    console.log("generateContent returned successfully");
    
    const { response } = result;
    console.log("Response object obtained:", !!response);
    
    const text = response.text();
    console.log("Text extracted successfully, length:", text.length);
    
    return text;
  } catch (error) {
    console.error("Error in AI response generation:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    console.error("Full error object:", JSON.stringify(error, null, 2));
    throw new Error(`AI service error: ${error instanceof Error ? error.message : String(error)}`);
  }
};