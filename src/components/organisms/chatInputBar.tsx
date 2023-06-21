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
    <View>
      <View
        style={{
          justifyContent: "flex-start",
          backgroundColor: theme.colors.surface,
          paddingHorizontal: 16,
          paddingTop: 12,
          height: 86
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {/* <IconButton
            icon="emoticon-happy-outline"
            centered={true}
            size={30}
            style={{
              margin: 0
            }}
            iconColor={theme.colors.outline} /> */}

          <TextInput
            style={{ flex: 1, marginRight: 8, color: theme.colors.onSurface }}
            placeholder="Write a message..."
            placeholderTextColor={theme.colors.onSurface}            
            onChangeText={(text) => setMessage(text)}
            value={message}
            onEndEditing={() => {
              sendMessage();
            }}
          />

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
      </View>

    </View>
  );
}
