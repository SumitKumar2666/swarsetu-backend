import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VoiceHandlingModule } from './voice-handling/voice-handling.module';
import { TranslationModule } from './translation/translation.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [UsersModule, VoiceHandlingModule, TranslationModule, AuthModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
