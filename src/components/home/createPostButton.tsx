import { Image, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

export default function CreatePostButton({ onPress, color }: { onPress: () => void, color?: string }) {
    const size = 30;
    const theme = useTheme();

    return (
        <Pressable onPress={onPress}>
            {/* <Image source={require("../../assets/images/icons/adaptive-icon.png")}
                style={{ width: size, height: size }} /> */}
            <Icon source="camera" size={size} color={theme.colors.primary} />
        </Pressable>
    );
}