import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { AgentsInquiry, LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/auth.member.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

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
		console.log(' POST: memberLogin');
		return this.memberService.login(input);
	}
	@UseGuards(AuthGuard)
	@Post('updateMember')
	public async updateMember(@Body() input: MemberUpdate, @AuthMember('_id') memberId: ObjectId): Promise<Member> {
		console.log('POST: updateMember');
		delete input._id;

		return this.memberService.updateMember(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Get('checkAuth')
	public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
		console.log('GET: checkAuth');
		console.log('memberNick', memberNick);

		return `Hi ${memberNick}`;
	}
	@Roles(MemberType.STUDENT, MemberType.TEACHER)
	@UseGuards(RolesGuard)
	@Get('checkAuthRoles')
	public async checkAuthRoles(@AuthMember() authMember: Member): Promise<string> {
		console.log('GET: checkAuthRoles');
		return `Hi ${authMember.memberNick} you are ${authMember.memberType} (memberId) ${authMember._id}`;
	}
	@UseGuards(WithoutGuard)
	@Get('getMember')
	public async getMember(@Body() input: string): Promise<Member> {
		console.log('GET: getMember');
		const targetId = shapeIntoMongoObjectId(input);
		return this.memberService.getMember(targetId);
	}
	@UseGuards(WithoutGuard)
	@Get('getTeachers')
	public async getAgents(@Body('input') input: AgentsInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Members> {
		console.log('GET: getTeachers');
		return this.memberService.getAgents(memberId, input);
	}

	/**ADMIN **/
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Post('getAllMembersAdmin')
	public async getAllMembersByAdmin(): Promise<string> {
		console.log('POST: getAllMembersByAdmin');
		return this.memberService.getAllMembersByAdmin();
	}
	//Authorization : ADMIN
	@Roles(MemberType.ADMIN)
	@Post('getAllMembersAdmin')
	public async updateMemberByAdmin(): Promise<string> {
		console.log('POST: updateMemberByAdmin');
		return this.memberService.updateMemberByAdmin();
	}
}
