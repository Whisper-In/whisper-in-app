import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatPage from "../pages/chatPage";
import HomePage from "../pages/homePage";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "./types";
import appJson from "../../app.json";
import { useAppSelector } from "../store/store";
import SignInPage from "../pages/signInPage";
import AccountPage from "../pages/accountPage";
import { useNavigation } from "@react-navigation/native";
import SearchPage from "../pages/searchPage";
import NavBarBackButton from "../components/molecules/navBarBackButton";
import NavBarHeaderRight from "../components/molecules/navBarHeaderRight";
import ProfilePage from "../pages/profilePage";

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export default function HomeStackNavigator() {
  const navigation = useNavigation<HomePageNavigationProp>();

  const isSignedIn = useAppSelector(
    (state) => state.user?.token?.length != null
  );      

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
          options={{
            headerShown: false
          }}
        />
        <HomeStack.Screen
          name="Chat"
          component={ChatPage}
          options={({ route }) => ({
            headerTitle: route.params.name,
            headerLeft: (props) => <NavBarBackButton 
            {...props} 
            avatar={route.params.avatar} 
            onPress={() => navigation.goBack()} />,
          })}
        />
        <HomeStack.Screen name="Account" component={AccountPage}
          options={{
            headerTitle: "Account",
          }} />
        <HomeStack.Screen name="Search" component={SearchPage} />
        <HomeStack.Screen
          name="Profile"
          component={ProfilePage}
          options={({ route }) => ({            
            headerTitle: "",
            headerTransparent: true
          })} />
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
