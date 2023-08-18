import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function ProfileStatItem({ style, label, ...props }
    : { style?: ViewStyle, label?: string } & PropsWithChildren) {
    const theme = useTheme();

    return (
        <View style={[{
            alignItems: "center"
        }, style]}>
            <Text style={{
                fontWeight: "bold",
                fontSize: theme.fonts.bodyLarge.fontSize,
                color: theme.colors.onSurface
            }}>
                {props.children}
            </Text>

            {
                label &&
                <Text style={{
                    fontSize: theme.fonts.bodySmall.fontSize,
                    color: theme.colors.onSurfaceVariant
                }}>
                    {label}
                </Text>
            }
        </View>
    );
}