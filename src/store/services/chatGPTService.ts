import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
} from "openai";
import { IUserChatMessagesDto } from "../dtos/chat.dtos";
import axiosInstance from "./axiosInstance";

const route = "chat-gpt";

export const MAX_PREV_MESSAGES_LIMIT = 25;

export const getChatCompletion = async (
  aiProfileId: string,
  message: string,
  prevMessages: ChatCompletionRequestMessage[]
): Promise<IUserChatMessagesDto> => {
  try {
    const result = await axiosInstance.post(`${route}/chat-completion`, {
      message,
      aiProfileId,
      prevMessages,
    });

    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
