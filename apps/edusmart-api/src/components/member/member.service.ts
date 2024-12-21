import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from '../../libs/dto/member/member';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { MemberStatus } from '../../libs/enums/member.enum';
import { Message } from '../../libs/enums/common.enum';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MemberService {
	constructor(
		@InjectModel('Member') private readonly memberModel: Model<Member>,
		private readonly authService: AuthService,
	) {}
	public async signup(input: MemberInput): Promise<Member> {
		// TODO: Hash password
		input.memberPassword = await this.authService.hashPassword(input.memberPassword);
		try {
			const result = await this.memberModel.create(input);
			const memberWithToken = result.toObject();
			// `accessToken`ni yaratish
			memberWithToken.accessToken = await this.authService.createToken(memberWithToken);
			// Parolni tozalash
			memberWithToken.memberPassword = '';

			// Javob qaytarish
			return memberWithToken;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.USED_MEMBER_NICK_OR_PHONE);
		}
	}
	public async login(input: LoginInput): Promise<any> {
        const { memberNick, memberPassword } = input;
        const response = await this.memberModel
            .findOne({ memberNick: memberNick })
            .select('+memberPassword')
            .exec();
    
        if (!response || response.memberStatus === MemberStatus.DELETE) {
            throw new InternalServerErrorException(Message.NO_MEMBER_NICK);
        } else if (response.memberStatus === MemberStatus.BLOCK) {
            throw new InternalServerErrorException(Message.BLOCKED_USER);
        }
    
        // Parolni solishtirish
        const isMatch = await this.authService.comparePasswords(input.memberPassword, response.memberPassword);
        if (!isMatch) throw new InternalServerErrorException(Message.WRONG_PASSWORD);
    
        // accessToken yaratish
        const result = response.toObject();
        result.accessToken = await this.authService.createToken(result);
    
        // Parolni javobdan o'chirish
        delete result.memberPassword;
    
        return result; // Faqat kerakli ma'lumot qaytariladi
    }
    

	public async updateMember(): Promise<string> {
		return 'signup executed';
	}

	public async getMember(): Promise<string> {
		return 'signup executed';
	}

    public async getAllMembersByAdmin(): Promise<string> {
		return 'getAllMembersByAdmin executed!';
	}
	public async updateMemberByAdmin(): Promise<string> {
		return 'updateMemberByAdmin executed!';
	}
}
