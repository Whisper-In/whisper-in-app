import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomNavigationBar from "../components/organisms/customNavigationBar";
import ChatPage from "../pages/chatPage";
import HomePage from "../pages/homePage";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "./types";
import appJson from "../../app.json";
import { useAppSelector } from "../store/store";
import SignInPage from "../pages/signInPage";
import CustomNavigationBarAvatar from "../components/atoms/customNavigationBarAvatar";
import SettingsPage from "../pages/settingsPage";
import { useNavigation } from "@react-navigation/native";

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function HomeStackNavigator() {
  const navigation = useNavigation<HomePageNavigationProp>();

  const isSignedIn = useAppSelector(
    (state) => state.user?.token?.length != null
  );

  const me = useAppSelector((state) => state.user?.me);

  if (isSignedIn) {
    return (
      <HomeStack.Navigator
        screenOptions={{
          orientation: "portrait",
          headerTitle: appJson.expo.name,
        }}
      >
        <HomeStack.Screen
          name="Home"
          component={HomePage}
          options={({ route }) => ({
            header: (props) => (
              <CustomNavigationBar
                {...props}
                onAvatarPress={() => {
                  navigation.navigate("Settings");
                }}
              />
            ),
          })}
          initialParams={{ avatar: me?.avatar }}
        />
        <HomeStack.Screen
          name="Chat"
          component={ChatPage}
          options={({ route }) => ({
            headerTitle: route.params.name,
            header: (props) => <CustomNavigationBar {...props} />,
          })}
        />
        <HomeStack.Screen name="Settings" component={SettingsPage} 
        options={{
          headerTitle: "Settings",          
        }}/>
      </HomeStack.Navigator>
    );
  } else {
    return (
      <HomeStack.Navigator
        screenOptions={{
          orientation: "portrait",
          headerShown: false,
        }}
      >
        <HomeStack.Screen name="SignIn" component={SignInPage} />
      </HomeStack.Navigator>
    );
  }
}
