import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomNavigationBar from "../components/organisms/customNavigationBar";
import ChatPage from "../pages/chatPage";
import HomePage from "../pages/homePage";
import { HomeStackNavigatorParamList } from "./types";
import appJson from "../../app.json";
import { useAppSelector } from "../store/store";
import SignInPage from "../pages/signInPage";

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function HomeStackNavigator() {
  const isSignedIn = useAppSelector(
    (state) => state.user?.token?.length != null
  );

  if (isSignedIn) {
    return (
      <HomeStack.Navigator
        screenOptions={{
          orientation: "portrait",
          headerTitle: appJson.expo.name,
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      >
        <HomeStack.Screen name="Home" component={HomePage} />
        <HomeStack.Screen
          name="Chat"
          component={ChatPage}
          options={({ route }) => ({ headerTitle: route.params.name })}
        />
      </HomeStack.Navigator>
    );
  } else {
    return (
      <HomeStack.Navigator
        screenOptions={{
          orientation: "portrait",
          headerShown: false
        }}
      >
        <HomeStack.Screen name="SignIn" component={SignInPage} />       
      </HomeStack.Navigator>
    );
  }
}
