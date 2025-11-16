const { GoogleGenerativeAI } = require("@google/generative-ai");

let modelInstance = null;

// Initialize Gemini model
function initGemini(apiKey, opts = {}) {
  const modelName = opts.modelName || "gemini-pro";

  const genAI = new GoogleGenerativeAI(apiKey);
  modelInstance = genAI.getGenerativeModel({ model: modelName });

  console.log("Gemini initialized with model:", modelName);
  return modelInstance;
}

// Generate text using generateText()
async function generateReply(prompt) {
  if (!modelInstance) {
    throw new Error("Gemini model not initialized. Call initGemini() first.");
  }

  // generateText() is the correct API for gemini-pro
  const result = await modelInstance.generateText({
    prompt: prompt
  });

  return result?.response?.text() || "";
}

module.exports = { initGemini, generateReply };
