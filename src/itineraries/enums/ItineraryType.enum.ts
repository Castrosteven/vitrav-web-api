import { registerEnumType } from '@nestjs/graphql';

enum ItineraryType {
  DYNAMIC = 'DYNAMIC',
  CUSTOM = 'CUSTOM',
}

registerEnumType(ItineraryType, {
  name: 'ItineraryType',
});

export default ItineraryType;
