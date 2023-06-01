import {
  StyleProp,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useAppSelector } from "../../store/store";

export default function CustomNavigationBarAvatar(props: {
  imgSrc?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      <Avatar.Image
        style={{
          marginRight: 15,
          marginLeft: 5,
          ...(props.style as object),
        }}
        source={{ uri: props.imgSrc }}
        size={props.size ?? 35}
      />
    </TouchableOpacity>
  );
}
