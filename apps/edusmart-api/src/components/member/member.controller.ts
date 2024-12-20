import { Controller, Post, Body, BadRequestException, Get, UsePipes, ValidationPipe, InternalServerErrorException } from '@nestjs/common';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('signup')
   public async signup(@Body() input: MemberInput): Promise<Member> {
    try {
        console.log('Signup called');
        console.log('Input:', input);
        return this.memberService.signup(input);
    } catch (err) {
        console.log("Error occured, sign up", err);
        throw new InternalServerErrorException();
    }
  }

  @Post('login')
  public async login(@Body() input: LoginInput): Promise<Member> {
    console.log("Signup");
    console.log('Input:', input);
    return this.memberService.login(input);
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
