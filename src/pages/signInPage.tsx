import { useFonts } from "expo-font";
import {
  Alert,
  Linking,
  StyleSheet,
  StyleSheetProperties,
  View,
  ViewStyle,
} from "react-native";
import { Button, shadow, Text, useTheme } from "react-native-paper";
import { Style } from "util";
import GoogleSignInButton from "../components/atoms/googleSignInButton";
import * as Google from "expo-auth-session/providers/google";
import { HomePageNavigationProp } from "../navigation/types";
import { useCallback, useEffect } from "react";
import { REACT_APP_WHISPER_SERVICE_BASEURL } from "@env";
import { stringify } from "querystring";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/slices/user/index";
import { IUserDto } from "../store/dtos/user.dtos";

export default function SignInPage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const theme = useTheme();
  const [fontsLoaded] = useFonts({
    Condiment: require("../assets/fonts/Condiment-Regular.ttf"),
  });

  const dispatch = useAppDispatch();

  const handleOpenURL = (event: { url: string }) => {
    const url = new URL(decodeURI(event.url));
    const params = new URLSearchParams(url.search);

    const userString = params.get("user");
    const user: IUserDto = userString ? JSON.parse(userString) : {};

    const token = params.get("token");

    if (user != null && token?.length) {
      dispatch(
        setUser({
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          token,
        })
      );
    } else {
      Alert.alert("Login Failed.", "Failed to login. Please try again.");
    }
  };

  useEffect(() => {
    Linking.addEventListener("url", handleOpenURL);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          marginTop: 150,
        }}
      >
        <View>
          <Text style={{ ...style["logo-title"], color: theme.colors.primary }}>
            Whisperin
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={style.login}>Login Now</Text>
        <GoogleSignInButton
          onPress={() =>
            Linking.openURL(
              `${REACT_APP_WHISPER_SERVICE_BASEURL}/auth/google/login`
            )
          }
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    marginLeft: 14,
    fontStyle: "italic",
  },
  "logo-title": {
    fontFamily: "Condiment",
    fontSize: 64,
  },
  login: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
