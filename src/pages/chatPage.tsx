import { View } from "react-native";
import ChatInputBar from "../components/molecules/chatInputBar";
import ChatMessageList from "../components/organisms/chatMessageList";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { useEffect, useState } from "react";
import * as chatGPT from "../store/services/chatGPTService";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HomeStackNavigatorParamList } from "../navigation/types";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { formatDateTimeTo12HoursTimeString } from "../utils/dateUtil";
import { addNewChatMessage } from "../store/slices/chats/index";
import { fetchChatCompletion } from "../store/slices/chats/thunks";
import { Chat } from "../store/states/chatsState";
import { useTheme } from "react-native-paper";

export default function ChatPage() {
  const theme = useTheme();
  const [isTyping, setIsTyping] = useState(false);
  const route = useRoute<RouteProp<HomeStackNavigatorParamList, "Chat">>();
  const { chatId, contactId, isAI } = route.params;
  const userId = useAppSelector((state) => state.user.me!.id);

  const dispatch = useAppDispatch();

  const chatMessageList = useSelector((state: RootState) => {
    const chats = state.chats.records.find((c:Chat) => c.chatId == chatId);

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
      dispatch(fetchChatCompletion({ chatId, contactId, message })).finally(
        () => {
          setIsTyping(false);
        }
      );
    }
  };

  return (
    <View style={{ flex: 1}}>
      <ChatMessageList chatMessageList={chatMessageList} isTyping={isTyping} />
      <ChatInputBar onSent={onSent} />
    </View>
  );
}
