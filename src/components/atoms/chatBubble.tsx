import { ReactNode } from "react";
import { View } from "react-native";
import { MD3Colors, Text } from "react-native-paper";
import { formatDateTimeTo12HoursTimeString } from "../../utils/dateUtil";

export default function ChatBubble({  
  createdAt,
  isSelf,
  children
}: { 
  createdAt?: string;
  isSelf: boolean;
  children?: ReactNode;
}) {
  return (
    <View
      style={{
        maxWidth: "90%",
        alignSelf: isSelf ? "flex-end" : "flex-start",
        margin: 10,
        padding: 15,
        borderRadius: 20,
        borderTopLeftRadius: isSelf ? undefined : 0,
        borderBottomRightRadius: isSelf ? 0 : undefined,
        backgroundColor: isSelf
          ? MD3Colors.primary70
          : MD3Colors.neutral70,
      }}
    >
      <Text style={{ color: MD3Colors.primary100 }}>{children}</Text>

      {createdAt?.length && (
        <Text
          style={{
            color: isSelf ? MD3Colors.primary50 : MD3Colors.neutral50,
            fontSize: 12,
            textAlign: "right",
          }}
        >
          {formatDateTimeTo12HoursTimeString(createdAt)}
        </Text>
      )}
    </View>
  );
}
