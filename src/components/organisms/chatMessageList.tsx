import { useRef } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { ChatMessageActionPayload } from "../../store/slices/chat/types";
import { ChatMessage } from "../../store/states/chatsState";
import { RootState, useAppSelector } from "../../store/store";
import ChatBubble from "../atoms/chatBubble";

export default function ChatMessageList(props: {
  chatMessageList: ChatMessage[];
}) {
  const listRef = useRef<FlatList>(null);
  const userId = useAppSelector((state) => state.user.id);

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item:ChatMessage, index:number) => index.toString()}
      data={props.chatMessageList}
      renderItem={({ item }) => (
        <ChatBubble
          message={item.message}
          isSelf={item.senderId == userId}
          createdAt={item.createdAt}
        />
      )}
      onContentSizeChange={() => {
        props?.chatMessageList.length && listRef?.current?.scrollToEnd();
      }}
    />
  );
}
