import { Controller, Post, Body, Get } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';

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

  @Post('update')
  public async updateMember(): Promise<string> {
    console.log("POST: updateMember");
    return this.memberService.updateMember();
  }

  @Get('getMember')
  public async getMember(): Promise<string> {
    console.log("GET: getMember");
    return this.memberService.getMember();  
  }
}
