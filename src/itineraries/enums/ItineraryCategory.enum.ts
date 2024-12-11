import { registerEnumType } from '@nestjs/graphql';

enum ItineraryCategory {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
}

registerEnumType(ItineraryCategory, {
  name: 'ItineraryCategory',
});

export default ItineraryCategory;
