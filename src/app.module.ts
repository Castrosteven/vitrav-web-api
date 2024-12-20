import { Module } from '@nestjs/common';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AssistantModule } from './assistant/assistant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ItinerariesModule,
    UsersModule,
    PrismaModule,
    AuthModule,
    AssistantModule,
  ],
  providers: [],
})
export class AppModule {
  constructor() {}
}
