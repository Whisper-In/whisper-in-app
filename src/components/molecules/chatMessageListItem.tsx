import { memo } from "react";
import { GestureResponderEvent, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { formatDateTimeTo12HoursTimeString } from "../../utils/dateUtil";
import ChatMessageListItemAvatar from "../atoms/chatMessageListItemAvatar";

function ChatMessageListItem(props: {
  imgSrc?: string;
  name: string;
  messagePreview: string;
  lastMessageDateTime?: string;
  onPress?: (event: GestureResponderEvent) => void;
}) {
  const lastMessageDate = formatLastMessageDate(props.lastMessageDateTime);

  return (
    <TouchableRipple rippleColor="rgba(0,0,0,.1)" onPress={props.onPress}>
      <View
        style={{
          flexDirection: "row",          
          alignItems: "center",
          padding: 12,
        }}
      >
        <ChatMessageListItemAvatar
          size={50}
          imgSrc={props.imgSrc ?? ""}
          style={{
            marginRight: 10,
          }}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{ fontWeight: "900", fontSize: 16, marginRight: "auto" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {props.name}
            </Text>

            <Text>{lastMessageDate}</Text>
          </View>
          {props.messagePreview?.length && (
            <Text numberOfLines={1} ellipsizeMode="tail">
              {props.messagePreview}
            </Text>
          )}
        </View>
      </View>
    </TouchableRipple>
  );
}

export default memo(ChatMessageListItem);

function formatLastMessageDate(lastMessageDateTime?: any): string {
  if (!lastMessageDateTime) return "";

  if (!(lastMessageDateTime instanceof Date))
    lastMessageDateTime = new Date(lastMessageDateTime);

  const today = new Date();
  const todayDate = today.getDate();
  const todayTime = today.getTime();
  const lastMessageDate = lastMessageDateTime.getDate();
  const lastMessageTime = lastMessageDateTime.getTime();

  const justNowTimeThreshold = 10;

  if (todayDate == lastMessageDate) {
    if (todayTime > lastMessageTime + justNowTimeThreshold * 60 * 1000) {
      return formatDateTimeTo12HoursTimeString(lastMessageDateTime);
    } else {
      return "Just now";
    }
  } else if (todayDate == lastMessageDate + 1) {
    return "Yesterday";
  } else {
    return lastMessageDateTime.toLocaleDateString();
  }
}
