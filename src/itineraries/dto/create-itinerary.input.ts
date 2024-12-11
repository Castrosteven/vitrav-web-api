import { InputType, Field } from '@nestjs/graphql';
import { ItineraryCategory, ItineraryType } from '../enums';

@InputType()
export class CreateItineraryInput {
  @Field(() => String, {
    description: 'Title of the itinerary',
    nullable: false,
  })
  itinerary_title: string;

  @Field(() => ItineraryCategory, {
    description: 'Category of the itinerary',
    nullable: false,
  })
  itinerary_category: ItineraryCategory;

  @Field(() => ItineraryType, {
    description: 'type of itinerary',
    nullable: false,
  })
  itinerary_type: ItineraryType;

  /**
   * A list of Google Maps Place Types associated with the itinerary.
   *
   * @type {string[]}
   * @description List of primary place types for the itinerary from https://developers.google.com/maps/documentation/places/web-service/place-types
   */
  @Field(() => [String], {
    description: 'List of google map place types',
    nullable: true,
  })
  google_places_primary_place_types: string[];

  /**
   * A list of Google Maps Place ids associated with the itinerary.
   *
   * @type {string[]}
   * @description List of place ids for the itinerary from https://developers.google.com/maps/documentation/places/web-service/place-id
   */
  @Field(() => [String], {
    description:
      'List of place ids for the itinerary from https://developers.google.com/maps/documentation/places/web-service/place-id',
  })
  google_places_place_ids: string[];
}
