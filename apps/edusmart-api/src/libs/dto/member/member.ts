import { ObjectId } from "mongoose";
import { MemberAuthType, MemberStatus, MemberType } from "../../enums/member.enum";

export class Member {
    _id: ObjectId;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberAuthType: MemberAuthType;
    memberPhone: string;
    memberNick: string;
    memberPassword?: string;
    memberFullName?: string;
    memberImage: string;
    memberAddress?: string;
    memberDesc?: string;
    memberExperience?: string;
    memberLocation?: string;
    memberLinks?: string;
    memberLessons?: string;
    memberArticles?: string;
    deletedAt: Date;
    createdAt: Date;
    accessToken?: string;
    
}

export class TotalCounter {
	total:number
}

export class Members {
	list: Member[];
	metaCounter:TotalCounter[]
}