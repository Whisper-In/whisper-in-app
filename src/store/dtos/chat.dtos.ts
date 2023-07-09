export interface IUserChatProfileDto {
  _id: string;
  name: string;
  isAI:boolean;
  avatar?: string;
}

export interface IUserChatDto {
  chatId: string;
  features: string[],
  profiles: IUserChatProfileDto[]  
}

export interface IUserChatMessagesDto {
  message: string;
  sender: string;
  createdAt?: Date;
  updatedAt?: Date;
}
