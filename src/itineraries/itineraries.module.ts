import { Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { AssistantService } from 'src/assistant/assistant.service';

@Module({
  providers: [ItinerariesService, AssistantService],
  controllers: [ItinerariesController],
})
export class ItinerariesModule {}
