import { IUserProfileDto } from "../dtos/profile.dtos";
import axiosInstance from "../axiosInstance";

const route = "user";

export const createUserAISubscription = async (userId: string, aiProfileId: string, tier:number, subscriptionId?: string) => {
  try {
    const result:string = await axiosInstance.post(`${route}/ai-subscription`, { aiProfileId, tier, subscriptionId });

    return result;
  } catch (error) {
    throw error;
  }
}

export const getUserProfile =async (userId: string) => {
  try {
    const result = await axiosInstance.get<IUserProfileDto>(`${route}/${userId}`);

    return result.data;
  } catch (error) {
    throw error;
  }
}