import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store, } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";
import appJson from "./app.json";
import { REACT_APP_STRIPE_PUBLISHABLE_KEY } from "@env";
import AppBodyContainer from "./AppBodyContainer";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const stripePublishableKey = REACT_APP_STRIPE_PUBLISHABLE_KEY;

export default function App() {
  const [isLoaded] = useFonts({
    "PlusJakartaSans-Regular": require("./src/assets/fonts/PlusJakartaSans-Regular.ttf")
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={handleOnLayout}>
      <StripeProvider
        publishableKey={stripePublishableKey}
        urlScheme={appJson.expo.scheme}
        merchantIdentifier={`merchant.com.${appJson.expo.slug}`}
      >
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppBodyContainer />
          </PersistGate>
        </ReduxProvider>
      </StripeProvider>
    </View>
  );
}
