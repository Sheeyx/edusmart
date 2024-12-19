import { Controller, Post, Body, BadRequestException, Get } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
  public async signup(): Promise<string> {
    console.log("Signup");
    return this.memberService.signup();
  }

  @Post('login')
  public async login(): Promise<string> {
    console.log("Signup");
    return this.memberService.login();
  }

  @Post('update')
  public async updateMember(): Promise<string> {
    console.log("updateMember");
    return this.memberService.updateMember();
  }

  @Get('update')
  public async getMember(): Promise<string> {
    console.log("getMember");
    return this.memberService.getMember();
  }
}
