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
import {  useEffect } from "react";
import { REACT_APP_WHISPER_SERVICE_BASEURL } from "@env";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/slices/user/index";
import { IUserDeepLinkDto } from "../store/dtos/profile.dtos";

export default function SignInPage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const theme = useTheme();
  const [fontsLoaded] = useFonts({
    MadeTommyBold: require("../assets/fonts/MADE_TOMMY_Bold.otf"),
  });

  const dispatch = useAppDispatch();

  const handleOpenURL = (event: { url: string }) => {    
    const url = new URL(decodeURI(event.url));
    const params = new URLSearchParams(url.search);

    const userString = params.get("user");
    const user: IUserDeepLinkDto = userString ? JSON.parse(userString) : {};

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

  const openGoogleLogin = () => {        
    Linking.openURL(`${REACT_APP_WHISPER_SERVICE_BASEURL}/auth/google/login`);
  };

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
            Whisper In
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
  },
  login: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
