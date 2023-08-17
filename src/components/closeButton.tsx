import { Pressable, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

export default function CloseButton({ style, color, onPress }
    : { style?:ViewStyle, color?: string, onPress?: () => void }) {
    const theme = useTheme();

    return (
        <Pressable style={style} onPress={onPress}>
            <Icon source="close" size={25}
                color={color ?? theme.colors.onSurface} />
        </Pressable>
    );
}