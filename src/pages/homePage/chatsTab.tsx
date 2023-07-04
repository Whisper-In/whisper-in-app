import { Alert, View } from "react-native";
import ChatHistoryList from "../../components/organisms/chatHistoryList";
import { FETCH_CHATS_RETRY_COUNT, FETCH_CHATS_RETRY_INTERVAL } from "../../constants";
import { fetchChats } from "../../store/slices/chats/thunks";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { HomePageNavigationProp } from "../../navigation/types";
import { logoutUser } from "../../store/slices/user";

export default function ChatsTab({ navigation }: { navigation: HomePageNavigationProp }) {
    const me = useAppSelector((state) => state.user.me!);
    const chats = useAppSelector((state) => state.chats.chats);
    let retries = 0

    const dispatch = useAppDispatch();

    const dispathcFetchChats = () => {
        dispatch(fetchChats(me.id)).catch(error => {
            console.log(error)
            if (retries < FETCH_CHATS_RETRY_COUNT) {
                setTimeout(() => {
                    retries++;
                    dispathcFetchChats()
                }, FETCH_CHATS_RETRY_INTERVAL);
            } else {
                Alert.alert("Unable to Retrieve Chats", "Please relogin or restart the app.");                
            }
        });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', (e) => {
            dispathcFetchChats()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View>
            <ChatHistoryList
                data={chats}
                onPress={(chatId, contactId, contactName, isAI, contactAvatar) =>
                    navigation.navigate("Chat", {
                        chatId,
                        contactId: contactId,
                        name: contactName,
                        isAI,
                        avatar: contactAvatar,
                    })
                }
                onAvatarPress={(profileId: string, isAI: boolean) => navigation.navigate("Profile", { profileId, isAI })}
            />
        </View>
    );
}