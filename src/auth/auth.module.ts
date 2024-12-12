import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Set a secret key for signing the JWT
      signOptions: { expiresIn: '1h' }, // Set the token expiration time
    }),
  ],
  controllers: [AuthController],

  providers: [AuthService, GoogleStrategy, JwtStrategy],
  exports: [JwtModule], // Make sure it's exported so other modules can use it
})
export class AuthModule {}
