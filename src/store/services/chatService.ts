import axios from "axios";
import { REACT_APP_WHISPER_SERVICE_BASEURL } from "@env";
import { IUserChatDto, IUserChatMessagesDto } from "../dtos/chat.dtos";
import axiosInstance from "./axiosInstance";

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

export const getChatMessages = async (chatId: string) => {
  try {
    const result = await axiosInstance.get<IUserChatMessagesDto[]>(
      `${route}/chat-messages/${chatId}`
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const insertNewChatMessage = async (data: {
  chatId: string;
  senderId: string;
  message: string;
}) => {
  try {
    await axiosInstance.post(
      `${route}/chat-messages/insert`,
      data
    );    
  } catch (error) {
    throw error;
  }
};
