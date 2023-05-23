import { ReactNode } from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { formatDateTimeTo12HoursTimeString } from "../../utils/dateUtil";

export default function ChatBubble({
  createdAt,
  isSelf,
  children,
}: {
  createdAt?: string;
  isSelf: boolean;
  children?: ReactNode;
}) {
  const theme = useTheme();

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
        backgroundColor: isSelf ? theme.colors.primary : theme.colors.secondary,
      }}
    >
      <Text
        style={{
          color: isSelf ? theme.colors.onPrimary : theme.colors.onSecondary,
        }}
      >
        {children}
      </Text>

      {createdAt?.length && (
        <Text
          style={{
            color: isSelf ? theme.colors.onPrimaryContainer : theme.colors.onSecondaryContainer,
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
