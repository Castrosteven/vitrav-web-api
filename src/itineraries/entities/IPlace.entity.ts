import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ITimestamp {
  @Field(() => Float, { nullable: true })
  seconds?: number | null;

  @Field(() => Float, { nullable: true })
  nanos?: number | null;
}

@ObjectType()
export class IAuthorAttribution {
  @Field({ nullable: true })
  displayName?: string | null;

  @Field({ nullable: true })
  uri?: string | null;

  @Field({ nullable: true })
  photoUri?: string | null;
}

@ObjectType()
export class ILocalizedText {
  @Field({ nullable: true })
  text?: string | null;

  @Field({ nullable: true })
  LanguageCode?: string | null;
}

@ObjectType()
export class IMoney {
  @Field({ nullable: true })
  currencyCode?: string | null;

  @Field(() => Float, { nullable: true })
  nanos?: number | null;
}

@ObjectType()
export class IAttribution {
  @Field({ nullable: true })
  provider?: string | null;

  @Field({ nullable: true })
  providerUri?: string | null;
}

@ObjectType()
export class IAddressComponent {
  @Field({ nullable: true })
  longText?: string | null;

  @Field({ nullable: true })
  shortText?: string | null;

  @Field(() => [String], { nullable: true })
  types?: string[] | null;

  @Field({ nullable: true })
  languageCode?: string | null;
}

@ObjectType()
export class ILatLng {
  @Field(() => Float, { nullable: true })
  latitude?: number | null;

  @Field(() => Float, { nullable: true })
  longitude?: number | null;
}

@ObjectType()
export class IPlusCode {
  @Field({ nullable: true })
  globalCode?: string | null;

  @Field({ nullable: true })
  compoundCode?: string | null;
}

@ObjectType()
export class IReview {
  @Field({ nullable: true })
  name?: string | null;

  @Field({ nullable: true })
  relativePublishTimeDescription?: string | null;

  @Field(() => ILocalizedText, { nullable: true })
  text?: ILocalizedText | null;

  @Field(() => ILocalizedText, { nullable: true })
  originalText?: ILocalizedText | null;

  @Field(() => Float, { nullable: true })
  rating?: number | null;

  @Field(() => IAuthorAttribution, { nullable: true })
  authorAttribution?: IAuthorAttribution | null;
}

@ObjectType()
export class IReferences {
  @Field(() => [String], { nullable: true })
  places?: string[] | null;

  @Field(() => [IReview], { nullable: true })
  reviews?: IReview[] | null;
}

@ObjectType()
export class IPhoto {
  @Field({ nullable: true })
  name?: string | null;

  @Field(() => Float, { nullable: true })
  height?: number | null;

  @Field(() => Float, { nullable: true })
  width?: number | null;

  @Field(() => [IAuthorAttribution], { nullable: true })
  authorAttributions?: IAuthorAttribution[] | null;
}

@ObjectType()
export class IPriceRange {
  @Field(() => IMoney, { nullable: true })
  startPrice?: IMoney | null;

  @Field(() => IMoney, { nullable: true })
  endPrice?: IMoney | null;
}

@ObjectType()
export class IViewport {
  @Field(() => ILatLng, { nullable: true })
  low?: ILatLng | null;

  @Field(() => ILatLng, { nullable: true })
  high?: ILatLng | null;
}
@ObjectType()
export class IGenerativeSummary {
  @Field(() => ILocalizedText, { nullable: true })
  overview?: ILocalizedText | null;

  @Field(() => ILocalizedText, { nullable: true })
  description?: ILocalizedText | null;

  @Field(() => IReferences, { nullable: true })
  references?: IReferences | null;
}

@ObjectType()
export class IPlace {
  @Field({ nullable: true })
  name?: string | null;

  @Field({ nullable: true })
  id?: string | null;

  @Field(() => ILocalizedText, { nullable: true })
  displayName?: ILocalizedText | null;

  @Field(() => [String], { nullable: true })
  types?: string[] | null;

  @Field({ nullable: true })
  primaryType?: string | null;

  @Field(() => ILocalizedText, { nullable: true })
  primaryTypeDisplayName?: ILocalizedText | null;

  @Field({ nullable: true })
  nationalPhoneNumber?: string | null;

  @Field({ nullable: true })
  internationalPhoneNumber?: string | null;

  @Field({ nullable: true })
  formattedAddress?: string | null;

  @Field({ nullable: true })
  shortFormattedAddress?: string | null;

  @Field(() => Float, { nullable: true })
  rating?: number | null;

  @Field(() => IViewport, { nullable: true })
  viewport?: IViewport | null;

  @Field(() => ILatLng, { nullable: true })
  location?: ILatLng | null;

  @Field(() => IGenerativeSummary, { nullable: true })
  generativeSummary?: IGenerativeSummary | null;

  @Field(() => IPlusCode, { nullable: true })
  plusCode?: IPlusCode | null;

  @Field(() => [IAddressComponent], { nullable: true })
  addressComponents?: IAddressComponent[] | null;

  @Field(() => [IPhoto], { nullable: true })
  photos?: IPhoto[] | null;

  @Field(() => [IAttribution], { nullable: true })
  attributions?: IAttribution[] | null;

  @Field(() => Float, { nullable: true })
  userRatingCount?: number | null;

  @Field(() => ILocalizedText, { nullable: true })
  editorialSummary?: ILocalizedText | null;
}
