import { PropsWithChildren, useState } from "react";
import { GestureResponderEvent, TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from "react-native";

export default function TouchableWithDoubleTap({ children, onDoubleTap, ...props }
    : PropsWithChildren & { onDoubleTap?: () => void } & TouchableWithoutFeedbackProps) {
    const maxDoubleTapInterval = 250;
    let [lastPressTime, setLastPressTime] = useState(0);

    const onPressHandler = (event: GestureResponderEvent) => {
        if (onDoubleTap) {
            if (Date.now() - lastPressTime <= maxDoubleTapInterval) {
                onDoubleTap();

                return;
            } else {
                setLastPressTime(Date.now());
            }
        }

        if (props.onPress) {
            props.onPress(event);
        }
    }

    return (
        <TouchableWithoutFeedback {...props} onPress={onPressHandler}>
            {children}
        </TouchableWithoutFeedback>
    );
}