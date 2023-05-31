import axiosInstance from "./axiosInstance";

const route = "auth/google";

export const googleAuthCallback = async (accessToken: string) => {
  try {
    const result = await axiosInstance.post(`${route}/login`, { accessToken });

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
