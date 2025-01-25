import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Query,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { BoardArticleService } from './board-article.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
	AllBoardArticlesInquiry, 
	BoardArticleInput,
	BoardArticlesInquiry,
} from '../../libs/dto/board-article/board-article.input';
import { AuthMember } from '../auth/decorators/auth.member.decorator';
import { ObjectId } from 'mongoose';
import { BoardArticle, BoardArticles } from '../../libs/dto/board-article/board-article';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { BoardArticleUpdate } from '../../libs/dto/board-article/board-article.update';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { getMulterUploader } from '../../libs/utils/uploader';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('article')
export class BoardArticleController {
	constructor(private readonly boardArticleService: BoardArticleService) {}

	@UseGuards(AuthGuard)
	@Post('createBoardArticle') 
	@UseInterceptors(FileInterceptor('articleImage', getMulterUploader('article')))
	public async createBoardArticle(
		@AuthMember('_id') memberId: ObjectId,
		@Body() body: any,
		@UploadedFile() file: Express.Multer.File,
	): Promise<BoardArticle> {
		if (!memberId) {
			throw new Error('Member ID is required!');
		}
		const { articleTitle, articleContent, articleCategory } = body;
		if (!articleTitle || !articleContent || !articleCategory) {
		  throw new BadRequestException('Missing required fields');
		}
		const uploadPath = `./uploads/article`; // Path ni dinamik tarzda kiritish
		if (file) {
			body.articleImage = `${uploadPath}/${file.filename}`;
		}

		const parsedInput = {
			articleTitle,
			articleContent,
			articleCategory,
			articleImage: body.articleImage, 
		  };

        console.log('Parsed input:', parsedInput);	
		return await this.boardArticleService.createBoardArticle(memberId, parsedInput);
	}

	@UseGuards(WithoutGuard)
	@Get('getBoardArticle')
	public async getBoardArticle(@Query() input: string, @AuthMember('_id') memberId: ObjectId): Promise<BoardArticle> {
		console.log('GET: getBoardArticle');
		const articleId = shapeIntoMongoObjectId(input);
		return await this.boardArticleService.getBoardArticle(memberId, articleId);
	}

	@UseGuards(AuthGuard)
	@Post('updateBoardArticle')
	public async updateBoardArticle(
		@Body('input') input: BoardArticleUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<BoardArticle> {
		console.log('memberId', memberId);
		console.log('POST: updateBoardArticle');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.boardArticleService.updateBoardArticle(memberId, input);
	}

	@UseGuards(WithoutGuard)
	@Get('getBoardArticles')
	public async getBoardArticles(
		@Query() input: BoardArticlesInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<BoardArticles> {
		console.log('GET: getBoardArticles');
		return await this.boardArticleService.getBoardArticles(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Post('likeTargetBoardArticle')
	public async likeTargetBoardArticle(
		@Body('articleId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<BoardArticle> {
		console.log('POST: likeTargetBoardArticle');
		const likeRefId = shapeIntoMongoObjectId(input);
		return await this.boardArticleService.likeTargetBoardArticle(memberId, likeRefId);
	}

	/** ADMIN **/

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Get('getAllBoardArticlesAdmin')
	public async getAllBoardArticlesByAdmin(
		@Query() input: AllBoardArticlesInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<BoardArticles> {
		console.log('GET: getAllBoardArticlesByAdmin');
		return await this.boardArticleService.getAllBoardArticlesByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Post('updateBoardArticleAdmin')
	public async updateBoardArticleByAdmin(
		@Body('input') input: BoardArticleUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<BoardArticle> {
		console.log('POST: updateBoardArticleByAdmin');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.boardArticleService.updateBoardArticleByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Post('removeBoardArticleAdmin')
	public async removeBoardArticleByAdmin(
		@Body('articleId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<BoardArticle> {
		console.log('POST: removeBoardArticleByAdmin');
		const articleId = shapeIntoMongoObjectId(input);
		return await this.boardArticleService.removeBoardArticleByAdmin(articleId);
	}
}
