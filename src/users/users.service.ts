import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(id: string): Promise<User | undefined> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
}
