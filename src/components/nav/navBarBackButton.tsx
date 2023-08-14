import { Appbar, Avatar, TouchableRipple } from "react-native-paper";
import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { View } from "react-native";

export default function NavBarBackButton(props: HeaderBackButtonProps & { onPress: () => void, avatar?: string, onAvatarPress?: () => void }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", margin: 0, padding: 0 }}>
            <Appbar.BackAction style={{
                margin: 0
            }} onPress={props.onPress} />
            {props.avatar && (
                <TouchableRipple
                    style={{
                        height: 35,
                        width: 35,
                        borderRadius: 999,
                        marginRight: 15,
                        marginLeft: 5,
                    }}
                    borderless={true}
                    onPress={props.onAvatarPress}>
                    <Avatar.Image
                        source={{ uri: props.avatar }}
                        size={35}
                    />
                </TouchableRipple>
            )}
        </View>
    );
}