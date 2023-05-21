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
  if (!payload.length) return state;

  state.records = payload.map<Chat>((item) => {
    const stateChatMessages =
      state.records.find((chat) => chat.chatId == item.chatId)?.messages ?? [];

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
};

export const addNewChatMessageReducer = (
  state: ChatsState,
  action: AddNewChatMessageAction
) => {  
  const payload = action.payload as ChatMessageActionPayload;

  if (!payload.message?.length) return state;

  let chat = state.records.find((c) => c.chatId == payload.chatId);

  if(chat) {
    chat.messages.push(payload);
  }

  return state;
};
