import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { ChatMessage } from "../../store/states/chatsState";
import { RootState, useAppSelector } from "../../store/store";
import ChatBubble from "../chat/chatBubble";
import ChatAudioBubble from "../chat/chatAudioBubble";
import { Audio } from "expo-av";
import ChatInputBar from "../chat/chatInputBar";
import { Text, useTheme } from "react-native-paper";

export default function ChatMessageList(props: {
  chatMessageList: ChatMessage[];
  isTyping: boolean;
  isBlocked?: boolean;
  contactName: string;
}) {
  const theme = useTheme();
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
        return (
          <View style={{ transform: [{ scale: -1 }] }}>
            {
              props.isBlocked ?
                <Text style={{
                  textAlign: "center",
                  color: theme.colors.error
                }}>
                  Unblock {props.contactName} to receive replies.
                </Text>
                :
                props.isTyping &&
                <ChatBubble isSelf={false} />
            }
          </View>
        );
      }}
    ></FlatList>
  );
}
