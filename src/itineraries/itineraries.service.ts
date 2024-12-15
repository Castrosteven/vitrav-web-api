import { Injectable } from '@nestjs/common';
import { CreateItineraryInput } from './dto/create-itinerary.input';
import {
  customItineraryGenerator,
  dynamicItineraryGenerator,
} from './google_places_fetcher';
import { PrismaService } from 'src/prisma/prisma.service';
import { Itinerary, User } from '@prisma/client';
import { fetchByText } from './google_places_fetcher/map_utils';

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
    radiusInKm: number = 10, // Default radius of 1000 km
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
      console.log('Paginated itineraries:', paginatedItineraries);
      // Return the paginated itineraries
      return paginatedItineraries;
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      throw new Error('Failed to fetch itineraries near the given location.');
    }
  }

  async aiGenerator(lat: number, long: number): Promise<[Itinerary]> {
    console.log('AI Generator', lat, long);
    // Sample request for the itinerary generation

    // SEND LAT AND LONG TO AI

    // Sample response for the itinerary generation

    // const aiReponse = {
    //   itinerary: [
    //     {
    //       time_of_day: '8:00 AM',
    //       activity_attraction: 'Breakfast at Bagels & Brew',
    //       location: '2004 W Henrietta Rd, Rochester, NY 14623',
    //       estimated_duration: '1 hour',
    //       additional_notes:
    //         'Start your day with fresh bagels and coffee at this local favorite.',
    //     },
    //     {
    //       time_of_day: '9:30 AM',
    //       activity_attraction: 'Visit to Seneca Park Zoo',
    //       location: '2222 St Paul St, Rochester, NY 14621',
    //       estimated_duration: '2 hours',
    //       additional_notes:
    //         'Enjoy a morning exploring the diverse animal exhibits and beautiful grounds.',
    //     },
    //     {
    //       time_of_day: '12:00 PM',
    //       activity_attraction: 'Lunch at The Distillery',
    //       location: '3017 W Henrietta Rd, Rochester, NY 14623',
    //       estimated_duration: '1.5 hours',
    //       additional_notes:
    //         'Relax at this modern American eatery known for its delicious burgers.',
    //     },
    //     {
    //       time_of_day: '1:30 PM',
    //       activity_attraction: 'Explore Highland Park',
    //       location: '170 Niagara St, Rochester, NY 14620',
    //       estimated_duration: '1.5 hours',
    //       additional_notes:
    //         'Stroll through this beautiful park featuring stunning gardens and trails.',
    //     },
    //     {
    //       time_of_day: '3:00 PM',
    //       activity_attraction: 'Visit the George Eastman Museum',
    //       location: '900 East Ave, Rochester, NY 14607',
    //       estimated_duration: '2 hours',
    //       additional_notes:
    //         'Explore the history of photography and cinema at this iconic museum.',
    //     },
    //     {
    //       time_of_day: '5:30 PM',
    //       activity_attraction: 'Dinner at Dinosaur Bar-B-Que',
    //       location: '99 Court St, Rochester, NY 14604',
    //       estimated_duration: '2 hours',
    //       additional_notes:
    //         'Savor some of the best BBQ in town, including ribs and brisket.',
    //     },
    //     {
    //       time_of_day: '7:30 PM',
    //       activity_attraction: 'Evening Walk at Genesee Riverway Trail',
    //       location: '151 Elmwood Ave, Rochester, NY 14620',
    //       estimated_duration: '1 hour',
    //       additional_notes:
    //         'Enjoy a leisurely walk along the river with scenic views.',
    //     },
    //     {
    //       time_of_day: '9:00 PM',
    //       activity_attraction: "Dessert at Abbott's Frozen Custard",
    //       location: '1300 W Henrietta Rd, Rochester, NY 14623',
    //       estimated_duration: '30 minutes',
    //       additional_notes:
    //         'Indulge in a classic Rochester treat, famous for its frozen custard.',
    //     },
    //     {
    //       time_of_day: '9:30 PM',
    //       activity_attraction: 'Wrap up the Day at a Local Cafe',
    //       location:
    //         'Brewed Awakening Coffee Shop, 340 W Main St, Rochester, NY 14608',
    //       estimated_duration: '1 hour',
    //       additional_notes:
    //         'Enjoy a nightcap or light snack while unwinding from the day.',
    //     },
    //   ],
    // };

    const aiReponse = {
      itinerary: [
        {
          time_of_day: '9:00 AM',
          activity_attraction: 'Breakfast at Bagel Oasis',
          location: '72-14 Main St, Flushing, NY 11367',
          estimated_duration: '1 hour',
          additional_notes:
            'Enjoy a classic New York bagel with a variety of spreads.',
        },
        {
          time_of_day: '10:30 AM',
          activity_attraction: 'Visit the New York Hall of Science',
          location: '47-01 111th St, Queens, NY 11368',
          estimated_duration: '2 hours',
          additional_notes:
            'Explore interactive science exhibits, perfect for families.',
        },
        {
          time_of_day: '1:00 PM',
          activity_attraction: 'Lunch at Astoria Seafood',
          location: '35-01 30th Ave, Astoria, NY 11103',
          estimated_duration: '1 hour',
          additional_notes: 'Choose from a selection of fresh seafood dishes.',
        },
        {
          time_of_day: '2:30 PM',
          activity_attraction: 'Stroll through Flushing Meadows-Corona Park',
          location: 'Flushing Meadows-Corona Park, Queens, NY',
          estimated_duration: '1.5 hours',
          additional_notes:
            'Visit iconic landmarks like the Unisphere and Queens Museum.',
        },
        {
          time_of_day: '4:00 PM',
          activity_attraction: 'Explore the Queens Museum',
          location:
            'New York City Building, Flushing Meadows-Corona Park, Queens, NY 11368',
          estimated_duration: '1.5 hours',
          additional_notes:
            'Check out the Panorama of New York City and contemporary exhibits.',
        },
        {
          time_of_day: '5:30 PM',
          activity_attraction: 'Dinner at The Olive Cafe',
          location: '31-29 37th St, Astoria, NY 11103',
          estimated_duration: '1.5 hours',
          additional_notes:
            'Great spot for Mediterranean dishes in a cozy atmosphere.',
        },
        {
          time_of_day: '7:00 PM',
          activity_attraction: 'Catch a Show at the Museum of the Moving Image',
          location: '36-01 35th Ave, Astoria, NY 11106',
          estimated_duration: '2 hours',
          additional_notes:
            'Enjoy film screenings and exhibitions on film history.',
        },
        {
          time_of_day: '9:00 PM',
          activity_attraction: 'Drinks at Astoria Beer & Wine Distributor',
          location: '30-12 33rd St, Astoria, NY 11103',
          estimated_duration: '1 hour',
          additional_notes: 'Select from a variety of local craft beers.',
        },
        {
          time_of_day: '10:00 PM',
          activity_attraction: 'End the Night at Gantry Plaza State Park',
          location: '4-09 47th Rd, Long Island City, NY 11101',
          estimated_duration: '1 hour',
          additional_notes:
            'Enjoy stunning views of the NYC skyline by the waterfront.',
        },
        {
          time_of_day: '11:00 PM',
          activity_attraction: 'Late Night Dessert at Kaffe 1668',
          location: '593 6th Ave, New York, NY 10011',
          estimated_duration: '30 minutes',
          additional_notes:
            'Finish the night with a warm drink and sweet treat.',
        },
      ],
    };
    const placeDetails = aiReponse.itinerary.map((itinerary) => {
      return fetchByText({
        name: itinerary.activity_attraction,
        location: {
          latitude: lat,
          longitude: long,
        },
      });
    });
    const placesResults = await Promise.all(placeDetails);

    const saveItinerary = await this.prisma.itinerary.create({
      data: {
        itinerary_title: 'AI-Generated Itinerary',
        itinerary_category: 'ACTIVE',
        google_places_place_ids: placesResults.map((place) => {
          return place.places[0].id;
        }),
        google_places_primary_place_types: placesResults.map((place) => {
          return place.places[0].types[0];
        }),
        userId: 'cm4nivvst0000sxydst500t5g',
        itinerary_thumbnail: '',
        latitude: lat,
        longitude: long,
        itinerary_description: 'AI-Generated Itinerary',
        itinerary_type: 'CUSTOM',
      },
    });
    return [saveItinerary];
  }
}
