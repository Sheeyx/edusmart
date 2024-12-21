import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { MemberAuthType, MemberType } from '../../enums/member.enum';
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
}

export class LoginInput {
	@IsNotEmpty()
	@Length(3, 12)
	memberNick: string;

	@IsNotEmpty()
	@Length(5, 12)
	memberPassword: string;
}
