import { NavigationContainer } from "@react-navigation/native";
import ActivityIndicator from "./src/components/atoms/activityIndicator";
import HomeStackNavigator from "./src/navigation/homeStackNavigator";
import { useAppSelector } from "./src/store/store";
import { darkTheme, lightTheme } from "./themes";
import {
    Provider as PaperProvider,
} from "react-native-paper";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AppBodyContainer() {
    const isDarkMode = useAppSelector((state) => state.app.darkMode);
    const theme = !isDarkMode ? lightTheme : darkTheme;

    return (
        <>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <PaperProvider theme={theme}>
                    <ActivityIndicator />

                    <NavigationContainer
                        theme={{
                            dark: theme.dark,
                            colors: {
                                background: theme.colors.background,
                                primary: theme.colors.primary,
                                text: theme.colors.onSurface,
                                card: theme.colors.surface,
                                border: theme.colors.outline,
                                notification: theme.colors.tertiary,
                            },
                        }}
                    >
                        <HomeStackNavigator />
                    </NavigationContainer>
                </PaperProvider>
            </View>
        </>
    );
}