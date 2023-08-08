import { useFonts } from "expo-font";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import GoogleSignInButton from "../components/atoms/googleSignInButton";
import { HomePageNavigationProp } from "../navigation/types";
import { useEffect, useState } from "react";
import { REACT_APP_WHISPERIN_SERVICE_BASEURL } from "@env";
import { useAppDispatch } from "../store/store";
import { setUser } from "../store/slices/user/index";
import { IUserProfileDto } from "../store/dtos/profile.dtos";
import { Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import AppleSignInButton from "../components/atoms/appleSignInButton";
import BottomPopup from "../components/molecules/bottomPopup";
import { updateUserProfile, updateUserTnC } from "../store/services/userService";
import TermsAndConditions from "../components/content/termsAndConditions";

export default function SignInPage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const [isShowTnCModal, setShowTnCModal] = useState(false);
  const [userData, setUserData] = useState<{ user: IUserProfileDto, token: string | null }>();

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const handleOpenURL = (event: { url: string }) => {
    const url = new URL(decodeURI(event.url));
    const params = new URLSearchParams(url.search);

    const userString = params.get("user");
    const user: IUserProfileDto = userString ? JSON.parse(userString) : {};
    const token = params.get("token");

    setUserData({
      user,
      token,
    });

    if (!user.isAgreeTnC) {
      setShowTnCModal(true);
    }
  };

  const loginUser = () => {
    if (userData?.user != null && userData?.token?.length) {
      dispatch(
        setUser({
          id: userData?.user._id,
          name: userData?.user.name,
          email: userData?.user.email,
          aboutMe: userData?.user.aboutMe,
          avatar: userData?.user.avatar,
          token: userData.token,
        })
      );
    } else {
      Alert.alert("Login Failed.", "Failed to login. Please try again.");
    }
  }

  const agreeTnC = async () => {
    if (userData?.user != null) {

      try {
        await updateUserTnC(userData?.user._id, true); 
      } catch (error) {
        console.log(error);
      }      
    }

    setShowTnCModal(false);
    loginUser();
  }

  useEffect(() => {
    if (userData?.user.isAgreeTnC) {
      loginUser();
    }
  }, [userData]);

  if (Platform.OS == "android") {
    useEffect(() => {
      Linking.addEventListener("url", handleOpenURL);
    }, []);
  }

  const openGoogleLogin = async () => {
    const result: any = await WebBrowser.openAuthSessionAsync(`${REACT_APP_WHISPERIN_SERVICE_BASEURL}/auth/google/login`);

    if (Platform.OS == "ios") {
      handleOpenURL({ url: result.url });
    }
  };

  const openAppleLogin = async () => {
    const result: any = await WebBrowser.openAuthSessionAsync(`${REACT_APP_WHISPERIN_SERVICE_BASEURL}/auth/apple/login`);

    if (Platform.OS == "ios") {
      handleOpenURL({ url: result.url });
    }
  }

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

        <AppleSignInButton style={{ marginBottom: 15 }} onPress={() => openAppleLogin()} />

        <GoogleSignInButton onPress={() => openGoogleLogin()} />
      </View>

      <BottomPopup
        header="Terms and Conditions"
        isShowModal={isShowTnCModal}
        showOk={true}
        okText="Agree"
        onOk={() => {
          agreeTnC();          
        }}
        showCancel={true}
        cancelText="Cancel"
        onCancel={() => setShowTnCModal(false)}
      >
        <TermsAndConditions/>
      </BottomPopup>
    </View>
  );
}