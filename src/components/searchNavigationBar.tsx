import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar, IconButton, TextInput } from "react-native-paper";
import { NativeSyntheticEvent, TextInputChangeEventData, View } from "react-native";

export default function SearchNavigationBar(props: NativeStackHeaderProps & {
    onSearchChange?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void
}) {
    return (
        <Appbar.Header>
            {props.back && (
                <Appbar.BackAction
                    onPress={props.navigation.goBack}
                />
            )}
            <View style={{
                flexDirection: "row",
                flexShrink: 1,
                position: "relative",
            }}>
                <TextInput placeholder="Search" style={{
                    flexGrow: 1,
                    backgroundColor: "transparent",

                }} 
                onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
                    if (props.onSearchChange) {
                        props.onSearchChange(event)
                    }
                }} />

                <IconButton icon="magnify" style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0
                }} />
            </View>
        </Appbar.Header>
    )
}