import { KeyboardAvoidingView, Platform, View } from "react-native";
import ChatInputBar from "../components/chat/chatInputBar";
import { useSelector } from "react-redux";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { useEffect, useState } from "react";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "../navigation/types";
import { addNewChatMessage, toggleAudioReplies, updateChatFeatures } from "../store/slices/chats/index";
import { fetchChatCompletion } from "../store/slices/chats/thunks";
import { Chat, ChatFeature } from "../store/states/chatsState";
import { useTheme } from "react-native-paper";
import NavBarBackButton from "../components/nav/navBarBackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IProfileDto } from "../store/dtos/profile.dtos";
import { getChat } from "../store/services/chatService";
import ChatMessageList from "../components/home/chats/chatMessageList";
import NavBarHeaderRightChatPage from "../components/nav/navBarHeaderRightChatPage";
import CustomKeyboardAvoidingView from "../components/customKeyboardAvoidingView";

export default function ChatPage({ navigation }: { navigation: HomePageNavigationProp }) {
  const theme = useTheme();
  const [isTyping, setIsTyping] = useState(false);
  const route = useRoute<RouteProp<HomeStackNavigatorParamList, "Chat">>();
  const { chatId, contactId, isAI } = route.params;
  const chat = useAppSelector((state) => state.chats.chats.find(chat => chat.chatId == chatId))!;
  const userId = useAppSelector((state) => state.user.me!.id);

  const contact = chat.profiles.find((p) => p.id == contactId);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => <NavBarBackButton
        {...props}
        avatar={route.params.avatar}
        onPress={() => navigation.goBack()}
        onAvatarPress={() => navigation.navigate("Profile", { profileId: contactId, isAI })} />
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      getChat(chatId).then((result) => {
        if (result) {
          dispatch(updateChatFeatures({ chatId, features: result.features }));
        }
      }).catch((error) => console.log("Failed to retrieve chat features.", error));
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: chat.features?.includes(ChatFeature.AUDIO) ? (props) => <NavBarHeaderRightChatPage
        {...props}
        onAudioRepliesToggle={() => { dispatch(toggleAudioReplies({ chatId, isAudioRepliesOff: !chat.isAudioRepliesOff })) }}
        isAudioRepliesOff={chat.isAudioRepliesOff} /> : undefined
    });
  }, [chat.isAudioRepliesOff, chat.features]);

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

    if (chat.profiles.find(p => p.id == contactId)?.isBlocked) {
      return;
    }

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
    <CustomKeyboardAvoidingView>
      <ChatMessageList contactName={contact!.name} isBlocked={contact?.isBlocked} chatMessageList={chatMessageList} isTyping={isTyping} />
      <ChatInputBar onSent={onSent} />
    </CustomKeyboardAvoidingView>
  );
}
