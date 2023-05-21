import { StyleProp, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

export default function CustomNavigationBarAvatar(props: {
  imgSrc: string;
  size: number;
  style: StyleProp<ViewStyle>;
}) {
  return (
    <Avatar.Image
      style={props.style}
      source={{ uri: props.imgSrc }}
      size={props.size}
    />
  );
}
