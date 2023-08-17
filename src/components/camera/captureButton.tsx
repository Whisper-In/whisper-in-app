import { Pressable, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native";
import { Circle, Svg } from "react-native-svg";

export default function CaptureButton({ style, onPress, size = 80, onLongPress, onPressOut }
    : { style?: ViewStyle, onPress?: () => void, onLongPress?: () => void, onPressOut?: () => void, size?: number }) {
    const gap = 15;
    const strokeWidth = 3;
    const outerSize = size - strokeWidth / 2;
    const outerRadius = outerSize / 2 - strokeWidth / 2;
    const outerPos = outerRadius + strokeWidth / 2;
    const innerSize = outerSize - gap;
    const innerRadius = innerSize / 2;
    const innerPos = innerRadius;

    return (
        <View style={{
            position: "relative"
        }}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Circle cx={outerPos} cy={outerPos}
                    r={outerRadius}
                    stroke="white"
                    strokeWidth={strokeWidth}
                    fillOpacity={0}
                    strokeOpacity={0.5} />
            </Svg>

            <TouchableHighlight style={{
                borderRadius: 999,
                position: "absolute",
                top: gap / 2,
                left: gap / 2
            }}
                underlayColor="#0003"
                onPress={onPress}
                onLongPress={onLongPress}
                onPressOut={onPressOut}
            >
                <Svg width={innerSize} height={innerSize} viewBox={`0 0 ${innerSize} ${innerSize}`}>
                    <Circle cx={innerPos} cy={innerPos} r={innerRadius} fill="white" />
                </Svg>
            </TouchableHighlight>
        </View>
    );
}