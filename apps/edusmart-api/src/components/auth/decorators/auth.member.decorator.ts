// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const AuthMember = createParamDecorator((data: string, context: ExecutionContext | any) => {
// 	let request: any;
// 	if (context.contextType === 'graphql') {
// 		request = context.getArgByIndex(2).req;
// 		if (request.body.authMember) {
// 			request.body.authMember.authorization = request.headers?.authorization;
// 		}
// 	} else request = context.switchToHttp().getRequest();

// 	const member = request.body.authMember;

// 	if (member) return data ? member?.[data] : member;
// 	else return null;
// });

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthMember = createParamDecorator((data: string, context: ExecutionContext) => {
    // HTTP so'rovni olish
    const request = context.switchToHttp().getRequest();
    // Authorization headerni olish
    const authorization = request.headers?.authorization;
    // `authMember` obyektini olish
    const member = request.body?.authMember;

    // Agar `authMember` mavjud bo'lsa, unga `authorization`ni qo'shing
    if (member && authorization) {
        member.authorization = authorization; // Headerni authMember'ga qo'shish
    }

    // So'ralgan ma'lumotni qaytarish yoki to'liq `authMember`ni qaytarish
    if (member) {
        return data ? member[data] : member;
    }

    // Agar `authMember` bo'lmasa, null qaytaradi
    return null;
});
