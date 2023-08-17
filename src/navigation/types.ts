import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PostDto } from "../store/dtos/content.dtos";

export enum UploadType {
  PHOTO, VIDEO
}

export type HomeStackNavigatorParamList = {
  SignIn: undefined;
  Home: { avatar?: string; };
  Chat: {
    chatId: string;
    contactId: string;
    name: string;
    isAI: boolean;
    avatar?: string;
  };
  Account: undefined,
  Search: undefined,
  Profile: {
    profileId: string;
    isAI: boolean;
  },
  ViewPost: {
    post: PostDto;
  },
  Camera: undefined;
  Upload: {
    uri: string;
    uploadType: UploadType
  }
};

export type HomePageNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "Chat"
>;
