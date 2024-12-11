import { placesClient } from './client';
import { protos } from '@googlemaps/places';

export const fetchPlaceById = async (
  placeName: string,
): Promise<protos.google.maps.places.v1.IPlace> => {
  try {
    console.log('fetchPlaceById' + placeName);
    const response = await placesClient.getPlace(
      {
        name: `places/${placeName}`,
        languageCode: 'en',
      },
      {
        otherArgs: {
          headers: {
            'X-Goog-FieldMask': '*',
          },
        },
      },
    );
    return response[0];
  } catch (error) {
    console.error(`Error fetching place by id: ${placeName}`, error);
    throw error;
  }
};

export const fetchNearByPlaces = async (
  includedPrimaryTypes: string[],
  location: protos.google.type.ILatLng,
  maxRadius: number = 3000,
  radiusIncrement: number = 100,
): Promise<protos.google.maps.places.v1.IPlace[]> => {
  if (!location || !location.latitude || !location.longitude) {
    throw new Error('Valid location with latitude and longitude is required.');
  }

  let radius = 1500; // Initial search radius
  const foundPlaces: protos.google.maps.places.v1.IPlace[] = [];
  const remainingTypes = new Set(includedPrimaryTypes);

  while (remainingTypes.size > 0 && radius <= maxRadius) {
    try {
      const response = await placesClient.searchNearby(
        {
          rankPreference: 'POPULARITY',
          includedPrimaryTypes: Array.from(remainingTypes),
          locationRestriction: {
            circle: {
              center: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
              radius,
            },
          },
        },
        {
          otherArgs: {
            headers: {
              'X-Goog-FieldMask': '*', // Customize based on your needs
            },
          },
        },
      );

      const res = response[0];
      const places = res?.places || [];

      // Extract one place for each remaining type
      const newPlaces = includedPrimaryTypes.map((type) => {
        if (remainingTypes.has(type)) {
          const place = places.find((p) => p.primaryType === type);
          if (place) {
            remainingTypes.delete(type);
            return place;
          }
        }
        return undefined;
      });

      foundPlaces.push(
        ...(newPlaces.filter(Boolean) as protos.google.maps.places.v1.IPlace[]),
      );

      // Increment the radius for the next search
      radius += radiusIncrement;
    } catch (error) {
      console.error('Error during searchNearby call:', error);
      throw error;
    }
  }

  if (remainingTypes.size > 0) {
    // throw new Error(
    //   `Could not find places for all types within the maximum radius of ${maxRadius}. Missing types: ${Array.from(
    //     remainingTypes
    //   ).join(", ")}`
    // );
    return foundPlaces; // Return found places even if some types are missing
  }

  return foundPlaces;
};
