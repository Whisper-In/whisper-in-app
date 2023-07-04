import { useCallback, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { ChatMessage } from "../../store/states/chatsState";
import { RootState, useAppSelector } from "../../store/store";
import ChatBubble from "../molecules/chatBubble";
import ChatAudioBubble from "../molecules/chatAudioBubble";
import { Audio } from "expo-av";

export default function ChatMessageList(props: {
  chatMessageList: ChatMessage[];
  isTyping: boolean;
}) {
  const listRef = useRef<FlatList>(null);
  const userId = useAppSelector((state) => state.user.me!.id);

  const renderItem = useCallback(({ item }: { item: ChatMessage }) => {
    const isSelf = item.senderId == userId;
    if (isSelf) {
      return (
        <ChatBubble isSelf={isSelf} createdAt={item.createdAt}>
          {item.message}
        </ChatBubble>
      );
    } else {
      if (item.audioUrl) {
        return (
          <ChatAudioBubble
            isSelf={isSelf}
            audioUrl={item.audioUrl}
            createdAt={item.createdAt} />
        );
      } else {
        return (
          <ChatBubble isSelf={isSelf} createdAt={item.createdAt}>
            {item.message}
          </ChatBubble>
        );
      }

    }
  }, [props.chatMessageList]);

  return (
    <FlatList
      ref={listRef}
      keyExtractor={(item: ChatMessage, index: number) => index.toString()}
      data={props.chatMessageList}
      initialNumToRender={50}
      renderItem={renderItem}
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
