import { Test, TestingModule } from '@nestjs/testing';
import { SchedulersHistoryService } from './schedulers_history.service';

describe('SchedulersHistoryService', () => {
  let service: SchedulersHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulersHistoryService],
    }).compile();

    service = module.get<SchedulersHistoryService>(SchedulersHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
