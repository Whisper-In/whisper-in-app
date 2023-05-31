import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  SignIn: undefined;
  Home: undefined;
  Chat: {    
    chatId: string;
    contactId: string;
    name: string;            
    isAI:boolean;
    avatar?: string;
  };  
};

export type HomePageNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "Chat"
>;
