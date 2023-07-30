import { useFonts } from "expo-font";
import {
  Alert,
  Linking,
  StyleSheet,
  StyleSheetProperties,
  View,
  ViewStyle,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import GoogleSignInButton from "../components/atoms/googleSignInButton";
import { HomePageNavigationProp } from "../navigation/types";
import { useEffect } from "react";
import { REACT_APP_WHISPER_SERVICE_BASEURL } from "@env";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/slices/user/index";
import { IUserProfileDto } from "../store/dtos/profile.dtos";
import { Image } from "react-native";
import * as WebBrowser from "expo-web-browser";

export default function SignInPage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const handleOpenURL = (event: { url: string }) => {
    const url = new URL(decodeURI(event.url));
    const params = new URLSearchParams(url.search);

    const userString = params.get("user");
    const user: IUserProfileDto = userString ? JSON.parse(userString) : {};

    const token = params.get("token");

    if (user != null && token?.length) {
      dispatch(
        setUser({
          id: user._id,
          name: user.name,
          email: user.email,
          aboutMe: user.aboutMe,
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

  const openGoogleLogin = () => {    
    WebBrowser.openAuthSessionAsync(`${REACT_APP_WHISPER_SERVICE_BASEURL}/auth/google/login`);    
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <View>
          <Image
            style={{ width: 300, height: 50, resizeMode: "contain" }}
            source={require("../assets/images/icons/icon-full.png")} />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Text style={{
          ...theme.fonts.titleLarge,
          color: theme.colors.onSurface,
          fontWeight: "900",
          marginBottom: 14
        }}>Login Now</Text> */}
        
        <GoogleSignInButton onPress={() => openGoogleLogin()} />
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
    fontFamily: "MadeTommyBold",
    fontWeight: "900",
    fontSize: 48,
  }
});
