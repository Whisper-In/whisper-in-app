import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat } from "../../store/states/chatsState";
import ChatMessageListItem from "../molecules/chatMessageListItem";
import SkeletonPlaceHolder from "react-native-skeleton-placeholder";

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
  if (!props.data?.length) {
    return (
      <SafeAreaView>
        {[...Array(8)].map((x, i) => (
          <ChatMessageListLoading key={i}></ChatMessageListLoading>
        ))}
      </SafeAreaView>
    );
  } else {
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
}

function ChatMessageListLoading() {
  return (
    <SkeletonPlaceHolder highlightColor="#888">
      <SkeletonPlaceHolder.Item
        flexDirection="row"
        alignItems="center"
        padding={12}
        marginBottom={12}
      >
        <SkeletonPlaceHolder.Item
          width={50}
          height={50}
          borderRadius={50}
          opacity={0.2}
        ></SkeletonPlaceHolder.Item>

        <SkeletonPlaceHolder.Item marginLeft={10} flexGrow={1}>
          <SkeletonPlaceHolder.Item
            width={150}
            height={10}
            marginBottom={10}
            opacity={0.2}
          ></SkeletonPlaceHolder.Item>

          <SkeletonPlaceHolder.Item
            width={250}
            height={10}
            opacity={0.2}
          ></SkeletonPlaceHolder.Item>
        </SkeletonPlaceHolder.Item>
      </SkeletonPlaceHolder.Item>
    </SkeletonPlaceHolder>
  );
}
