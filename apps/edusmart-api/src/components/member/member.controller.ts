import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/auth.member.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
   public async signup(@Body() input: MemberInput): Promise<Member> {
   console.log('POST: memberSignup:');
   return await this.memberService.signup(input);
  }

  @Post('login')
  public async login(@Body() input: LoginInput): Promise<Member> {
    console.log(" POST: memberLogin");
    return this.memberService.login(input);
  }
	@UseGuards(AuthGuard)
  @Post('update')
  public async updateMember(): Promise<string> {
    console.log("POST: updateMember");
    return this.memberService.updateMember();
  }

	@UseGuards(AuthGuard)
  @Get('checkAuth')
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('Query: checkAuth');
		console.log('memberNick', memberNick);

		return `Hi ${memberNick}`;
	}
  @Roles(MemberType.STUDENT, MemberType.TEACHER)
	@UseGuards(RolesGuard)
	@Get('checkAuthRoles')
	public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {
		console.log('Query: checkAuthRoles');
		return `Hi ${authMember.memberNick} you are ${authMember.memberType} (memberId) ${authMember._id}`;
	}

  @Get('getMember')
  public async getMember(): Promise<string> {
    console.log("GET: getMember");
    return this.memberService.getMember();  
  }

  /**ADMIN **/
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Post('getAllMembersAdmin')
	public async getAllMembersByAdmin(): Promise<string> {
		console.log('Mutation: getAllMembersByAdmin');
		return this.memberService.getAllMembersByAdmin();
	}
	//Authorization : ADMIN
	@Roles(MemberType.ADMIN)
	@Post('getAllMembersAdmin')
	public async updateMemberByAdmin(): Promise<string> {
		console.log('Mutation: updateMemberByAdmin');
		return this.memberService.updateMemberByAdmin();
	}
}
