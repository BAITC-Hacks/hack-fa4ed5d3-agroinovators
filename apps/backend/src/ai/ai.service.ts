import {
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { ConfigService } from "@nestjs/config";

import { GoogleGenAI } from "@google/genai";

@Injectable()
export class AiService {
  private readonly ai: GoogleGenAI;

constructor(
  private readonly configService: ConfigService,
) {
  const apiKey =
    this.configService
      .get<string>("GEMINI_API_KEY")
      ?.trim();

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing",
    );
  }

  if (!/^[\x00-\x7F]+$/.test(apiKey)) {
    throw new Error(
      "GEMINI_API_KEY contains non-ASCII characters. Check apps/backend/.env",
    );
  }

  this.ai = new GoogleGenAI({
    apiKey,
  });
}

  async chat(message: string) {
    try {
      const response =
        await this.ai.models.generateContent({
          model: "gemini-3.8-flash",

          contents: message,

          config: {
            systemInstruction: `
You are TaskAtlas AI, an agricultural workforce assistant for Kazakhstan.

Your goal is to help farms, agricultural companies, laboratories and other organizations create clear demand cards for specialists.

Important rules:
- Never invent missing information.
- If information is missing, ask clarification questions.
- Keep your answers concise.
- Respond in the same language as the user.
- Focus on agriculture and agricultural employment.

You should try to identify:
- organization
- region
- district
- village or city
- agricultural production type
- required specialist
- number of specialists
- required skills
- employment type
- employment period
- salary or compensation
- accommodation
- contact
- application procedure

Suitable specialists include:
- Agronomist
- Biotechnologist
- Veterinarian
- Agricultural engineer
- Soil scientist
- Plant protection specialist
- Food technologist
- Laboratory specialist

When details are missing, clearly list what the organization should clarify.
            `,
          },
        });

      return {
        message:
          response.text ||
          "Не удалось получить ответ от AI.",
      };
    } catch (error) {
      console.error(
        "Gemini error:",
        error,
      );

      throw new InternalServerErrorException(
        "Gemini request failed",
      );
    }
  }
}