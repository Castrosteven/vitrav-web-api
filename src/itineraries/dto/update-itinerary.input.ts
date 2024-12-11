import { CreateItineraryInput } from './create-itinerary.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItineraryInput extends PartialType(CreateItineraryInput) {
  @Field(() => Int)
  id: number;
}
