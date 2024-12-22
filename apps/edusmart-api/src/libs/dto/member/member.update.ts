import {
	IsOptional,
	IsString,
	IsNotEmpty,
	Length,
	Matches,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { MemberCategory } from '../../enums/member.enum';

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class MemberUpdate {
	@IsNotEmpty()
	_id: ObjectId;

	@IsOptional()
	memberPhone?: string;

	@IsOptional()
	@IsString()
	@Length(3, 12, { message: 'Nickname must be between 3 and 12 characters' })
	memberNick?: string;

	@IsOptional()
	@Matches(passwordRegEx, {
		message:
			'Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
	})
	memberPassword?: string;

	@IsOptional()
	@IsString()
	memberFullName?: string;

    @IsOptional()
	@IsString()
	memberCategory?: MemberCategory;

	@IsOptional()
	@IsString()
	memberImage?: string;

	@IsOptional()
	@IsString()
	memberAddress?: string;

	@IsOptional()
	@IsString()
	memberDesc?: string;

	@IsOptional()
	@IsString()
	memberExperience?: string;

	@IsOptional()
	@IsString()
	memberLocation?: string;

	@IsOptional()
	@IsString()
	memberLinks?: string;

	@IsOptional()
	@IsString()
	memberLessons?: string;

	@IsOptional()
	@IsString()
	memberArticles?: string;

	deletedAt?: Date;
}
