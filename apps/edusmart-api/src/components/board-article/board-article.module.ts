import { Module } from '@nestjs/common';
import { BoardArticleController } from './board-article.controller';
import { BoardArticleService } from './board-article.service';
import { MongooseModule } from '@nestjs/mongoose';
import BoardArticleSchema from '../../schemas/BoardArticle.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
		MongooseModule.forFeature([{ name: 'BoardArticle', schema: BoardArticleSchema }]),
		AuthModule,
		ViewModule,
		MemberModule,
		LikeModule
	],
  controllers: [BoardArticleController],
  providers: [BoardArticleService],
	exports: [BoardArticleService],

})
export class BoardArticleModule {}
