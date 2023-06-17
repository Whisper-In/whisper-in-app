import { IProfileDto, IProfileSearchDto } from "../dtos/profile.dtos";
import axiosInstance from "./axiosInstance"

const route = "profile";

export const getProfile = async (profileId: string, isAI = false) => {
    try {
        const result = await axiosInstance.get(`${route}/${profileId}`, {
            params: {
                isAI
            }
        });        

        return <IProfileDto>result.data;
    } catch (error) {
        console.log(error);
    }
}

export const searchProfiles = async (query: string) => {
    try {
        const result = await axiosInstance.get(`${route}/search/${query}`);

        return <IProfileSearchDto[]>result.data;
    } catch (error) {
        console.log(error)
    }
}