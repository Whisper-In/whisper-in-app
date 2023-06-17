import { ICreatePaymentSheetDto } from "../dtos/payment.dtos";
import axiosInstance from "./axiosInstance"

const route = "payment";

export const createSubscriptionPaymentSheet = async (
    amount: number,
    metadata: { userId: string, aiProfileId: string },
    customerStripeId?: string) => {
    try {
        const result = await axiosInstance.post(`${route}/payment-sheet`, {
            amount,            
            metadata,
            customerStripeId
        });

        return <ICreatePaymentSheetDto>result.data;
    } catch (error) {
        console.log(error)
    }
}