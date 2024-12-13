import { Injectable } from '@nestjs/common';
import { CreateItineraryInput } from './dto/create-itinerary.input';
import {
  customItineraryGenerator,
  dynamicItineraryGenerator,
} from './google_places_fetcher';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class ItinerariesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createItineraryInput: CreateItineraryInput, user: User) {
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
        userId: user.id,
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

  async getItinerariesNear(
    lat: number,
    long: number,
    page: number = 1,
    pageSize: number = 10,
    radiusInKm: number = 1000, // Default radius of 1000 km
  ) {
    try {
      // Constants for Earth radius
      const EARTH_RADIUS = 6371; // In kilometers

      // Haversine formula to calculate the distance between two lat/long points
      function haversine(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
      ): number {
        const toRadians = (degree: number) => degree * (Math.PI / 180);
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c; // Return the distance in kilometers
      }

      // Query all itineraries with latitude and longitude fields
      const itineraries = await this.prisma.itinerary.findMany({
        where: {
          latitude: { not: null },
          longitude: { not: null },
        },
      });

      // Calculate distances for each itinerary
      const itinerariesWithDistance = itineraries.map((itinerary) => {
        const distance = haversine(
          lat,
          long,
          itinerary.latitude!,
          itinerary.longitude!,
        );
        return { ...itinerary, distance };
      });

      // Filter itineraries within the given radius
      const filteredItineraries = itinerariesWithDistance.filter(
        (itinerary) => itinerary.distance <= radiusInKm,
      );

      // Sort itineraries by distance in ascending order
      filteredItineraries.sort((a, b) => a.distance - b.distance);

      // Pagination logic
      const offset = (page - 1) * pageSize;
      const paginatedItineraries = filteredItineraries.slice(
        offset,
        offset + pageSize,
      );

      // Return the paginated itineraries
      return paginatedItineraries;
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      throw new Error('Failed to fetch itineraries near the given location.');
    }
  }
}
