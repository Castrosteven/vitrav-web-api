import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Profile } from 'passport-google-oauth20'; // Import the type for Profile

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly prismaService: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile, // Typing the profile parameter
    done: VerifyCallback,
  ): Promise<void> {
    try {
      let user: User;
      const { displayName, emails, id } = profile;

      const userExists = await this.prismaService.user.findUnique({
        where: { googleId: id },
      });

      if (userExists) {
        user = userExists;
      } else {
        user = await this.prismaService.user.create({
          data: {
            googleId: id,
            email: emails[0].value,
            name: displayName,
          },
        });
      }

      done(null, user); // Successfully authenticated, passing user
    } catch (error) {
      console.error('Google authentication error:', error);
      done(error, false); // Error handling in case of failure
    }
  }
}
