import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from "@nestjs/common";

import { AiService } from "./ai.service";

@Controller("ai")
export class AiController {
  constructor(
    private readonly aiService: AiService,
  ) {}

  @Post("chat")
  async chat(
    @Body()
    body: {
      message?: string;
    },
  ) {
    if (!body.message?.trim()) {
      throw new BadRequestException(
        "Message is required",
      );
    }

    return this.aiService.chat(
      body.message,
    );
  }
}