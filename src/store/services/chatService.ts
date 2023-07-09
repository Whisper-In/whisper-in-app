import axios from "axios";
import { REACT_APP_WHISPER_SERVICE_BASEURL } from "@env";
import { IUserChatDto, IUserChatMessagesDto } from "../dtos/chat.dtos";
import axiosInstance from "../axiosInstance";
import { ChatFeature } from "../states/chatsState";

const route = "chats";

export const getUserChats = async (userId: string) => {
  try {
    const result = await axiosInstance.get<IUserChatDto[]>(
      `${route}/user-chats/${userId}`
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const createNewChat = async (userId: string, aiProfileId: string) => {
  try {
    const result = await axiosInstance.post(`${route}/user-chats/new-chat`, { userId, aiProfileId });

    return result.data.chatId;
  } catch (error) {
    throw error;
  }
}

export const getChat = async (chatId: string) => {
  try {
    const result = await axiosInstance.get<IUserChatDto>(`${route}/${chatId}`);
    
    return {
      chatId: result.data.chatId,
      profiles: result.data.profiles,
      features: result.data.features
    };
  } catch (error) {
    throw error;
  }
}