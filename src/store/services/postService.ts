import { REACT_APP_WHISPERIN_SERVICE_BASEURL } from "@env";
import FileSystem from "expo-file-system";
import { store } from "../store";
import axiosInstance from "../axiosInstance";
import { IPostDto, IPostResultsDto } from "../dtos/content.dtos";

const baseURL = `${REACT_APP_WHISPERIN_SERVICE_BASEURL}`;
const route = "content/posts";

export const getPosts = async (profileId: string, postType: string, pageIndex: number, itemsPerLoad: number) => {
    try {
        const results = await axiosInstance.get(`${route}`, { params: { profileId, pageIndex, itemsPerLoad, postType } });

        return results.data as IPostResultsDto
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const createPost = async (postURI: string, description?: string) => {
    try {
        const token = store.getState()?.user?.token;

        const parameters: Record<string, string> = {};

        if (description) {
            parameters["description"] = description;
        }

        const results = await FileSystem.uploadAsync(`${baseURL}/${route}/createPost`, postURI, {
            parameters,
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            httpMethod: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return results;
    } catch (error) {
        throw error;
    }
}

export const getExplorePosts = async (size: number) => {
    try {
        const results = await axiosInstance.get(`${route}/explore`, { params: { size } });

        return results.data as IPostDto[];
    } catch (error) {
        throw error;
    }
}

export const getRecommendedPosts = async (size: number, showFollowingOnly?: boolean) => {
    try {
        const results = await axiosInstance.get(`${route}/recommended`, { params: { size, showFollowingOnly } });

        return results.data as IPostDto[];
    } catch (error) {
        throw error;
    }
}

export const likePost = async (postId: string) => {
    try {
        const results = await axiosInstance.post(`${route}/like`, { postId });

        return results.data as { isLiked: boolean, likeCount: number };
    } catch (error) {
        throw error;
    }
}