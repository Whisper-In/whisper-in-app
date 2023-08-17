export enum ProfileModels {
  AIProfile, UserProfile
}

export interface IUserProfileDto {
  _id: string;
  name?: string;
  userName?: string;
  aboutMe?: string;
  birthday?: Date;
  gender?: string;
  avatar?: string;
  email?: string;
  googleId?: string;
  appleId?: string;
  stripeId?: string;
  isAgreeTnC?: boolean;
}

export interface IPriceTierDto {
  price: number,
  tier: number,
  features: string[]
}

export interface IProfileSearchDto {
  id: string;
  name: string;
  userName: string;
  avatar: string;
  priceTiers?: IPriceTierDto[];
}

export interface IProfileDto {
  id: string;
  name: string;
  aboutMe?: string;
  email?: string;
  userName: string;
  avatar?: string;
  priceTiers: IPriceTierDto[];
  isSubscribed?: boolean;
  isSubscriptionExpired?: boolean;
  isBlocked?: boolean;
}