import { Controller, Post, Body, Get, UseGuards, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
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
import { getMulterUploader } from '../../libs/utils/uploader';
import { FileInterceptor } from '@nestjs/platform-express';


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
		return  await this.memberService.login(input);
	}

	@UseGuards(AuthGuard)
	@Post('updateMember')
	@UseInterceptors(FileInterceptor('memberImage', getMulterUploader('member')))
	public async updateMember( @AuthMember('_id') memberId: ObjectId,
	  @Body() input: MemberUpdate,
	  @UploadedFile() file: Express.Multer.File,
	 
	): Promise<Member> {
		if(memberId !=input._id) {
			throw new Error ('Member ID is not true');
		}
		delete input._id
		if (!memberId) {
			throw new Error('Member ID is required!');
		  }
	  const uploadPath = `./uploads/member/`; // Path ni dinamik tarzda kiritish
	  if (file) {
		input.memberImage = `${uploadPath}/${file.filename}`;
	  }
//   console.log(`req:${input}`)
	  return await this.memberService.updateMember(memberId, input);
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
	public async getMember(@Query() input: string, @AuthMember('_id') memberId: ObjectId): Promise<Member> {
		console.log('GET: getMember');
		const targetId = shapeIntoMongoObjectId(input);
		return await this.memberService.getMember(memberId, targetId);
	}
	@UseGuards(WithoutGuard)
	@Get('getTeachers')
	public async getAgents(@Body('input') input: AgentsInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Members> {
		console.log('GET: getTeachers');
		return await this.memberService.getAgents(memberId, input);
	}

	/**ADMIN **/
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Get('getAllMembersAdmin')
	public async getAllMembersByAdmin(@Body('input') input: MembersInquiry): Promise<Members> {
		console.log('POST: getAllMembersByAdmin');
		return await this.memberService.getAllMembersByAdmin(input);
	}
	//Authorization : ADMIN
	@Roles(MemberType.ADMIN)
	@Post('updateMembersAdmin')
  public async updateMemberByAdmin(@Body('input') input: MemberUpdate): Promise<Member> {
		console.log('POST: updateMemberByAdmin');
		return await this.memberService.updateMemberByAdmin(input);
	}
}
