import { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

export default function RoundedTextInput({ style, ...props }
    : { style?: TextStyle } & TextInputProps) {
    const theme = useTheme();

    return (
        <TextInput
            style={[{
                color: theme.colors.onBackground,
                backgroundColor: theme.colors.background,
                borderRadius: 25,
                paddingHorizontal: 10,
                paddingTop: 10,
                paddingBottom: 10,                
            }, style]}
            placeholderTextColor={theme.colors.onSurface}
            {...props}
        />
    );
}