import { View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function InfoGroup({ style, userName, description }
    : { style?: ViewStyle, userName: string, description?: string }) {
    const theme = useTheme();

    return (
        <View style={style}>
            <Text style={{
                color: "white",
                fontSize: theme.fonts.headlineSmall.fontSize,
                fontStyle: "italic",
                marginBottom: description ? 10 : 0
            }}>@{userName}</Text>

            {
                description &&
                <Text style={{
                    color: "white",
                    fontSize: theme.fonts.bodyLarge.fontSize
                }} numberOfLines={2}>{description}</Text>
            }
        </View >
    );
}