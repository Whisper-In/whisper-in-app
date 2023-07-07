import { useState } from "react";
import { TextInput, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export default function ChatInputBar(props: {
  onSent: (message: string) => void;
}) {
  const theme = useTheme();
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message) {
      return;
    }

    setMessage("");

    props.onSent(message);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxHeight: 150
      }}
    >
      <View style={{ flexGrow: 1, flexBasis: 1, marginRight: 5 }}>
        <TextInput
          multiline={true}
          placeholder="Write a message..."
          placeholderTextColor={theme.colors.onSurface}
          onChangeText={(text) => setMessage(text)}
          value={message}
          maxLength={3000}
          onEndEditing={() => {
            sendMessage();
          }}
        />
      </View>

      <IconButton
        icon="send"
        centered={true}
        containerColor={theme.colors.primary}
        iconColor={theme.colors.onPrimary}
        size={35}
        style={{ margin: 0 }}
        onPress={() => {
          sendMessage();
        }}
      />
    </View>
  );
}
