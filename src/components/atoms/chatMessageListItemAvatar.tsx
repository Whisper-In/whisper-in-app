import { GestureResponderEvent, StyleProp, TouchableHighlight, View, ViewStyle } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";

export default function ChatMessageListItemAvatar(props: {
  imgSrc: string;
  size: number;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}) {
  return (
    <TouchableRipple
      style={{
        height: props.size,
        width: props.size,
        borderRadius: 999,    
        ...props.style            
      }}
      borderless={true}
      disabled={!props.onPress}
      onPress={props.onPress}>
      <Avatar.Image        
        source={{ uri: props.imgSrc }}
        size={props.size}
      />
    </TouchableRipple>
  );
}
