import { Test, TestingModule } from '@nestjs/testing';
import { SchedulersHistoryController } from './schedulers_history.controller';
import { SchedulersHistoryService } from './schedulers_history.service';

describe('SchedulersHistoryController', () => {
  let controller: SchedulersHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulersHistoryController],
      providers: [SchedulersHistoryService],
    }).compile();

    controller = module.get<SchedulersHistoryController>(SchedulersHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
