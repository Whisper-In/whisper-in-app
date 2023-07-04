import {
  AddNewChatMessageAction,
  ChatMessageActionPayload,
  LoadChatsAction,
  LoadChatsActionPayload,
} from "../slices/chats/types";
import { Chat, ChatProfile, ChatsState } from "../states/chatsState";

export const loadChatsReducer = (
  state: ChatsState,
  action: LoadChatsAction
) => {
  const payload = action.payload as LoadChatsActionPayload[];  
    
  state.chats = payload.map<Chat>((item) => {
    const stateChatMessages =
      state.chats?.find((chat) => chat.chatId == item.chatId)?.messages ?? [];

    return {
      chatId: item.chatId,
      profiles: item.profiles.map<ChatProfile>((profile) => ({
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        isAI: profile.isAI,
      })),
      messages: [...stateChatMessages],
    };
  });   

  return state;
};

export const addNewChatMessageReducer = (
  state: ChatsState,
  action: AddNewChatMessageAction
) => {  
  const payload = action.payload as ChatMessageActionPayload;

  if (!payload.message?.length) return state;

  let chat = state.chats.find((c) => c.chatId == payload.chatId);

  if(chat) {
    chat.messages.unshift(payload);
  }

  return state;
};