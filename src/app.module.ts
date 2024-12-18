import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { TranslationModule } from './translation/translation.module';
import { UserModule } from './user/user.module';
import { VoiceHandlingModule } from './voice-handling/voice-handling.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    }),
    VoiceHandlingModule,
    TranslationModule,
    // AuthModule,
    CoreModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
