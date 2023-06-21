import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

export default function NavBarHeaderRight(props: { onSearchPress?: () => void }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
            <IconButton icon="magnify" style={{ margin: 0 }} onPress={props.onSearchPress} />
        </View>
    );
}