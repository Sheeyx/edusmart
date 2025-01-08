import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { LessonCategory } from "../../enums/lesson.enum";
import { ObjectId } from "mongoose";

export class LessonsInput {
	@IsNotEmpty()
	lessonCategory: LessonCategory;

	@IsNotEmpty()
	@Length(3, 50)
    lessonTittle: string;

	memberId?: ObjectId;
}