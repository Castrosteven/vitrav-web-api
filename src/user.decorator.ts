// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator to extract the user from the request object
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log('Request:', request);
    return request.user; // Assuming the JWT validation attaches `user` to the request object
  },
);
