import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],

  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
