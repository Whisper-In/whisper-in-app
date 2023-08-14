import {
  View,
  Image,
  Text,
  ViewStyle,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

export default function AppleSignInButton({
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
        <View style={{marginRight: 24}}>
          <Icon source="apple" size={30} color="#555" />
        </View>

        <Text
          style={{
            fontWeight: "bold",            
            fontSize: 14,
            color: "#555",
          }}
        >
          Sign in with Apple
        </Text>
      </View>
    </TouchableRipple>
  );
}
