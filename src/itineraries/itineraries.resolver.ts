import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItinerariesService } from './itineraries.service';
import { Itinerary } from './entities/itinerary.entity';
import { CreateItineraryInput } from './dto/create-itinerary.input';
import { GeneratedItinerary } from './entities/generatedItinerary.entity';
// import { UpdateItineraryInput } from './dto/update-itinerary.input';
@Resolver(() => Itinerary)
export class ItinerariesResolver {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Mutation(() => Itinerary)
  createItinerary(
    @Args('createItineraryInput') createItineraryInput: CreateItineraryInput,
  ) {
    return this.itinerariesService.create(createItineraryInput);
  }

  @Query(() => [Itinerary], { name: 'itineraries' })
  findAll() {
    return this.itinerariesService.findAll();
  }

  @Query(() => Itinerary, { name: 'itinerary' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.itinerariesService.findOne(id);
  }

  @Query(() => GeneratedItinerary, { name: 'genereateItinerary' })
  generate(
    @Args('id', { type: () => String }) id: string,
    @Args('lat', {
      type: () => Number,
      nullable: true,
      description: 'Latitude only required if itinerary_type is dynamic',
    })
    lat: number,
    @Args('long', {
      type: () => Number,
      nullable: true,
      description: 'Longititude only required if itinerary_type is dynamic',
    })
    long: number,
  ) {
    return this.itinerariesService.generate(id, lat, long);
  }

  // @Mutation(() => Itinerary)
  // updateItinerary(
  //   @Args('updateItineraryInput') updateItineraryInput: UpdateItineraryInput,
  // ) {
  //   return this.itinerariesService.update(
  //     updateItineraryInput.id,
  //     updateItineraryInput,
  //   );
  // }

  // @Mutation(() => Itinerary)
  // removeItinerary(@Args('id', { type: () => String }) id: string) {
  //   return this.itinerariesService.remove(id);
  // }
}
