import { IsEnum, IsNotEmpty, IsOptional, Length } from "class-validator";
import { ObjectId } from "mongoose";
import { LessonStatus } from "../../enums/lesson.enum";

export class LessonsUpdate {
	@IsNotEmpty()
	_id: ObjectId;

	@IsOptional()
	@IsEnum(LessonStatus)
	lessonStatus?: LessonStatus;

	@IsOptional()
	@Length(3, 50)
	lessonTitle?: string;

	@IsOptional()
	@Length(3, 250)
	lessonDesc?: string;
}
