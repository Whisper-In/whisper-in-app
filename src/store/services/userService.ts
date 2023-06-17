import axios from "axios";
import { REACT_APP_WHISPER_SERVICE_BASEURL } from "@env";
import { IUserChatDto, IUserChatMessagesDto } from "../dtos/chat.dtos";
import axiosInstance from "./axiosInstance";

const route = "user";

export const createUserAISubscription = async (userId: string, aiProfileId: string, tier:number) => {
  try {
    const result:string = await axiosInstance.post(`${route}/ai-subscription`, { aiProfileId, tier });

    return result;
  } catch (error) {
    throw error;
  }
}