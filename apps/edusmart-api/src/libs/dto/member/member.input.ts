import { IsIn, IsNotEmpty, IsOptional, Length, Matches, Min } from 'class-validator';
import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import { availableAgentSorts, availableMemberSorts } from '../../config';
import { Direction } from '../../enums/common.enum';
const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class MemberInput {
	@IsNotEmpty()
  @Length(3, 12)
	memberNick: string;

	@IsNotEmpty()
	@Matches(passwordRegEx, {
		message: `Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.`,
	})
	memberPassword: string;

	@IsNotEmpty()
	memberPhone: string;

	@IsOptional()
	memberType?: MemberType;

	@IsOptional()
	memberAuthType?: MemberAuthType;

  @IsOptional()
  memberFullName?: string;

  @IsOptional()
  memberImage?: string;

  @IsOptional()
  memberAddress?: string;

  @IsOptional()
  memberDesc?: string;

  @IsOptional()
  memberExperience?: string;

  @IsOptional()
  memberLocation?: string;

  @IsOptional()
  memberLinks?: string;

}

export class LoginInput {
	@IsNotEmpty()
	@Length(3, 12)
	memberNick: string;

	@IsNotEmpty()
	@Length(5, 12)
	memberPassword: string;
}


class AISearch {
	@IsOptional()
	text?: string
}
export class AgentsInquiry {
	@IsNotEmpty()
	@Min(1)
	page: number;

	@IsNotEmpty()
	@Min(1)
	limit: number;

	@IsOptional()
	@IsIn([availableAgentSorts])
	sort?: string;

	@IsOptional()
	direction?: Direction

	@IsNotEmpty()
	search: AISearch


	
}


class MISearch {
	@IsOptional()
	memberStatus?: MemberStatus;

	@IsOptional()
	memberType?: MemberType;

	@IsOptional()
	text?: string;
}
export class MembersInquiry {
	@IsNotEmpty()
	@Min(1)
	page: number;

	@IsNotEmpty()
	@Min(1)
	limit: number;

	@IsOptional()
	@IsIn([availableMemberSorts])
	sort?: string;

	@IsOptional()
	direction?: Direction;

	@IsNotEmpty()
	search: MISearch;
}