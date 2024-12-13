import { protos } from '@googlemaps/places';

export class ITimestamp implements protos.google.protobuf.ITimestamp {
  seconds?: number | null;

  nanos?: number | null;
}

export class IAuthorAttribution
  implements protos.google.maps.places.v1.IAuthorAttribution
{
  displayName?: string | null;

  uri?: string | null;

  photoUri?: string | null;
}

export class ILocalizedText implements protos.google.type.ILocalizedText {
  text?: string | null;

  LanguageCode?: string | null;
}

export class IMoney implements protos.google.type.IMoney {
  currencyCode?: string | null;

  nanos?: number | null;
}

export class IAttribution
  implements protos.google.maps.places.v1.Place.IAttribution
{
  provider?: string | null;

  providerUri?: string | null;
}

export class IAddressComponent
  implements protos.google.maps.places.v1.Place.IAddressComponent
{
  longText?: string | null;

  shortText?: string | null;

  types?: string[] | null;

  languageCode?: string | null;
}

export class ILatLng implements protos.google.type.ILatLng {
  latitude?: number | null;

  longitude?: number | null;
}

export class IPlusCode implements protos.google.maps.places.v1.Place.IPlusCode {
  globalCode?: string | null;

  compoundCode?: string | null;
}

export class IReview implements protos.google.maps.places.v1.IReview {
  name?: string | null;

  relativePublishTimeDescription?: string | null;

  text?: ILocalizedText | null;

  originalText?: ILocalizedText | null;

  rating?: number | null;

  authorAttribution?: IAuthorAttribution | null;
}

export class IReferences implements protos.google.maps.places.v1.IReferences {
  places?: string[] | null;

  reviews?: IReview[] | null;
}

export class IPhoto implements protos.google.maps.places.v1.IPhoto {
  name?: string | null;

  height?: number | null;

  width?: number | null;

  authorAttributions?: IAuthorAttribution[] | null;
}

export class IPriceRange implements protos.google.maps.places.v1.IPriceRange {
  startPrice?: IMoney | null;

  endPrice?: IMoney | null;
}

export class IViewport implements protos.google.geo.type.IViewport {
  low?: ILatLng | null;

  high?: ILatLng | null;
}

export class IGenerativeSummary
  implements protos.google.maps.places.v1.Place.IGenerativeSummary
{
  overview?: ILocalizedText | null;

  description?: ILocalizedText | null;

  references?: IReferences | null;
}

export class IPlace implements protos.google.maps.places.v1.IPlace {
  name?: string | null;

  id?: string | null;

  displayName?: ILocalizedText | null;

  types?: string[] | null;

  primaryType?: string | null;

  primaryTypeDisplayName?: ILocalizedText | null;

  nationalPhoneNumber?: string | null;

  internationalPhoneNumber?: string | null;

  formattedAddress?: string | null;

  shortFormattedAddress?: string | null;

  rating?: number | null;

  viewport?: IViewport | null;

  location?: ILatLng | null;

  generativeSummary?: IGenerativeSummary | null;

  plusCode?: IPlusCode | null;

  addressComponents?: IAddressComponent[] | null;

  photos?: IPhoto[] | null;

  attributions?: IAttribution[] | null;

  userRatingCount?: number | null;

  editorialSummary?: ILocalizedText | null;
}
