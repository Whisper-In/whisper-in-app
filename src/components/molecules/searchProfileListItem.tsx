import { Avatar, Text, TouchableRipple } from "react-native-paper";
import { IProfileSearchDto } from "../../store/dtos/profile.dtos";
import { View } from "react-native";

export default function SearchProfileListItem(props: { profile: IProfileSearchDto, onPress?: () => void }) {
    return (
        <TouchableRipple onPress={() => { if (props.onPress) props.onPress() }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15
            }}>
                <Avatar.Image source={{ uri: props.profile.avatar }} size={40} style={{
                    marginRight: 10
                }} />
                <Text>{props.profile.name}</Text>
            </View>
        </TouchableRipple>
    );
}