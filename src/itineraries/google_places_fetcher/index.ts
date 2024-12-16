import { Itinerary } from '@prisma/client';
import { fetchPlaceById } from './map_utils';

export const customItineraryGenerator = async (itinerary: Itinerary) => {
  const { google_places_place_ids, id, itinerary_title, itinerary_category } =
    itinerary;

  const placesPromises = google_places_place_ids.map((activity) =>
    fetchPlaceById(activity),
  );
  return {
    id,
    itinerary_title,
    itinerary_category,
    activities: await Promise.all(placesPromises),
  };
};

// export const dynamicItineraryGenerator = async (
//   itinerary: Itinerary,
//   lat: number,
//   lng: number,
// ) => {
//   try {
//     const {
//       itinerary_type,
//       google_places_primary_place_types,
//       id,
//       itinerary_title,
//       itinerary_category,
//     } = itinerary;

//     if (itinerary_type === 'DYNAMIC' && google_places_primary_place_types) {
//       const location = {
//         latitude: lat,
//         longitude: lng,
//       };
//       const activitiesPlaces = await fetchNearByPlaces(
//         google_places_primary_place_types,
//         location,
//       );
//       return {
//         id,
//         itinerary_title,
//         itinerary_category,
//         activities: activitiesPlaces,
//       };
//     }
//     throw new Error('Itinerary is not dynamic');
//   } catch (error) {
//     console.error(`Error generating itinerary: ${error}`);
//     throw error;
//   }
// };
