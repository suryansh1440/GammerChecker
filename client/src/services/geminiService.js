import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const checkGrammar = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are an expert English grammar checker. Please analyze the following text and provide corrections in JSON format.

Text to check: ${text}

Please provide a JSON response with this exact structure:
{
  "correctedText": "the corrected version of the text",
  "errors": [
    {
      "message": "description of the error",
      "suggestion": "how to fix it",
      "explanation": "brief explanation of the rule"
    }
  ]
}

Check for these types of errors:
1. Subject-verb agreement
2. Tense usage
3. Article usage (a, an, the)
4. Punctuation
5. Spelling
6. Word choice
7. Sentence structure
8. Common mistakes

IMPORTANT: Your response must be valid JSON. Do not include any text before or after the JSON object.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    console.log('Raw response:', responseText); // Debug log

    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedResponse = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsedResponse = JSON.parse(cleanedResponse);
      console.log('Parsed response:', parsedResponse); // Debug log
      
      // Validate the response structure
      if (!parsedResponse.correctedText) {
        throw new Error('Missing correctedText in response');
      }
      
      if (!Array.isArray(parsedResponse.errors)) {
        throw new Error('Errors must be an array');
      }

      // Ensure each error has the required fields
      const validatedErrors = parsedResponse.errors.map(error => ({
        message: error.message || 'Unknown error',
        suggestion: error.suggestion || 'No suggestion provided',
        explanation: error.explanation || 'No explanation provided'
      }));

      return {
        correctedText: parsedResponse.correctedText,
        errors: validatedErrors
      };
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      console.error('Response text:', responseText);
      throw new Error(`Failed to parse response: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Error in checkGrammar:', error);
    if (error.message.includes('API key')) {
      throw new Error('Invalid API key. Please check your Gemini API key.');
    }
    throw new Error(`Failed to check grammar: ${error.message}`);
  }
}; 