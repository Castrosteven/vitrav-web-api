import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data (optional, for clean seeding)
  await prisma.itinerary.deleteMany();
  await prisma.user.deleteMany();
  await prisma.profile.deleteMany();

  // Create a new User (this will be the creator of the itineraries)
  const user = await prisma.user.create({
    data: {
      email: 'john.doe@example.com', // You can change this to any email you want
      name: 'John Doe', // The user's name
      googleId: 'google-id-johndoe-12345', // A unique Google ID for the user (you can simulate or mock this value)
      role: 'ADMIN', // User has the role 'ADMIN' so they can create itineraries
      Profile: {
        create: {
          bio: 'Adventurer and travel blogger',
        },
      },
    },
  });

  console.log('Created user:', user);

  // Create itineraries with the user as the creator
  const itineraries = await prisma.itinerary.createMany({
    data: [
      {
        itinerary_title: 'Eiffel Tower',
        itinerary_description: 'Visit the iconic Eiffel Tower in Paris.',
        itinerary_thumbnail: 'https://example.com/eiffel-tower-thumbnail.jpg',
        itinerary_type: 'DYNAMIC',
        itinerary_category: 'RED',
        google_places_primary_place_types: ['tourist_attraction'],
        google_places_place_ids: ['place_id_1'],
        latitude: 48.8584, // Latitude of the Eiffel Tower, Paris
        longitude: 2.2945, // Longitude of the Eiffel Tower, Paris
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Great Wall of China',
        itinerary_description: 'Explore the Great Wall of China.',
        itinerary_thumbnail: 'https://example.com/great-wall-thumbnail.jpg',
        itinerary_type: 'CUSTOM',
        itinerary_category: 'GREEN',
        google_places_primary_place_types: ['historical_site'],
        google_places_place_ids: ['place_id_2'],
        latitude: 40.4319, // Latitude of the Great Wall of China
        longitude: 116.5704, // Longitude of the Great Wall of China
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Statue of Liberty',
        itinerary_description: 'Visit the Statue of Liberty in New York.',
        itinerary_thumbnail: 'https://example.com/statue-liberty-thumbnail.jpg',
        itinerary_type: 'DYNAMIC',
        itinerary_category: 'BLUE',
        google_places_primary_place_types: ['tourist_attraction'],
        google_places_place_ids: ['place_id_3'],
        latitude: 40.6892, // Latitude of Statue of Liberty, New York
        longitude: -74.0445, // Longitude of Statue of Liberty, New York
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Sydney Opera House',
        itinerary_description: 'Visit the famous Sydney Opera House.',
        itinerary_thumbnail:
          'https://example.com/sydney-opera-house-thumbnail.jpg',
        itinerary_type: 'CUSTOM',
        itinerary_category: 'RED',
        google_places_primary_place_types: ['theater'],
        google_places_place_ids: ['place_id_4'],
        latitude: -33.8568, // Latitude of Sydney Opera House
        longitude: 151.2153, // Longitude of Sydney Opera House
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Machu Picchu',
        itinerary_description: 'Explore the ancient Inca city of Machu Picchu.',
        itinerary_thumbnail: 'https://example.com/machu-picchu-thumbnail.jpg',
        itinerary_type: 'DYNAMIC',
        itinerary_category: 'GREEN',
        google_places_primary_place_types: ['archaeological_site'],
        google_places_place_ids: ['place_id_5'],
        latitude: -13.1631, // Latitude of Machu Picchu
        longitude: -72.545, // Longitude of Machu Picchu
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Pyramids of Giza',
        itinerary_description: 'Discover the Pyramids of Giza in Egypt.',
        itinerary_thumbnail: 'https://example.com/pyramids-giza-thumbnail.jpg',
        itinerary_type: 'CUSTOM',
        itinerary_category: 'BLUE',
        google_places_primary_place_types: ['historical_site'],
        google_places_place_ids: ['place_id_6'],
        latitude: 29.9792, // Latitude of the Pyramids of Giza, Egypt
        longitude: 31.1342, // Longitude of the Pyramids of Giza, Egypt
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Taj Mahal',
        itinerary_description: 'Visit the Taj Mahal in India.',
        itinerary_thumbnail: 'https://example.com/taj-mahal-thumbnail.jpg',
        itinerary_type: 'DYNAMIC',
        itinerary_category: 'RED',
        google_places_primary_place_types: ['tourist_attraction'],
        google_places_place_ids: ['place_id_7'],
        latitude: 27.1751, // Latitude of the Taj Mahal, India
        longitude: 78.0421, // Longitude of the Taj Mahal, India
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Colosseum',
        itinerary_description: 'Explore the Colosseum in Rome, Italy.',
        itinerary_thumbnail: 'https://example.com/colosseum-thumbnail.jpg',
        itinerary_type: 'CUSTOM',
        itinerary_category: 'BLUE',
        google_places_primary_place_types: ['historical_site'],
        google_places_place_ids: ['place_id_8'],
        latitude: 41.8902, // Latitude of the Colosseum, Rome
        longitude: 12.4922, // Longitude of the Colosseum, Rome
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Christ the Redeemer',
        itinerary_description: 'Visit Christ the Redeemer in Rio de Janeiro.',
        itinerary_thumbnail:
          'https://example.com/christ-the-redeemer-thumbnail.jpg',
        itinerary_type: 'DYNAMIC',
        itinerary_category: 'GREEN',
        google_places_primary_place_types: ['tourist_attraction'],
        google_places_place_ids: ['place_id_9'],
        latitude: -22.9519, // Latitude of Christ the Redeemer, Rio
        longitude: -43.2105, // Longitude of Christ the Redeemer, Rio
        userId: user.id, // Associate this itinerary with the created user
      },
      {
        itinerary_title: 'Big Ben',
        itinerary_description: 'See the famous Big Ben clock tower in London.',
        itinerary_thumbnail: 'https://example.com/big-ben-thumbnail.jpg',
        itinerary_type: 'DYNAMIC',
        itinerary_category: 'BLUE',
        google_places_primary_place_types: ['tourist_attraction'],
        google_places_place_ids: ['place_id_10'],
        latitude: 51.5007, // Latitude of Big Ben, London
        longitude: -0.1246, // Longitude of Big Ben, London
        userId: user.id, // Associate this itinerary with the created user
      },
    ],
  });

  console.log('Seeded itineraries:', itineraries);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
