import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Member } from '../../libs/dto/member/member';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {
    // Google OAuth orqali yo'naltirish
    console.log('Redirecting to Google OAuth...');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req): Promise<Member> {
    console.log('req',req)
    console.log('user',req.user)
    return await this.authService.googleLogin(req.user);
  }
}
