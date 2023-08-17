import { Pressable } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

export default function ShareButton() {
    return (
        <Pressable style={{
            alignItems: "center"
        }}>
            <Icon source="share" size={50} color="white"/>

            <Text style={{
                color: "white",
                fontSize: 12,
                fontStyle: "italic"
            }}>
                Share
            </Text>
        </Pressable>
    );
}