import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class WithoutGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.info('--- @guard() Authentication [WithoutGuard] ---');

    // HTTP so'rovni olish
    const request = context.switchToHttp().getRequest();

    // Authorization headerni tekshirish
    const bearerToken = request.headers.authorization;

    if (bearerToken) {
      try {
        // Tokenni "Bearer"dan ajratish
        const token = bearerToken.split(' ')[1];

        // Tokenni tekshirish va foydalanuvchini olish
        const authMember = await this.authService.verifyToken(token);

        // Foydalanuvchi ma'lumotlarini `request.body`ga qo'shish
        request.body.authMember = authMember;
      } catch (err) {
        // Token xato bo'lsa, foydalanuvchini `null` qilib qo'yish
        request.body.authMember = null;
      }
    } else {
      // Token bo'lmasa, foydalanuvchini `null` qilib qo'yish
      request.body.authMember = null;
    }

    console.log('memberNick[without] =>', request.body.authMember?.memberNick ?? 'none');
    return true; // Har doim kirishga ruxsat beradi
  }
}
