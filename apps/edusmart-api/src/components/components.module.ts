import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { BoardArticleModule } from './board-article/board-article.module';

@Module({
  imports: [MemberModule, AuthModule, BoardArticleModule]
})
export class ComponentsModule {}
