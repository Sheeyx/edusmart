import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Lessons } from '../../libs/dto/lessons/lesson';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MemberService } from '../member/member.service';
import { LessonsInput } from '../../libs/dto/lessons/lessons.input';
import { Message } from '../../libs/enums/common.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { LessonStatus } from '../../libs/enums/lesson.enum';
import { ViewService } from '../view/view.service';
import { ViewGroup } from '../../libs/enums/view.enum';
import { LikeGroup } from '../../libs/enums/like.enum';
import { LikeService } from '../like/like.service';
import { LessonsUpdate } from '../../libs/dto/lessons/lessons-update';
import { LikeInput } from '../../libs/dto/like/like.input';

@Injectable()
export class LessonsService {
    constructor(
		@InjectModel('Lessons') private readonly lessonsModel: Model<Lessons>,
        private memberService: MemberService,
		private viewService: ViewService,
		private likeService: LikeService,
	) {
    }


    public async createLessons(memberId: ObjectId, input: LessonsInput): Promise<Lessons> {
		input.memberId = memberId;
		try {
			const result = await this.lessonsModel.create(input);
			return result;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

    public async getLessons(memberId: ObjectId, lessonId: ObjectId): Promise<Lessons> {
		const search: T = {
			_id: lessonId,
			lessonStatus: LessonStatus.ACTIVE,
		};
	
		const targetLesson = await this.lessonsModel.findOne(search).lean().exec() as Lessons;
		console.log("targetLesson", targetLesson);
	
		if (!targetLesson) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
	
		if (memberId) {
			// Record view for the lesson
			const viewInput = { memberId: memberId, viewRefId: lessonId, viewGroup: ViewGroup.LESSON };
			const newView = await this.viewService.recordView(viewInput);
			if (newView) {
				await this.lessonsStatsEditor({ _id: lessonId, targetKey: 'lessonViews', modifier: 1 });
				targetLesson.lessonViews++;
			}
	
			// Check if the member has liked the lesson
			const likeInput = { memberId: memberId, likeRefId: lessonId, likeGroup: LikeGroup.LESSON };
			targetLesson.meLiked = await this.likeService.checkLikeExistence(likeInput);
		}
	
		// Get member data associated with the lesson
		targetLesson.memberData = await this.memberService.getMember(null, targetLesson.memberId);
	
		return targetLesson;
	}
	
	public async updateLesson(memberId: ObjectId, input: LessonsUpdate): Promise<Lessons> {
		const { _id, lessonStatus } = input;
	
		const result = await this.lessonsModel
			.findOneAndUpdate(
				{ _id: _id, memberId: memberId, lessonStatus: LessonStatus.ACTIVE },
				input,
				{ new: true }
			)
			.exec();
	
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
	
		if (lessonStatus === LessonStatus.DELETE) {
			await this.memberService.memberStatsEditor({
				_id: memberId,
				targetKey: 'memberLessons',
				modifier: -1,
			});
		}
	
		return result;
	}

	public async likeTargetLessons(memberId: ObjectId, likeRefId: ObjectId): Promise<Lessons> {
		const target: Lessons = await this.lessonsModel.findOne({ _id: likeRefId, lessonStatus: LessonStatus.ACTIVE }).exec();
		if (!target) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		const input: LikeInput = {
			memberId: memberId,
			likeRefId: likeRefId,
			likeGroup: LikeGroup.LESSON,
		};
		const modifier: number = await this.likeService.toggleLike(input);
		const result = await this.lessonsStatsEditor({ _id: likeRefId, targetKey: 'lessonLikes', modifier: modifier });
		if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
		return result;
	}

	public async lessonsStatsEditor(input: StatisticModifier): Promise<Lessons> {
		const { _id, targetKey, modifier } = input;
		return await this.lessonsModel
			.findByIdAndUpdate(_id, { $inc: { [targetKey]: modifier } }, { new: true })
			.exec();
	}
	

}
