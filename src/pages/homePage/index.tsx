import { HomePageNavigationProp as HomePageNavigationProp } from "../../navigation/types";
import ChatsScreen from "./chatsTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import SettingsTab from "./settingsTab";
import NavBarHeaderRight from "../../components/molecules/navBarHeaderRight";
import Icon from "react-native-paper/src/components/Icon";

const Tab = createBottomTabNavigator();

export default function HomePage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {

  return (
    <Tab.Navigator screenOptions={{
      headerRight: () => <NavBarHeaderRight onSearchPress={() => navigation.navigate("Search")} />,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 52,
        borderTopWidth: 0
      },
    }}>
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerTitle: "Recent Chats",
          tabBarIcon: ({ focused, color, size }) => <Icon source="chat" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsTab}
        options={{
          headerTitle: "Settings",
          tabBarIcon: ({ focused, color, size }) => <Icon source="account-circle" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
