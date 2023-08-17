import { Pressable, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

export default function UploadButton({ style, onPress }
    : { style?: ViewStyle, onPress?: () => void }) {

    return (
        <Pressable style={{             
            alignItems: "center",
            ...style        
        }} onPress={onPress}>
            <Icon source="image-plus" size={35} color="white"/>

            <Text style={{color: "white"}}>Upload</Text>
        </Pressable>
    )
}