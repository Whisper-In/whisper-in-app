import { KeyboardAvoidingView, Platform, View } from "react-native";
import ChatInputBar from "../components/organisms/chatInputBar";
import ChatMessageList from "../components/organisms/chatMessageList";
import { useSelector } from "react-redux";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "../navigation/types";
import { addNewChatMessage } from "../store/slices/chats/index";
import { fetchChatCompletion } from "../store/slices/chats/thunks";
import { Chat } from "../store/states/chatsState";
import { useTheme } from "react-native-paper";
import NavBarBackButton from "../components/molecules/navBarBackButton";
import { ChatMessageActionPayload } from "../store/slices/chats/types";

export default function ChatPage({ navigation }: { navigation: HomePageNavigationProp }) {
  const theme = useTheme();
  const [isTyping, setIsTyping] = useState(false);
  const route = useRoute<RouteProp<HomeStackNavigatorParamList, "Chat">>();
  const { chatId, contactId, isAI } = route.params;
  const userId = useAppSelector((state) => state.user.me!.id);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <NavBarBackButton
        {...props}
        avatar={route.params.avatar}
        onPress={() => navigation.goBack()}
        onAvatarPress={() => navigation.navigate("Profile", { profileId: contactId, isAI })} />
    });
  }, []);

  const dispatch = useAppDispatch();

  const chatMessageList = useSelector((state: RootState) => {
    const chats = state.chats.chats.find((c: Chat) => c.chatId == chatId);

    return chats?.messages ?? [];
  });

  const onSent = (message: string) => {
    const createdAt = new Date().toString();
    dispatch(
      addNewChatMessage({
        chatId,
        senderId: userId,
        message,
        createdAt,
        updatedAt: createdAt,
      })
    );

    setIsTyping(true);

    if (isAI) {
      const getReply = async () => {
        try {
          await dispatch(fetchChatCompletion({ chatId, contactId, message }));
        } catch (error) {
          console.log(error);
        } finally {
          setIsTyping(false);
        }
      }

      getReply();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ios:65})}
      style={{ flex: 1 }}>
      <ChatMessageList chatMessageList={chatMessageList} isTyping={isTyping} />
      <ChatInputBar onSent={onSent} />
    </KeyboardAvoidingView>
  );
}
