import { Test, TestingModule } from '@nestjs/testing';
import { ItinerariesResolver } from './itineraries.resolver';
import { ItinerariesService } from './itineraries.service';

describe('ItinerariesResolver', () => {
  let resolver: ItinerariesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItinerariesResolver, ItinerariesService],
    }).compile();

    resolver = module.get<ItinerariesResolver>(ItinerariesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
