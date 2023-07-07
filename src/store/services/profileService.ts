import { ICreatePaymentSheetDto } from "../dtos/payment.dtos";
import { IProfileDto, IProfileSearchDto } from "../dtos/profile.dtos";
import axiosInstance from "../axiosInstance"

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

export const createPaymentSheet = async (
    amount: number,
    metadata: { userId: string, aiProfileId: string }) => {
    try {
        const result = await axiosInstance.post(`${route}/payment-sheet`, {
            amount,
            metadata
        });

        return <ICreatePaymentSheetDto>result.data;
    } catch (error) {
        console.log(error)
    }
}

export const createPaymentSubscription = async (
    amount: number,
    metadata: { userId: string, aiProfileId: string }) => {
    try {
        const result = await axiosInstance.post(`${route}/payment-subscription`, {
            amount,
            metadata
        });

        return <ICreatePaymentSheetDto>result.data;
    } catch (error) {
        console.log(error)
    }
}

export const cancelPaymentSubscription = async (userId: string, aiProfileId: string) => {
    try {
        const result = await axiosInstance.post(`${route}/cancel-subscription`, {
            userId, aiProfileId
        });

        return result.data;
    } catch (error) {
        console.log(error)
    }
}