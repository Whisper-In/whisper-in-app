import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ChatHistoryList from "../components/organisms/chatHistoryList";
import { HomePageNavigationProp as HomePageNavigationProp } from "../navigation/types";
import { IUserChatDto } from "../store/dtos/chat.dtos";
import { getUserChats } from "../store/services/chatService";
import { fetchChats } from "../store/slices/chats/thunks";
import { Chat } from "../store/states/chatsState";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import { FETCH_CHATS_RETRY_COUNT, FETCH_CHATS_RETRY_INTERVAL } from "../constants";

export default function HomePage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const theme = useTheme();
  const me = useAppSelector((state) => state.user.me!);
  const chats = useAppSelector((state) => state.chats.records);
  let retries = 0

  const dispatch = useAppDispatch();

  const dispathcFetchChats = () => {
    dispatch(fetchChats(me.id)).catch(() => {
      if (retries < FETCH_CHATS_RETRY_COUNT) {
        setTimeout(() => {
          retries++;
          dispathcFetchChats()
        }, FETCH_CHATS_RETRY_INTERVAL);
      } else {
        Alert.alert("Unable to Fetch Chats", "Please restart the app and try again.")
      }
    });
  }

  useEffect(() => {
    dispathcFetchChats();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ChatHistoryList
        data={chats}
        onPress={(chatId, contactId, contactName, isAI, contactAvatar) =>
          navigation.navigate("Chat", {
            chatId,
            contactId: contactId,
            name: contactName,
            isAI,
            avatar: contactAvatar,
          })
        }
      />    
    </View>
  );
}
