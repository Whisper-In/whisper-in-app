import {
  View,
  Image,
  Touchable,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { TouchableRipple } from "react-native-paper";

export default function GoogleSignInButton({
  onPress,
  disabled,
  style,
}: {
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  return (
    <TouchableHighlight
      style={{
        borderRadius: 100,
        ...style
      }}
      disabled={disabled}
      onPress={onPress}>
      <View
        style={{
          backgroundColor: !disabled ? "#fff" : "#aaa",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          borderRadius: 100,
          elevation: 10,
          shadowColor: "#000",
          height: 50,
          width: 300,
        }}
      >
        <Image
          style={{ width: 24, height: 24, marginRight: 24 }}
          source={require("../../assets/images/ui/google.png")}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontFamily: "Roboto",
            fontSize: 14,
            color: "#555",
          }}
        >
          Sign in with Google
        </Text>
      </View>
    </TouchableHighlight>
  );
}
