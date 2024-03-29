import { FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat } from "../../store/states/chatsState";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ChatMessageListItem from "../home/chats/chatMessageListItem";

export default function ChatHistoryList(props: {
  data: Chat[];
  onPress: (
    chatId: string,
    contactId: string,
    contactName: string,
    isAI: boolean,
    contactAvatar?: string
  ) => void;
  onAvatarPress: (profileId: string, isAI: boolean) => void;
}) {
  if (!props.data?.length) {
    return (
      <View>
        {[...Array(8)].map((x, i) => (
          <ChatMessageListLoading key={i}></ChatMessageListLoading>
        ))}
      </View>
    );
  } else {
    return (
      <View>
        <FlatList
          data={props.data}
          keyExtractor={(item) => item.chatId}
          renderItem={({ item }) => {
            const profile = item.profiles[0];

            return <ChatMessageListItem
              name={profile?.name}
              imgSrc={profile?.avatar ?? ""}
              messagePreview={item.messages[0]?.message}
              lastMessageDateTime={item.messages[0]?.createdAt}
              onPress={() =>
                props.onPress(
                  item.chatId,
                  profile.id,
                  profile.name,
                  profile.isAI,
                  profile.avatar
                )
              }
              onAvatarPress={() => props.onAvatarPress(profile.id, profile.isAI)}
            />
          }
          }
        />
      </View>
    );
  }
}

function ChatMessageListLoading() {
  return (
    <SkeletonPlaceholder highlightColor="#888">
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        padding={12}
        marginBottom={12}
      >
        <SkeletonPlaceholder.Item
          width={50}
          height={50}
          borderRadius={50}
          opacity={0.2}
        ></SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item marginLeft={10} flexGrow={1}>
          <SkeletonPlaceholder.Item
            width={150}
            height={10}
            marginBottom={10}
            opacity={0.2}
          ></SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item
            width={250}
            height={10}
            opacity={0.2}
          ></SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
