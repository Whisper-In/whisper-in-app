import { Image, Pressable, ViewStyle } from "react-native";

export default function PostListItem({ style, uri, width, height, onPress }
    : { style?: ViewStyle, uri: string, width: number, height: number, onPress?: () => void }) {
    return (
        <Pressable style={style} onPress={onPress}>
            <Image style={{
                width,
                height
            }} source={{ uri }} />
        </Pressable>
    );
}