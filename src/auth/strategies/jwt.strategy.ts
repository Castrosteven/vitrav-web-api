// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service'; // Assuming you have Prisma to fetch users

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the token from the Authorization header
      secretOrKey: process.env.JWT_SECRET, // Use the secret key from environment
    });
  }

  async validate(payload: any) {
    console.log('Payload:', payload);
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id }, // Assuming `sub` is the user ID
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user; // Returning the user object to be added to the request object
  }
}
