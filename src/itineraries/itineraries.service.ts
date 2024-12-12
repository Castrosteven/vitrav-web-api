import { Injectable } from '@nestjs/common';
import { CreateItineraryInput } from './dto/create-itinerary.input';
import {
  customItineraryGenerator,
  dynamicItineraryGenerator,
} from './google_places_fetcher';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItinerariesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createItineraryInput: CreateItineraryInput) {
    const {
      itinerary_title,
      google_places_place_ids,
      google_places_primary_place_types,
      itinerary_category,
      itinerary_type,
    } = createItineraryInput;
    // TODO create the itinerary_thumbnail
    return await this.prisma.itinerary.create({
      data: {
        itinerary_thumbnail: '',
        itinerary_title,
        google_places_place_ids,
        google_places_primary_place_types,
        itinerary_category: itinerary_category,
        itinerary_type: itinerary_type,
      },
    });
  }

  async findAll() {
    return await this.prisma.itinerary.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.itinerary.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async generate(id: string, lat: number, lng: number) {
    const itinerary = await this.findOne(id);
    if (itinerary.itinerary_type === 'DYNAMIC') {
      return await dynamicItineraryGenerator(itinerary, lat, lng);
    }
    if (itinerary.itinerary_type === 'CUSTOM') {
      return await customItineraryGenerator(itinerary);
    }
  }

  // update(id: number, updateItineraryInput: UpdateItineraryInput) {
  //   return `This action updates a #${id} itinerary`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} itinerary`;
  // }
}
