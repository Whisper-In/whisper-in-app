export type ChatMessage = {
  senderId: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ChatProfile = {
  id: string;
  name: string;
  avatar?: string;
  isAI: boolean;
};

export type Chat = {
  chatId: string;
  profiles: ChatProfile[];
  messages: ChatMessage[];
};

export type ChatsState = {
  records: Chat[];
};

export const initialChatHistoryState: ChatsState = {
  records: [],
};
