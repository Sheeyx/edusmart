import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/auth.member.decorator';
import { ObjectId } from 'mongoose';
import { LessonsInput } from '../../libs/dto/lessons/lessons.input';
import { LessonsService } from './lessons.service';
import { Lessons } from '../../libs/dto/lessons/lesson';
import { WithoutGuard } from '../auth/guards/without.guard';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { LessonsUpdate } from '../../libs/dto/lessons/lessons-update';

@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonService: LessonsService) {}

    
    @UseGuards(AuthGuard)
	@Post('create')
	public async createBoardArticle(
		@Body('input') input: LessonsInput,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Lessons> {
		console.log('POST: createlessons', input);
		return this.lessonService.createLessons(memberId, input);
	}

    @UseGuards(WithoutGuard)
    @Get('get')
	public async getLessons(
		@Query() input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Lessons> {
		console.log('GET: getLessons');
		const lessonId = shapeIntoMongoObjectId(input);
		return await this.lessonService.getLessons(memberId, lessonId);
	}

	@UseGuards(AuthGuard)
    @Post("update")
	public async updateBoardArticle(
		@Body('input') input: LessonsUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Lessons> {
        console.log('memberId', memberId)
		console.log('POST: updateBoardArticle');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.lessonService.updateLesson(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Post('likeTargetBoardArticle')
	public async likeTargetBoardArticle(
		@Body('lessonId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Lessons> {
		console.log('POST: likeTargetLessons');
		const likeRefId = shapeIntoMongoObjectId(input);
		return await this.lessonService.likeTargetLessons(memberId, likeRefId);
	}
}
