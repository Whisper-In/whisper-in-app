import "react-native-url-polyfill/auto";
import {
  NavigationContainer,
  DefaultTheme as DefaultNavTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  DefaultTheme,
  MD3Theme,
  Provider as PaperProvider,
  Text,
} from "react-native-paper";
import { Provider as ReduxProvider, useStore } from "react-redux";
import HomeStackNavigator from "./src/navigation/homeStackNavigator";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { View } from "react-native";
import { darkTheme, lightTheme } from "./themes";

export default function App() {  
  const isDarkMode = true; //TODO: Change with states
  const theme = !isDarkMode ? lightTheme : darkTheme;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <PaperProvider theme={theme}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
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
          </PersistGate>
        </ReduxProvider>
      </PaperProvider>
      <StatusBar style="auto" />
    </View>
  );
}
