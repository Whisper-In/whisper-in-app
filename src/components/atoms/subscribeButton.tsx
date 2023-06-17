import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function SubscribeButton(props: { price: number, isSubscribed: boolean, onPress?: () => void, style?: ViewStyle }) {
    const theme = useTheme();

    return (
        <TouchableOpacity disabled={props.isSubscribed} onPress={props.onPress}>
            <View style={{
                justifyContent: "space-between",
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
                            <Text style={{ flexGrow: 1, color: theme.colors.onPrimary}}>Subscribe</Text>

                            <Text style={{color: theme.colors.onPrimary}}>{props.price ? `$${props.price}` : "FREE"}</Text>
                        </>
                        :
                        <Text style={{color: theme.colors.onSecondary}}>Subscribed</Text>}
                </View>
            </View>
        </TouchableOpacity>
    )
}