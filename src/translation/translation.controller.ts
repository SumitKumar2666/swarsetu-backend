import { Controller, Post, Body, Req, BadRequestException } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('speech-to-text')
  async convertSpeechToText(@Body() body: { audioBase64: string }) {
    if (!body.audioBase64) {
      throw new BadRequestException('No audio data provided');
    }
    return this.translationService.speechToText(body.audioBase64);
  }

  @Post('translate-text')
  async translateText(@Body() body: { text: string, sourceLang: string, targetLang: string }) {
    return this.translationService.translateText(body.text, body.sourceLang, body.targetLang);
  }

  @Post('text-to-speech')
  async convertTextToSpeech(@Body() body: { text: string }) {
    return this.translationService.textToSpeech(body.text);
  }
}
