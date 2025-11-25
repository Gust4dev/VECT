import { GoogleGenerativeAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const Edit = async (
  base64Image: string,
  prompt: string,
  maskBase64?: string
): Promise<string> => {
  if (!apiKey) {
  }

  const ai = new GoogleGenAI({ apiKey });

  // Prepare the prompt for an image editing task
  // Since we are using gemini-2.5-flash-image, we provide the image and the text instructions.
  // We include the mask conceptually in the prompt or as a secondary image if the model supports multimodal context well enough to understand "use this mask".
  // For this implementation, we will provide the original image and a strong prompt guiding the edit.
  
  const systemPrompt = `You are an expert architectural visualization assistant. 
  The user wants to edit a specific part of the provided image. 
  Perform the requested edits with high photorealism, maintaining the perspective, lighting, and style of the original render.
  If a mask or specific area is mentioned, focus changes only on that region.`;

  const finalPrompt = `${systemPrompt}\n\nUser Request: ${prompt}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: finalPrompt,
          },
          {
            inlineData: {
              mimeType: 'image/png',
              data: base64Image, // The original image to edit
            },
          },
        ],
      },
    });

    // Handle the response to extract the image
    // The model might return text and/or image. We scan for the image part.
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image was generated. The model might have returned only text.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};