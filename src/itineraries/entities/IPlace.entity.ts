import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ITimestamp {
  @Field(() => Float)
  seconds: number;

  @Field(() => Float)
  nanos: number;
}

@ObjectType()
export class IAuthorAttribution {
  @Field()
  displayName: string;

  @Field()
  uri: string;

  @Field()
  photoUri: string;
}

@ObjectType()
export class ILocalizedText {
  @Field()
  text: string;

  @Field()
  LanguageCode: string;
}

@ObjectType()
export class IMoney {
  @Field()
  currencyCode: string;

  @Field(() => Float)
  nanos: number;
}

@ObjectType()
export class IAttribution {
  @Field()
  provider: string;

  @Field()
  providerUri: string;
}

@ObjectType()
export class IAddressComponent {
  @Field()
  longText: string;

  @Field()
  shortText: string;

  @Field(() => [String])
  types: string[];

  @Field()
  languageCode: string;
}

@ObjectType()
export class ILatLng {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}

@ObjectType()
export class IPlusCode {
  @Field()
  globalCode: string;

  @Field()
  compoundCode: string;
}

@ObjectType()
export class IReview {
  @Field()
  name: string;

  @Field()
  relativePublishTimeDescription: string;

  @Field(() => ILocalizedText)
  text: ILocalizedText;

  @Field(() => ILocalizedText)
  originalText: ILocalizedText;

  @Field(() => Float)
  rating: number;

  @Field(() => IAuthorAttribution)
  authorAttribution: IAuthorAttribution;
}

@ObjectType()
export class IReferences {
  @Field(() => [String])
  places: string[];

  @Field(() => [IReview])
  reviews: IReview[];
}

@ObjectType()
export class IPhoto {
  @Field()
  name: string;

  @Field(() => Float)
  height: number;

  @Field(() => Float)
  width: number;

  @Field(() => [IAuthorAttribution])
  authorAttributions: IAuthorAttribution[];
}

@ObjectType()
export class IPriceRange {
  @Field(() => IMoney)
  startPrice: IMoney;

  @Field(() => IMoney)
  endPrice: IMoney;
}

@ObjectType()
export class IViewport {
  @Field(() => ILatLng)
  low: ILatLng;

  @Field(() => ILatLng)
  high: ILatLng;
}

@ObjectType()
export class IGenerativeSummary {
  @Field(() => ILocalizedText)
  overview: ILocalizedText;

  @Field(() => ILocalizedText)
  description: ILocalizedText;

  @Field(() => IReferences)
  references: IReferences;
}

@ObjectType()
export class IPlace {
  @Field()
  name: string;

  @Field()
  id: string;

  @Field(() => ILocalizedText)
  displayName: ILocalizedText;

  @Field(() => [String])
  types: string[];

  @Field()
  primaryType: string;

  @Field(() => ILocalizedText)
  primaryTypeDisplayName: ILocalizedText;

  @Field()
  nationalPhoneNumber: string;

  @Field()
  internationalPhoneNumber: string;

  @Field()
  formattedAddress: string;

  @Field()
  shortFormattedAddress: string;

  @Field(() => Float)
  rating: number;

  @Field(() => IViewport)
  viewport: IViewport;

  @Field(() => ILatLng)
  location: ILatLng;

  @Field(() => IGenerativeSummary)
  generativeSummary: IGenerativeSummary;

  @Field(() => IPlusCode)
  plusCode: IPlusCode;

  @Field(() => [IAddressComponent])
  addressComponents: IAddressComponent[];

  @Field(() => [IPhoto])
  photos: IPhoto[];

  @Field(() => [IAttribution])
  attributions: IAttribution[];

  @Field(() => Float)
  userRatingCount: number;

  @Field(() => ILocalizedText)
  editorialSummary: ILocalizedText;
}
