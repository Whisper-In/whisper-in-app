export enum PostType {
    VIDEO, PHOTO
}

export interface CreatorProfileDto {
    _id: string;
    userName: string;
    avatar?: string;
    isFollowing: boolean;
}

export interface PostDto {
    _id: string;
    postURL: string;
    thumbnailURL?: string;
    postType: string;
    description: string;
    creator: CreatorProfileDto;
    creatorModel: string;
    likeCount: number;
    isLiked?: boolean;
}
