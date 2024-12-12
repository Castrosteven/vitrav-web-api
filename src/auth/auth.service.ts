import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const token = this.jwtService.sign(req.user); // Sign the token
    return { access_token: token };
  }
}
