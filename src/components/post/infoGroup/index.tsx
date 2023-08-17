import { View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

export default function InfoGroup({ style, userName, description }
    : { style?: ViewStyle, userName: string, description?: string }) {
    return (
        <View style={style}>
            <Text style={{
                color: "white",
                fontSize: 20,
                fontStyle: "italic",
                marginBottom: description ? 10 : 0
            }}>@{userName}</Text>

            {
                description &&
                <Text style={{
                    color: "white",
                    fontSize: 14
                }} numberOfLines={2}>{description}</Text>
            }
        </View >
    );
}