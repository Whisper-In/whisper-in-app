import { TouchableOpacity, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ChatFeature } from "../../store/states/chatsState";
import Icon from "react-native-paper/src/components/Icon";

export default function SubscribeButton(props: {
    price: number,
    isSubscribed: boolean,
    features?: ChatFeature[],
    disabled?: boolean,
    onPress?: () => void,
    style?: ViewStyle
}) {
    const theme = useTheme();

    const color = theme.colors.onPrimary;

    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
            <View style={{
                justifyContent: "space-between",
                opacity: props.disabled ? .5 : 1,
                backgroundColor: !props.isSubscribed ? theme.colors.primary : theme.colors.surfaceDisabled,
                borderRadius: 9999,
                flexDirection: "row",
                paddingVertical: 10,
                paddingHorizontal: 20,
                width: "100%",
                ...props.style
            }}>
                <View style={{
                    flexGrow: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                    {!props.isSubscribed ?
                        <>
                            <Text style={{ flexGrow: 1, color }}>Subscribe</Text>
                            {
                                props.features?.includes(ChatFeature.AUDIO) &&
                                <View style={{ marginRight: 5 }}>
                                    <Icon source="account-voice" size={20} color={color} />
                                </View>
                            }
                            <Text style={{ color }}>{props.price ? `$${props.price}` : "FREE"}</Text>
                        </>
                        :
                        <Text style={{ color: theme.colors.onSecondary }}>Subscribed</Text>}
                </View>
            </View>
        </TouchableOpacity>
    )
}