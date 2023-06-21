import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
  }
};

export type HomePageNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "Chat"
>;
