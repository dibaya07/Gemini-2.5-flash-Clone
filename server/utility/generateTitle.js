
const {GoogleGenAI}= require('@google/genai')

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function generativeAIResponse(titlePrompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:titlePrompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  // console.log(response.text);
  return response.text
}

module.exports= {generativeAIResponse}