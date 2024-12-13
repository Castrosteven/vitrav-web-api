// import { ItineraryCategory, ItineraryType } from '../enums';
import { Itinerary, ItineraryCategory, ItineraryType } from '@prisma/client';

/**
 * Represents an itinerary entity.
 */
export class ItineraryEntity implements Itinerary {
  createdAt: Date;

  updatedAt: Date;

  userId: string;

  id: string;

  itinerary_title: string;

  itinerary_category: ItineraryCategory;

  itinerary_type: ItineraryType;

  itinerary_description: string;

  itinerary_thumbnail: string;
  latitude: number;
  longitude: number;
  /**
   * A list of Google Maps Place Types associated with the itinerary.
   *
   * @type {string[]}
   * @description List of primary place types for the itinerary from https://developers.google.com/maps/documentation/places/web-service/place-types
   */

  google_places_primary_place_types: string[];

  /**
   * A list of Google Maps Place ids associated with the itinerary.
   *
   * @type {string[]}
   * @description 'List of place ids for the itinerary from https://developers.google.com/maps/documentation/places/web-service/place-id',

   */

  google_places_place_ids: string[];
}
