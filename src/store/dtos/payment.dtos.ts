export interface ICreatePaymentSheetDto {
    paymentIntent: string;
    ephemeralKey: string;
    customer?: string;
    publishableKey: string;
}