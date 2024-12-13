import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // The default behavior of the AuthGuard will handle everything for you.
  // If needed, you can override methods here to implement additional logic.
}
