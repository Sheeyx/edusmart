import { ObjectId } from 'bson';
export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberExperience'];
export const availableMemberSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberExperience'];
export const availableBoardArticleSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberExperience'];
export const availableCommentSorts = ['createdAt', 'updatedAt'];

export const shapeIntoMongoObjectId = (target: any) => {
	return typeof target === 'string' ? new ObjectId(target) : target;
};
