import {
  AddNewChatMessageAction,
  ChatMessageActionPayload,
  LoadChatsAction,
  LoadChatsActionPayload,
} from "../slices/chats/types";
import { Chat, ChatFeature, ChatProfile, ChatsState } from "../states/chatsState";

export const loadChatsReducer = (
  state: ChatsState,
  action: LoadChatsAction
) => {
  const payload = action.payload as LoadChatsActionPayload[];

  state.chats = payload.map<Chat>((item) => {
    const stateChat = state.chats?.find((chat) => chat.chatId == item.chatId);
    const stateChatMessages = stateChat?.messages ?? [];

    return {
      chatId: item.chatId,
      isAudioRepliesOff: stateChat?.isAudioRepliesOff,
      profiles: item.profiles.map<ChatProfile>((profile) => ({
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        isAI: profile.isAI,
        isBlocked: profile.isBlocked
      })),
      messages: [...stateChatMessages],
    };
  });

  return state;
};

export const updateChatFeaturesReducer = (state: ChatsState,
  action: { payload: { chatId: string, features: ChatFeature[] } }) => {
  const { payload } = action;

  const chat = state.chats.find((chat) => chat.chatId == payload.chatId);

  if (chat) {    
    chat.features = payload.features;
  }

  return state;
}

export const addNewChatMessageReducer = (
  state: ChatsState,
  action: AddNewChatMessageAction
) => {
  const payload = action.payload as ChatMessageActionPayload;

  if (!payload.message?.length) return state;

  let chat = state.chats.find((chat) => chat.chatId == payload.chatId);

  if (chat) {
    chat.messages.unshift(payload);
  }

  return state;
};

export const toggleChatAudioRepliesReducer = (
  state: ChatsState,
  action: { payload: { chatId: string, isAudioRepliesOff: boolean } }
) => {
  const chat = state.chats.find((chat) => chat.chatId == action.payload.chatId);

  if (chat) {
    chat.isAudioRepliesOff = action.payload.isAudioRepliesOff;
  }

  return state;
}