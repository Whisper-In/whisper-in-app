import { useRef, useState } from "react";
import { TextInput as NativeTextInput, View } from "react-native";
import { Button, IconButton, TextInput, MD3Colors } from "react-native-paper";

export default function ChatInputBar(props: {
  onSent: (message: string) => void;
}) {
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
        alignItems: "flex-end",
        padding: 8,
      }}
    >
      <TextInput
        style={{ flex: 1, marginRight: 8 }}
        mode="outlined"
        outlineStyle={{
          borderRadius: 50,
          borderWidth: 0,
          backgroundColor: MD3Colors.neutral90,
        }}
        dense={true}
        placeholder="Message"
        onChangeText={(text) => setMessage(text)}
        value={message}
        onEndEditing={() => {
          sendMessage();
        }}
      />
      <IconButton
        icon="send"
        centered={true}
        containerColor={MD3Colors.primary50}
        iconColor={MD3Colors.primary100}
        size={28}
        style={{ margin: 0 }}
        onPress={() => {
          sendMessage();
        }}
      />
    </View>
  );
}
