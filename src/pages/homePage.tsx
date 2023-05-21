import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ChatHistoryList from "../components/organisms/chatHistoryList";
import { HomePageNavigationProp as HomePageNavigationProp } from "../navigation/types";
import { IUserChatDto } from "../store/dtos/chat.dtos";
import { getUserChats } from "../store/services/chatService";
import { fetchChats } from "../store/slices/chats/thunks";
import { Chat } from "../store/states/chatsState";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";

export default function HomePage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const [refreshing, setRefreshing] = useState(false);
  const userId = useAppSelector((state) => state.user.id);
  const chats = useAppSelector((state) => state.chats.records);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChats(userId));
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View>
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
