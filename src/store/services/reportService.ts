import axiosInstance from "../axiosInstance"
import { IReportReasonDto } from "../dtos/business.dtos";

const route = "profile/report";

export const getReportReasons = async () => {
    try {
        const result = await axiosInstance.get(`${route}/reasons`);

        return <IReportReasonDto[]>result.data;
    } catch (error) {
        throw error;
    }
}

export const sendReport = async (userId: string, aiProfileId: string, reportReasonCode: string) => {
    try {        
        await axiosInstance.post(`${route}`, { userId, aiProfileId, reportReasonCode });
    } catch (error) {
        throw error;
    }
}