import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

export default function NavBarHeaderRightChatPage(props: HeaderButtonProps & {
    onAudioRepliesToggle?: () => void,
    isAudioRepliesOff?: boolean
}) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
            <IconButton icon={!props.isAudioRepliesOff ? 'account-voice' : 'account-voice-off'} style={{ margin: 0 }} onPress={props.onAudioRepliesToggle} />
        </View>
    );
}