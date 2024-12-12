import { Test, TestingModule } from '@nestjs/testing';
import { EdusmartBatchController } from './edusmart-batch.controller';
import { EdusmartBatchService } from './edusmart-batch.service';

describe('EdusmartBatchController', () => {
  let edusmartBatchController: EdusmartBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EdusmartBatchController],
      providers: [EdusmartBatchService],
    }).compile();

    edusmartBatchController = app.get<EdusmartBatchController>(EdusmartBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(edusmartBatchController.getHello()).toBe('Hello World!');
    });
  });
});
