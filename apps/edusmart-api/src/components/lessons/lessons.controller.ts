import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/auth.member.decorator';
import { ObjectId } from 'mongoose';
import { AllLessons, LessonInquiry, LessonsInput, OrdinaryInquiry } from '../../libs/dto/lessons/lessons.input';
import { LessonsService } from './lessons.service';
import { Lesson, Lessons } from '../../libs/dto/lessons/lesson';
import { WithoutGuard } from '../auth/guards/without.guard';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { LessonsUpdate } from '../../libs/dto/lessons/lessons-update';
import { FileInterceptor } from '@nestjs/platform-express';
import { getVideoUploader } from '../../libs/utils/video.uploader';
import { getMulterUploader } from '../../libs/utils/uploader';


@Controller('lessons')
export class LessonsController {
    constructor(private readonly lessonService: LessonsService) {}

    
    @UseGuards(AuthGuard)
	@Post('create')
	@UseInterceptors(FileInterceptor('lessonVideo', getMulterUploader('lesson')))
	public async createLesson( 
		@Body() body: LessonsInput,
		@AuthMember('_id') memberId: ObjectId,
		@UploadedFile() file: Express.Multer.File,
	): Promise<Lesson> {

		const {lessonTitle, lessonDesc, lessonCategory, lessonLevel} = body;
		const uploadPath = `./uploads/lesson/`; // Path ni dinamik tarzda kiritish
		if (file) {
			body.lessonVideo = `${uploadPath}/${file.filename}`;
		  }

		  const parsedInput = {
			lessonTitle,
			lessonDesc,
			lessonCategory,
			lessonLevel,
			lessonVideo: body.lessonVideo,
		  };
		console.log('POST: createlessons', body);
		return this.lessonService.createLessons(memberId, parsedInput);
	}

	

    @UseGuards(WithoutGuard)
    @Get('getLesson')
	public async getLesson(
		@Query() input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Lesson> {
		console.log('GET: getLesson');
		const lessonId = shapeIntoMongoObjectId(input);
		return await this.lessonService.getLesson(memberId, lessonId);
	}

	@UseGuards(AuthGuard)
    @Post("updateLesson")
	public async updateLesson(
		@Body('input') input: LessonsUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Lesson> {
        console.log('memberId', memberId)
		console.log('POST: updateLesson');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.lessonService.updateLesson(memberId, input);
	}

	@UseGuards(WithoutGuard)
	@Get('getLessons')
	public async getLessons(
		@Query() input: LessonInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Lessons> {
		console.log('GET: getLessons');
		return await this.lessonService.getLessons(memberId, input);
	}

	@UseGuards(WithoutGuard)
    @Get('getAllLessons')
    public async getAllLessons(
    ): Promise<Lesson[]> {
		console.log('GET: getAllLessons');
		return await this.lessonService.getAllLessons();
	}

	@UseGuards(AuthGuard)
	@Post('likeTargetLesson')
	public async likeTargetLessons(
		@Body('lessonId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Lesson> {
		console.log('POST: likeTargetLessons');
		const likeRefId = shapeIntoMongoObjectId(input);
		return await this.lessonService.likeTargetLessons(memberId, likeRefId);
	}

	@UseGuards(AuthGuard)
	@Get('getFavoriteLessons')
	public async getFavoriteLessons(
		@Query() input: OrdinaryInquiry,
        @AuthMember('_id') memberId: ObjectId,
    ): Promise<Lessons> {
		console.log('GET: getFavoriteLessons');
		return await this.lessonService.getFavoriteLessons(memberId, input);
	}
}
