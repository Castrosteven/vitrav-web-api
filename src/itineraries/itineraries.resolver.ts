import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItinerariesService } from './itineraries.service';
import { ItineraryEntity } from './entities/itinerary.entity';
import { CreateItineraryInput } from './dto/create-itinerary.input';
import { GeneratedItinerary } from './entities/generatedItinerary.entity';
import { CurrentUser } from 'src/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '@prisma/client';

@Resolver(() => ItineraryEntity)
export class ItinerariesResolver {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Mutation(() => ItineraryEntity)
  @UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
  createItinerary(
    @CurrentUser() user: User,
    @Args('createItineraryInput') createItineraryInput: CreateItineraryInput,
  ) {
    console.log(`User: ${user.id} is creating itinerary`);
    return this.itinerariesService.create(createItineraryInput, user);
  }

  @Query(() => [ItineraryEntity], { name: 'itineraries' })
  findAll() {
    return this.itinerariesService.findAll();
  }

  @Query(() => ItineraryEntity, { name: 'itinerary' })
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
}
