import { Module } from '@nestjs/common';
import { BoardArticleController } from './board-article.controller';
import { BoardArticleService } from './board-article.service';

@Module({
  controllers: [BoardArticleController],
  providers: [BoardArticleService]
})
export class BoardArticleModule {}
