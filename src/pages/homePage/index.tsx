import { HomePageNavigationProp as HomePageNavigationProp } from "../../navigation/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import SettingsTab from "./settingsTab";
import Icon from "react-native-paper/src/components/Icon";
import NavBarHeaderRight from "../../components/nav/navBarHeaderRight";
import { TabScreen } from "react-native-paper-tabs";
import { useTheme } from "react-native-paper/src/core/theming";
import { Image, View } from "react-native";
import CreatePostButton from "../../components/home/createPostButton";
import EmptyPage from "../emptyPage";
import { useAppSelector } from "../../store/store";
import SearchTab from "./searchTab";
import RecommendedTab from "./recommendedTab";
import ChatsTab from "./chatsTab";

const Tab = createBottomTabNavigator();

export default function HomePage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const theme = useTheme();
  const me = useAppSelector((state) => state.user.me);

  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: theme.colors.onBackground
    }}>

      <Tab.Screen
        name="Recommended"
        component={RecommendedTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => <Icon source="home" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          headerTitle: "Search",
          tabBarIcon: ({ focused, color, size }) => <Icon source="magnify" size={size} color={color} />,
        }}
      />

      {
        me?.linkedAIProfile &&
        <Tab.Screen
          name="Create Post"
          component={EmptyPage}
          options={{
            headerTitle: "",
            tabBarIcon: ({ focused, color, size }) =>
              <CreatePostButton onPress={() => { navigation.navigate("Camera") }} color={color} />
          }}
        />
      }

      <Tab.Screen
        name="Chats"
        component={ChatsTab}
        options={{
          headerTitle: "Chats",
          tabBarIcon: ({ focused, color, size }) => <Icon source="chat" size={size} color={color} />,
        }}
      />

      {
        !me?.linkedAIProfile ?
          <Tab.Screen
            name="Settings"
            component={SettingsTab}
            options={{
              headerTitle: "Settings",
              tabBarIcon: ({ focused, color, size }) => <Icon source="cog" size={size} color={color} />,
            }}
          />
          :
          <Tab.Screen
            name="Me"
            component={SettingsTab}
            options={{
              headerTitle: "Me",
              tabBarIcon: ({ focused, color, size }) => <Icon source="account" size={size} color={color} />,
            }}
          />
      }
    </Tab.Navigator>
  );
}
