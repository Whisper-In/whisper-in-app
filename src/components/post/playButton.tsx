import { View, ViewStyle } from "react-native";
import Icon from "react-native-paper/src/components/Icon";

export default function PlayButton({ style, size = 100, color = "white" }
    : { style?: ViewStyle, size?: number, color?: string }) {
    return (
        <View style={style}>
            <Icon source="play" size={size} color={color} />
        </View>
    );
}