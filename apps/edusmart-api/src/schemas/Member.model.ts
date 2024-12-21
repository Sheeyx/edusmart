import { Schema } from "mongoose";
import { MemberAuthType, MemberStatus, MemberType } from "../libs/enums/member.enum";


const MemberSchema = new Schema({
    memberType: {
        type: String,
        enum: MemberType,
        default: MemberType.STUDENT,
    },

    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE,
    },

    memberAuthType: {
        type: String,
        enum: MemberAuthType,
        default: MemberAuthType.TELEGRAM,
    },

    memberPhone: {
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

    memberNick: {
        type: String,
        index: {unique: true, sparse: true},
        required: true,
    },

    memberPassword: {
        type: String,
        select: false,
        required: true,
    },

    memberFullName: {
        type: String,
    },

    memberImage: {
        type: String,
        default: '',
    },

    memberAddress: {
        type: String,
    },

    memberDesc: {
        type: String,
    },

    memberExperience: {
        type: String,
    },

    memberLocation: {
        type: String,
    },

    memberLinks: {
        type: String,
    },

    memberLessons: {
        type: String,
    },

    memberArticles: {
        type: String,
    },

    deletedAt: {
        type: Date,
    },
},
{timestamps: true, collection: "members"},
);

export default MemberSchema;