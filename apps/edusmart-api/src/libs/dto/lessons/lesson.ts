import { ObjectId } from "mongoose";
import { LessonCategory, LessonStatus } from "../../enums/lesson.enum";
import { MeLiked } from "../like/like";
import { Member } from "../member/member";

export class Lessons {
	_id: ObjectId;
	lessonCategory: LessonCategory;
	lessonStatus: LessonStatus;
	lessonTittle: string;
	lessonDesc: string;
	lessonViews: number;
	lessonLikes: number;
	lessonComments: number;
	memberId: ObjectId;
	createdAt: Date;
	updatedAt: Date;

	/** from aggregation **/
	
	meLiked?: MeLiked[];
	memberData?: Member;
}