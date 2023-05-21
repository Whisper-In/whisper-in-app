import { View } from "react-native";
import { MD3Colors, Text } from "react-native-paper";
import { formatDateTimeTo12HoursTimeString } from "../../utils/dateUtil";

export default function ChatBubble(props: {
  message: string;
  createdAt?: string;
  isSelf?: boolean;
}) {
  return (
    <View
      style={{
        maxWidth: "90%",
        alignSelf: props.isSelf ? "flex-end" : "flex-start",
        margin: 10,
        padding: 15,
        borderRadius: 20,
        borderTopLeftRadius: props.isSelf ? undefined : 0,
        borderBottomRightRadius: props.isSelf ? 0 : undefined,
        backgroundColor: props.isSelf
          ? MD3Colors.primary70
          : MD3Colors.neutral70,
      }}
    >
      <Text style={{ color: MD3Colors.primary100 }}>{props.message}</Text>

      <Text
        style={{
          color: props.isSelf ? MD3Colors.primary50 : MD3Colors.neutral50,
          fontSize: 12,
          textAlign: "right",
        }}
      >
        {formatDateTimeTo12HoursTimeString(props.createdAt)}
      </Text>
    </View>
  );
}
