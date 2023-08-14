import { Alert, FlatList, Linking, View } from "react-native";
import { Avatar, List, Switch, Text, useTheme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../store/store";
import SettingListItem from "../../components/home/settingListItem";
import { setDarkMode } from "../../store/slices/app";
import { HomePageNavigationProp } from "../../navigation/types";
import { REACT_APP_WHISPERIN_URL } from "@env";
import { useEffect } from "react";
import { fetchUserProfile } from "../../store/slices/user/thunks";
import * as WebBrowser from "expo-web-browser";

export default function SettingsTab({ navigation }: { navigation: HomePageNavigationProp }) {
    const theme = useTheme();
    const me = useAppSelector((state) => state.user.me);
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector((state) => state.app.darkMode);
    const onToggleDarkMode = () => { dispatch(setDarkMode(!isDarkMode)) };

    const name = me!.name ?? me!.email?.split("@")[0]!;

    const openAboutPage = () => {
        WebBrowser.openBrowserAsync(REACT_APP_WHISPERIN_URL)
            .catch((error) => {
                Alert.alert("Failed to redirect to About page.");
            });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', (e) => {
            dispatch(fetchUserProfile(me!.id));
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 0.5,
                padding: 24,
                borderBottomColor: theme.colors.secondary,
            }}>
                {
                    me?.avatar ?
                        <Avatar.Image source={{ uri: me?.avatar }} style={{
                            marginRight: 24
                        }} />
                        : <Avatar.Text label={name[0].toUpperCase()}
                            labelStyle={{ color: theme.colors.onPrimary }}
                            style={{
                                backgroundColor: theme.colors.primary,
                                marginRight: 24,
                            }} />
                }

                <View style={{ flex: 1 }}>
                    <Text style={{ ...theme.fonts.titleLarge }}>{name}</Text>

                    {
                        me?.aboutMe &&
                        <Text style={{ ...theme.fonts.bodySmall, marginTop: 10 }}>{me?.aboutMe}</Text>
                    }
                </View>
            </View>

            <View style={{ paddingVertical: 8 }}>
                <FlatList
                    data={[
                        {
                            icon: "power-sleep",
                            label: "Dark Mode",
                            rightIcon: <Switch value={isDarkMode} onValueChange={onToggleDarkMode} />
                        },
                        {
                            icon: "account-box",
                            label: "Account",
                            rightIcon: "chevron-right",
                            onPress: () => navigation.navigate("Account")
                        },
                        {
                            icon: "information",
                            label: "About",
                            onPress: () => openAboutPage()
                        }]}
                    renderItem={({ item }) => <SettingListItem
                        icon={item.icon}
                        label={item.label}
                        rightIcon={item.rightIcon}
                        onPress={item.onPress} />}
                >
                </FlatList>
            </View>
        </View>
    )
}