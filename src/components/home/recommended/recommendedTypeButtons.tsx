import { PropsWithChildren } from "react";
import { Pressable, TextStyle, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

function TextButton({ style, isActive, ...props }
    : { style?: TextStyle, isActive?: boolean } & PropsWithChildren) {
    return (
        <Text style={[{
            fontSize: 16,
            fontStyle: "italic",
            color: "white",
            opacity: isActive ? 1 : 0.8
        }, style]}>
            {props.children}
        </Text>
    );
}

export enum RecommendedType {
    FOLLOWING, FORYOU
}

export default function RecommendedTypeButtons({ style, recommendedType = RecommendedType.FORYOU, onUpdate: onUpdate }
    : { style?: ViewStyle, recommendedType?: RecommendedType, onUpdate?: (recommendedType: RecommendedType) => void }) {
    return (
        <View style={[{
            flexDirection: "row",
            gap: 20
        }, style]}>
            <Pressable onPress={() => onUpdate && onUpdate(RecommendedType.FOLLOWING)}>
                <TextButton isActive={recommendedType == RecommendedType.FOLLOWING}>
                    Following
                </TextButton>
            </Pressable>

            <Pressable onPress={() => onUpdate && onUpdate(RecommendedType.FORYOU)}>
                <TextButton isActive={recommendedType == RecommendedType.FORYOU}>For You</TextButton>
            </Pressable>
        </View>
    );
}