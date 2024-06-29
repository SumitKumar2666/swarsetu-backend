import { Module } from '@nestjs/common';
import { VoiceGateway } from './voice/voice.gateway';

@Module({
  providers: [VoiceGateway],
})
export class VoiceHandlingModule {}
