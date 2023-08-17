import { useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function RecordingIndicator({ size = 10, style }: { size?: number, style?: ViewStyle }) {
    const radius = size / 2;
    let opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withDelay(
            500,
            withRepeat(
                withTiming(0.7, {
                    duration: 500,
                    easing: Easing.inOut(Easing.ease)
                }),
                -1,
                true
            )
        )
    }, []);

    return (
        <Svg style={style} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <AnimatedCircle
                cx={radius} cy={radius} r={radius} fill="red"
                animatedProps={useAnimatedProps(() => ({ fillOpacity: opacity.value }))} />
        </Svg>
    )
}