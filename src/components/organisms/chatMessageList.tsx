import { useRef } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { ChatMessage } from "../../store/states/chatsState";
import { RootState, useAppSelector } from "../../store/store";
import ChatBubble from "../atoms/chatBubble";
import ChatAudioBubble from "../atoms/chatAudioBubble";

export default function ChatMessageList(props: {
  chatMessageList: ChatMessage[];
  isTyping: boolean;
}) {
  const listRef = useRef<FlatList>(null);
  const userId = useAppSelector((state) => state.user.me!.id);

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item: ChatMessage, index: number) => index.toString()}
      data={props.chatMessageList}
      renderItem={({ item }) => (
        <ChatBubble isSelf={item.senderId == userId} createdAt={item.createdAt}>
          {item.message}
        </ChatBubble>
      )}
      inverted={true}
      onContentSizeChange={() => {
        if (
          props.chatMessageList.length &&
          props.chatMessageList[0].senderId == userId
        )
          listRef?.current?.scrollToOffset({ animated: false, offset: 0 });
      }}
      ListHeaderComponent={() => {
        if (props.isTyping) {
          return <ChatBubble isSelf={false} />;
        } else {          
          return <></>;
        }
      }}
    ></FlatList>
  );
}
