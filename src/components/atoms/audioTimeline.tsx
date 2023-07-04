import { View, ViewStyle } from "react-native";
import { Circle, Rect, Svg } from "react-native-svg";

export default function AudioTimeline(props:
    {
        style?: ViewStyle,
        color: string,
        seekerColor?: string,
        progress: number
    }) {
    const timelineWidth = 150;
    const timelineHeight = 3;

    const seekerRadius = 5;
    const seekerHeight = 15;
    const seekerStrokeWidth = 5;
    const seekerPosition = (timelineWidth) * Math.max(0, Math.min(1, props.progress));
    const seekerX = seekerPosition + seekerRadius + seekerStrokeWidth;
    const seekerY = seekerRadius * 1.5;

    const timelineX = seekerRadius / 2 + seekerStrokeWidth;
    const timelineY = seekerHeight / 2 - timelineHeight / 2;
    const svgWidth = timelineWidth + seekerRadius * 2 + seekerStrokeWidth * 2;

    return (
        <View style={props.style}>
            <Svg width={svgWidth} height={seekerHeight}>
                <Rect
                    width={timelineWidth}
                    height={timelineHeight}
                    x={timelineX}
                    y={timelineY}
                    fill={props.color} />

                <Circle
                    r={seekerRadius}
                    cx={seekerX}
                    cy={seekerY}
                    fill={props.seekerColor ?? props.color}
                    strokeOpacity={.5}
                    stroke={props.seekerColor}
                    strokeWidth={seekerStrokeWidth}
                />
            </Svg>
        </View>
    )
}