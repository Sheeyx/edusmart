import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BoardArticleService } from './board-article.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BoardArticleInput } from '../../libs/dto/board-article/board-article.input';
import { AuthMember } from '../auth/decorators/auth.member.decorator';
import { ObjectId } from 'mongoose';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';


@Controller('article')
export class BoardArticleController {
    constructor(private readonly boardArticleService: BoardArticleService) {}
	
    @UseGuards(AuthGuard)
	@Post('createBoardArticle')
	public async createBoardArticle(
		@Body('input') input: BoardArticleInput,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<BoardArticle> {
		console.log('Mutation: createBoardArticle');
		return await this.boardArticleService.createBoardArticle(memberId, input);
	}

	@UseGuards(WithoutGuard)
    @Get('getBoardArticle')
	public async getBoardArticle(
		@Query() input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<BoardArticle> {
		console.log('Query: getBoardArticle');
		const articleId = shapeIntoMongoObjectId(input);
		return await this.boardArticleService.getBoardArticle(memberId, articleId);
	}
}
