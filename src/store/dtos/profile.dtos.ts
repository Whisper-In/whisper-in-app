export interface IUserProfileDto {
  _id: string;
  name: string;
  email: string;
  aboutMe?:string;
  avatar?: string;
}

export interface IPriceTierDto {
  price: number,
  tier: number,
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
  aboutMe?:string;
  email?: string;
  userName: string;
  avatar?: string;
  priceTiers: IPriceTierDto[];
  isSubscribed?: boolean;
  isSubscriptionExpired?: boolean;
}