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
        google_places_primary_place_types: [
          'amusement_park',
          'italian_restaurant',
        ],
        itinerary_title: 'Family Fun Day Out',
        itinerary_description:
          'Enjoy a day filled with laughter and excitement at the amusement park, followed by a delicious Italian meal that will please both kids and adults alike!',
        itinerary_category: 'FAMILY_FRIENDLY',
        itinerary_thumbnail: '',
        userId: user.id,
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
