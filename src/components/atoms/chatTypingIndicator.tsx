import { IconButton, MD3Colors, Text } from "react-native-paper";
import { StyleProp, View, ViewStyle } from "react-native";
import ChatBubble from "./chatBubble";

export default function ChatTypingIndicator(props: {
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={props.style}>
      <ChatBubble isSelf={false}>
        <Text style={{ color: MD3Colors.primary100, fontWeight: "900" }}>
          ...
        </Text>
      </ChatBubble>
    </View>
  );
}
