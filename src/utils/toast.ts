import { MD3Theme } from "react-native-paper";
import Toast from "react-native-root-toast";

export const showToast = (text:string, theme: MD3Theme) => {
    Toast.show(text, {
        backgroundColor: theme.colors.onSecondary,
        containerStyle: {
            borderRadius: 999
        }
    });
}