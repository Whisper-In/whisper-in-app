import { View } from "react-native";
import { List } from "react-native-paper";
import { HomePageNavigationProp } from "../navigation/types";
import { logoutUser, setUser } from "../store/slices/user/index";
import { useAppDispatch } from "../store/store";

export default function SettingsPage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <View>
      <List.Section>
        <List.Item
          title="Logout"
          left={(props) => <List.Icon {...props} icon="logout"></List.Icon>}
          onPress={logout}
        ></List.Item>
      </List.Section>
    </View>
  );
}
