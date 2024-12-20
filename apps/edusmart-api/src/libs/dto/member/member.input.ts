import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { MemberAuthType, MemberType } from '../../enums/member.enum';

export class MemberInput {
  @IsNotEmpty()
  @Length(3, 12)
  memberNick: string;

  @IsNotEmpty()
  @Length(5, 12)
  memberPassword: string;

  @IsNotEmpty()
  memberPhone: string

  @IsOptional()
  memberType?: MemberType

  @IsOptional()
  memberAuthType?: MemberAuthType

}

export class LoginInput {
    @IsNotEmpty()
    @Length(3, 12)
    memberNick: string;
  
    @IsNotEmpty()
    @Length(5, 12)
    memberPassword: string;
   
  }
