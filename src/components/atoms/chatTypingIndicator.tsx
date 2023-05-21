import { IconButton, MD3Colors } from "react-native-paper";
import { StyleProp, View, ViewStyle } from "react-native";

export default function ChatTypingIndicator(props: {
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={props.style}>
      <IconButton
        style={{
          margin: 0,
          padding: 0,
        }}
        icon="dots-horizontal"
        size={30}
        iconColor={MD3Colors.primary50}
      />
    </View>
  );
}
