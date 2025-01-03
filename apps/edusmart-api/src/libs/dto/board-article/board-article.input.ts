import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
import { BoardArticleCategory, BoardArticleStatus } from '../../enums/board-article.enum';
import { Direction } from '../../enums/common.enum';
import { availableBoardArticleSorts } from '../../config';
import { Type } from 'class-transformer';

export class BoardArticleInput {
	@IsNotEmpty()
	articleCategory: BoardArticleCategory;

	@IsNotEmpty()
	@Length(3, 50)
	articleTitle: string;

	@IsNotEmpty()
	@Length(3, 250)
	articleContent: string;

	@IsOptional()
	articleImage?: string;

	memberId?: ObjectId;
}

class BAISearch {
	@IsOptional()
	articleCategory?: BoardArticleCategory;

	@IsOptional()
	text?: string;

	@IsOptional()
	memberId?: ObjectId;
}

export class BoardArticlesInquiry {
	@IsNotEmpty()
	@Type(() => Number)	
	@Min(1)
	page: number;

	@IsNotEmpty()
	@Type(() => Number)	
	@Min(1)
	
	limit: number;

	@IsOptional()
	@IsIn(availableBoardArticleSorts)
	sort?: string;

	@IsOptional()
	direction?: Direction;

	@IsOptional()
	search: BAISearch;
}

class ABAISearch {
	@IsOptional()
	articleStatus?: BoardArticleStatus;

	@IsOptional()
	articleCategory?: BoardArticleCategory;
}


export class AllBoardArticlesInquiry {
	@IsNotEmpty()
	@Type(() => Number)	
	@Min(1)
	page: number;

	@IsNotEmpty()
	@Type(() => Number)	
	@Min(1)
	limit: number;

	@IsOptional()
	@IsIn(availableBoardArticleSorts)
	sort?: string;

	@IsOptional()
	direction?: Direction;

	@IsOptional()
	search: ABAISearch;
}
