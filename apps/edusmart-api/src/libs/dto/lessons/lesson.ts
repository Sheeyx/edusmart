import { ObjectId } from "mongoose";
import { LessonCategory, LessonStatus } from "../../enums/lesson.enum";
import { MeLiked } from "../like/like";
import { Member } from "../member/member";

export class Lessons {
	_id: ObjectId;
	lessonCategory: LessonCategory;
	lessonStatus: LessonStatus;
	lessonTitle: string;
	lessonDesc: string;
	lessonViews: number;
	lessonLikes: number;
	lessonComments: number;
	memberId: ObjectId;
	createdAt: Date;
	updatedAt: Date;
	lessonVideo: string;

	/** from aggregation **/
	
	meLiked?: MeLiked[];
	memberData?: Member;
}