import { PartialType } from '@nestjs/swagger';
import { CreateItineraryInput } from './create-itinerary.input';

export class UpdateItineraryInput extends PartialType(CreateItineraryInput) {
  id: number;
}
