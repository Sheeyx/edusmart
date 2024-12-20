import { Controller, Post, Body, BadRequestException, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  public async signup(@Body() input: MemberInput): Promise<string> {
    console.log('Signup called');
    console.log('Input:', input);
    return this.memberService.signup();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  public async login(@Body() input: LoginInput): Promise<string> {
    console.log("Signup");
    console.log('Input:', input);
    return this.memberService.login();
  }

  @Post('update')
  public async updateMember(): Promise<string> {
    console.log("updateMember");
    return this.memberService.updateMember();
  }

  @Get('getMember')
  public async getMember(): Promise<string> {
    console.log("getMember");
    return this.memberService.getMember();  
  }
}
