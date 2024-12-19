import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MemberService {
    constructor(
    ) {}
    
    public async signup() : Promise<string> {
        return "signup executed";
    }

    public async login() : Promise<string> {
        return "signup executed";
    }

    public async updateMember() : Promise<string> {
        return "signup executed";
    }

    public async getMember() : Promise<string> {
        return "signup executed";
    }

    }
