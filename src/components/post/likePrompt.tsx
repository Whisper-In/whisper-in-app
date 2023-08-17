import React, { useImperativeHandle, useState } from "react";
import { View, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";
import Animated, { Easing, runOnJS, useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";

export type LikePromptComponentType = {
    prompt: () => void;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const LikePrompt = React.forwardRef(({ style, size = 120 }
    : { style?: ViewStyle, size?: number }, ref: React.Ref<LikePromptComponentType>) => {

    const opacity = useSharedValue(0);
    const animatedSize = useSharedValue(0);
    const [isPrompted, setIsPrompted] = useState(false);

    useImperativeHandle(ref, () => ({
        prompt: () => {
            if (isPrompted) {
                return;
            }

            setIsPrompted(true);
            setTimeout(() => setIsPrompted(false), 850);

            opacity.value = withSequence(
                withTiming(1, {
                    duration: 250
                }),
                withDelay(
                    350,
                    withTiming(0, {
                        duration: 250
                    })
                )
            )

            animatedSize.value = withSequence(
                withTiming(size, {
                    duration: 250
                }),
                withDelay(
                    350,
                    withTiming(0, {
                        duration: 250
                    })
                )
            )
        }
    }));

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value
    }));

    const animatedSvgProps = useAnimatedProps(() => ({
        width: animatedSize.value,
        heigth: animatedSize.value
    }));

    return (
        <Animated.View style={[animatedStyle, style]}>
            <AnimatedSvg width={size} height={size} animatedProps={animatedSvgProps} viewBox={`0 0 24 24`}>
                <Path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
                    fill="white" />
            </AnimatedSvg>
        </Animated.View>
    );
});

export default LikePrompt;