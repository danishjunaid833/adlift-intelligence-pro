
import { GoogleGenAI, Type } from "@google/genai";
import { AdInput, DiagnosticResult } from "../types";

export const analyzeAdCopy = async (input: AdInput): Promise<DiagnosticResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const textPrompt = `
    You are a senior advertising effectiveness analyst. 
    Analyze the following ad creative using your expert diagnostics framework.
    
    INPUT DATA:
    - Platform: ${input.platform}
    - Target Audience: ${input.targetAudience}
    - Objective: ${input.objective}
    - Ad Copy/Script: ${input.adCopy}
    - Performance Data (Optional): ${input.performanceData || "None provided"}

    ${input.videoData ? "IMPORTANT: A video file of the ad is provided. You must analyze the visual pacing, on-screen text, pattern interrupts, sound design, and brand integration within the video itself alongside the script." : ""}

    STRICT RULES:
    1. Do not give vague feedback.
    2. Do not rewrite the entire copy.
    3. Diagnose rigorously across: Focus, Memorability, Branding, Emotion, Pacing, and Overlays.
    4. Provide brand lift estimations.
    5. Provide specific improvement recommendations.
    6. **SCORING SCALE**: Every metric (Focus, Memorability, Branding, Emotion, Pacing, Overlays) MUST be scored on a scale of 1 to 10. 
       - 1 is extremely poor/ineffective.
       - 10 is world-class/best-in-class.
       - DO NOT use a 1-100 scale.
  `;

  const parts: any[] = [{ text: textPrompt }];
  
  if (input.videoData) {
    parts.push({
      inlineData: {
        data: input.videoData.data,
        mimeType: input.videoData.mimeType
      }
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          focus: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Score from 1 to 10" },
              explanation: { type: Type.STRING }
            },
            required: ["score", "explanation"]
          },
          memorability: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Score from 1 to 10" },
              explanation: { type: Type.STRING }
            },
            required: ["score", "explanation"]
          },
          branding: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Score from 1 to 10" },
              explanation: { type: Type.STRING }
            },
            required: ["score", "explanation"]
          },
          emotion: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Score from 1 to 10" },
              explanation: { type: Type.STRING }
            },
            required: ["score", "explanation"]
          },
          pacing: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Score from 1 to 10" },
              explanation: { type: Type.STRING }
            },
            required: ["score", "explanation"]
          },
          overlays: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: "Score from 1 to 10" },
              explanation: { type: Type.STRING }
            },
            required: ["score", "explanation"]
          },
          brandLift: {
            type: Type.OBJECT,
            properties: {
              recallStrength: { type: Type.STRING },
              messageAssociation: { type: Type.STRING },
              genericRisk: { type: Type.STRING },
              performanceType: { type: Type.STRING },
              reasoning: { type: Type.STRING }
            },
            required: ["recallStrength", "messageAssociation", "genericRisk", "performanceType", "reasoning"]
          },
          recommendations: {
            type: Type.OBJECT,
            properties: {
              structural: { type: Type.STRING },
              emotional: { type: Type.STRING },
              branding: { type: Type.STRING },
              platformSpecific: { type: Type.STRING },
              revisedHook: { type: Type.STRING }
            },
            required: ["structural", "emotional", "branding", "platformSpecific", "revisedHook"]
          }
        },
        required: ["focus", "memorability", "branding", "emotion", "pacing", "overlays", "brandLift", "recommendations"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result as DiagnosticResult;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Invalid diagnostic format received from AI.");
  }
};
