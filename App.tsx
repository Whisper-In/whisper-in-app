import "react-native-url-polyfill/auto";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import HomeStackNavigator from "./src/navigation/homeStackNavigator";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <PaperProvider>
              <HomeStackNavigator />
            </PaperProvider>
          </NavigationContainer>
        </PersistGate>
      </ReduxProvider>
      <StatusBar style="auto" />
    </>
  );
}
