import {
  View,
  Image,
  Text,
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
    <TouchableRipple    
      style={{
        borderRadius: 100,
        elevation: 5,
        ...style
      }}
      borderless={true}
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
          borderWidth: 0.2
        }}
      >
        <Image
          style={{ width: 24, height: 24, marginRight: 24 }}
          source={require("../../assets/images/ui/google.png")}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "#555",
          }}
        >
          Sign in with Google
        </Text>
      </View>
    </TouchableRipple>
  );
}
