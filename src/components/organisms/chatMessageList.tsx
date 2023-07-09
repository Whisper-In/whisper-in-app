import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { ChatMessage } from "../../store/states/chatsState";
import { RootState, useAppSelector } from "../../store/store";
import ChatBubble from "../molecules/chatBubble";
import ChatAudioBubble from "../molecules/chatAudioBubble";
import { Audio } from "expo-av";
import ChatInputBar from "./chatInputBar";

export default function ChatMessageList(props: {
  chatMessageList: ChatMessage[];
  isTyping: boolean;
}) {
  const listRef = useRef<FlatList>(null);
  const userId = useAppSelector((state) => state.user.me!.id);

  const renderItem = useCallback(({ item, index }: { item: ChatMessage, index: number }) => {
    const isSelf = item.senderId == userId;
    let chatBubble = (
      <ChatBubble isSelf={isSelf} createdAt={item.createdAt}>
        {item.message}
      </ChatBubble>
    )

    if (!isSelf) {
      if (item.audioUrl) {
        chatBubble = (
          <ChatAudioBubble
            isSelf={isSelf}
            audioUrl={item.audioUrl}
            createdAt={item.createdAt} />
        );
      }
    }

    return (
      <View
        style={{ transform: [{ scale: -1 }] }}>
        {chatBubble}
      </View>
    );
  }, [props.chatMessageList]);

  //Use scale=-1 instead of inverted flatlist to avoid react native's inverted flatlist performance bug
  return (
    <FlatList
      ref={listRef}
      removeClippedSubviews={false}
      style={{ transform: [{ scale: -1 }] }}
      keyExtractor={(item: ChatMessage, index: number) => index.toString()}
      data={props.chatMessageList}
      initialNumToRender={25}
      renderItem={renderItem}
      onContentSizeChange={() => {
        if (
          props.chatMessageList.length &&
          props.chatMessageList[0].senderId == userId
        )
          listRef?.current?.scrollToOffset({ animated: false, offset: 0 });
      }}
      ListHeaderComponent={() => {
        if (props.isTyping) {
          return (
            <View style={{ transform: [{ scale: -1 }] }}>
              <ChatBubble isSelf={false} />
            </View>
          );
        } else {
          return <></>;
        }
      }}
    ></FlatList>
  );
}
