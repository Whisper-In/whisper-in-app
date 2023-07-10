import { useEffect, useState } from "react";
import { Keyboard, Platform, TextInput, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

export default function ChatInputBar(props: {
  onSent: (message: string) => void;
}) {
  const theme = useTheme();
  const [message, setMessage] = useState("");

  const paddingBottomKeyboardClosed = Platform.select({ ios: 35, android: 25 });
  const paddingBottomKeyboardOpen = Platform.select({ ios: 5, android: 5 });
  const [paddingBottom, setPaddingBottom] = useState(paddingBottomKeyboardClosed);

  const textinputVerticalPadding = Platform.select({ ios: 11, android: 7 });
  const sendIconSize = Platform.select({ ios: 22, android: 24 });

  const sendMessage = () => {
    if (!message) {
      return;
    }

    setMessage("");

    props.onSent(message);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => { setPaddingBottom(paddingBottomKeyboardOpen) });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => { setPaddingBottom(paddingBottomKeyboardClosed) });

    return (() => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    });
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom,
        maxHeight: 125
      }}
    >
      <View style={{ flexGrow: 1, flexBasis: 1, marginRight: 10 }}>
        <TextInput
          style={{
            color: theme.colors.onSurface,
            backgroundColor: theme.colors.background,
            borderRadius: 25,
            paddingHorizontal: 10,
            paddingTop: textinputVerticalPadding,
            paddingBottom: textinputVerticalPadding
          }}
          multiline={true}
          placeholder="Message"
          placeholderTextColor={theme.colors.onSurface}
          onChangeText={(text) => { setMessage(text) }}
          value={message}
          maxLength={3000}
          onEndEditing={() => {
            sendMessage();
          }}
        />
      </View>

      <IconButton
        icon="arrow-up"
        centered={true}
        containerColor={theme.colors.primary}
        iconColor={theme.colors.onPrimary}
        size={sendIconSize}
        style={{ margin: 0 }}
        onPress={() => {
          sendMessage();
        }}
      />
    </View>
  );
}
