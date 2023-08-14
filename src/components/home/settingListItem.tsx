import React from "react";
import { View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";
import { useAppSelector } from "../../store/store";

export default function SettingListItem(props: {
    icon: string,
    label: string,
    onPress?: () => void,
    rightIcon?: string | React.JSX.Element
}) {
    const isDarkMode = useAppSelector((state) => state.app.darkMode);
    const theme = useTheme();

    return (
        <TouchableRipple disabled={props.onPress == null} onPress={() => props.onPress!()}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 24,
                paddingVertical: 18
            }}>
                <View style={{ marginRight: 20 }}>
                    <Icon source={props.icon} size={30} color={theme.colors.primary} />
                </View>
                <Text style={{ flexGrow: 1 }}>{props.label}</Text>
                {props.rightIcon && (
                    typeof (props.rightIcon) == "string" ?
                        <Icon source={props.rightIcon} size={30} color={isDarkMode ? theme.colors.onSurface : theme.colors.secondary} /> :
                        props.rightIcon
                )}
            </View>
        </TouchableRipple>
    );
}