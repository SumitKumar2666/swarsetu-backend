import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { TranslationModule } from './translation/translation.module';
import { UserModule } from './user/user.module';
import { VoiceHandlingModule } from './voice-handling/voice-handling.module';

@Module({
  imports: [
    VoiceHandlingModule,
    TranslationModule,
    AuthModule,
    CoreModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
