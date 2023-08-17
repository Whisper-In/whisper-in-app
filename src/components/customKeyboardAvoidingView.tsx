import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomKeyboardAvoidingView(props: PropsWithChildren) {
    const inset = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.select({ ios: 64 + inset.bottom })}
            style={{ flex: 1 }}>
            {props.children}
        </KeyboardAvoidingView>
    )
}