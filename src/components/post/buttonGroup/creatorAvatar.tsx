import { Pressable, View, ViewStyle } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";
import { Circle, Svg } from "react-native-svg";

export default function CreatorAvatar({ style, uri, size = 60, isFollowing, onPress }
    : { style?: ViewStyle, uri: string, size?: number, isFollowing?: boolean, onPress?: () => void }) {
    const theme = useTheme();
    const plusIconSize = 20;
    const plusIconRadius = plusIconSize / 2;

    return (
        <Pressable style={[{
            borderWidth: 3,
            borderRadius: 999,
            borderColor: "white",
            position: "relative"
        }, style]} onPress={onPress}>
            <Avatar.Image source={{ uri }}
                size={size} />

            <View style={{
                position: "absolute",
                bottom: -plusIconRadius,
                width: "100%",
                alignItems: "center"
            }}>
                {
                    !isFollowing &&
                    <>
                        <Svg style={{
                            position: "absolute",
                            left: "50%",
                            transform: [{ translateX: -plusIconRadius }]
                        }}>
                            <Circle cx={plusIconRadius} cy={plusIconRadius} r={plusIconRadius} fill={theme.colors.primary} />
                        </Svg>

                        <Icon source="plus" size={plusIconSize} color="white" />
                    </>
                }
            </View>
        </Pressable>
    )
}