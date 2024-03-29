export type ChatMessage = {
  senderId: string;
  message: string;
  audioUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ChatProfile = {
  id: string;
  name: string;
  avatar?: string;
  isAI: boolean;
  isBlocked?:boolean;
};

export enum ChatFeature {
  AUDIO
}

export type Chat = {
  chatId: string;
  isAudioRepliesOff?: boolean;  
  features?: number[];
  profiles: ChatProfile[];
  messages: ChatMessage[];
};

export type ChatsState = {
  chats: Chat[];
};

export const initialChatHistoryState: ChatsState = {
  chats: [],
};
