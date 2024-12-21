import { Module } from '@nestjs/common';
import { EdusmartBatchController } from './edusmart-batch.controller';
import { EdusmartBatchService } from './edusmart-batch.service';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [EdusmartBatchController],
  providers: [EdusmartBatchService],
})
export class EdusmartBatchModule {}
