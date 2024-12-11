import { Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesResolver } from './itineraries.resolver';

@Module({
  providers: [ItinerariesResolver, ItinerariesService],
})
export class ItinerariesModule {}
