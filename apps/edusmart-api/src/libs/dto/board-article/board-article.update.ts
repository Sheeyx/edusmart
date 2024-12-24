
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { BoardArticleStatus } from '../../enums/board-article.enum';
import { ObjectId } from 'mongoose';


export class BoardArticleUpdate {
	@IsNotEmpty()
	_id: ObjectId;

	@IsOptional()
	articleStatus?: BoardArticleStatus;

	@IsOptional()
	@Length(3, 50)
	articleTitle?: string;

	@IsOptional()
	@Length(3, 250)
	articleContent?: string;

	@IsOptional()
	articleImage?: string;
}
