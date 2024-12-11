import { Injectable } from '@nestjs/common';
import { CreateItineraryInput } from './dto/create-itinerary.input';
// import { UpdateItineraryInput } from './dto/update-itinerary.input';
import prisma from 'src/database';
import { $Enums } from '@prisma/client';
import {
  customItineraryGenerator,
  dynamicItineraryGenerator,
} from './google_places_fetcher';

@Injectable()
export class ItinerariesService {
  async create(createItineraryInput: CreateItineraryInput) {
    const {
      itinerary_title,
      google_places_place_ids,
      google_places_primary_place_types,
      itinerary_category,
      itinerary_type,
    } = createItineraryInput;
    // TODO create the itinerary_thumbnail
    return await prisma.itinerary.create({
      data: {
        itinerary_thumbnail: '',
        itinerary_title,
        google_places_place_ids,
        google_places_primary_place_types,
        itinerary_category: $Enums.ItineraryCategory[itinerary_category],
        itinerary_type: $Enums.ItineraryCategory[itinerary_type],
      },
    });
  }

  async findAll() {
    return await prisma.itinerary.findMany();
  }

  async findOne(id: string) {
    return await prisma.itinerary.findUniqueOrThrow({
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
