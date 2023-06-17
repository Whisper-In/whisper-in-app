import { Appbar, Avatar, TouchableRipple } from "react-native-paper";
import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { View } from "react-native";

export default function NavBarBackButton(props: HeaderBackButtonProps & { onPress: () => void, avatar?: string }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", margin: 0, padding: 0 }}>
            <Appbar.BackAction style={{
                margin: 0
            }} onPress={props.onPress} />
            {props.avatar && (
                <Avatar.Image
                    style={{
                        marginRight: 15,
                        marginLeft: 5,
                    }}
                    source={{ uri: props.avatar }}
                    size={35}
                />
            )}
        </View>
    );
}