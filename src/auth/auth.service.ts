import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  googleLogin(req, res: Response) {
    if (!req.user) {
      throw new HttpException('No user from google', HttpStatus.UNAUTHORIZED);
    }

    const { id, email } = req.user as User; // Only include necessary information
    const token = this.jwtService.sign(
      { id, email },
      {
        secret: process.env.JWT_SECRET, // Use a real secret key
        expiresIn: '1h', // Expiration time for the token
      },
    );

    // Send the token in an HTTP-only cookie
    res.cookie('access_token', token, {
      httpOnly: true, // Prevents access to the cookie via JavaScript (for security)
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent over HTTPS in production
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 3600000, // 1 hour in milliseconds (matches the JWT expiration time)
    });

    return res.redirect('http://localhost:3001/api/callback');
  }
}
