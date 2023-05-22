import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat } from "../../store/states/chatsState";
import ChatMessageListItem from "../molecules/chatMessageListItem";

export default function ChatHistoryList(props: {
  data: Chat[];
  onPress: (
    chatId: string,
    contactId: string,
    contactName: string,
    isAI: boolean,
    contactAvatar?: string
  ) => void;
}) {
  
  return (
    <SafeAreaView>      
      <FlatList
        data={props.data}
        keyExtractor={(item) => item.chatId}
        renderItem={({ item }) => (
          <ChatMessageListItem
            name={item.profiles[0].name}
            imgSrc={item.profiles[0].avatar ?? ""}
            messagePreview={item.messages[0]?.message}
            lastMessageDateTime={item.messages[0]?.createdAt}
            onPress={() =>
              props.onPress(
                item.chatId,
                item.profiles[0].id,
                item.profiles[0].name,
                item.profiles[0].isAI,
                item.profiles[0].avatar
              )
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
