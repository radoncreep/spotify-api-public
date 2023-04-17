import { Test, TestingModule } from '@nestjs/testing';
import { ArtistsService } from './artists.service';

describe('Artists', () => {
  let provider: ArtistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistsService],
    }).compile();

    provider = module.get<ArtistsService>(ArtistsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
