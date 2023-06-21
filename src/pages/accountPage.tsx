import { View } from "react-native";
import { List, useTheme } from "react-native-paper";
import { HomePageNavigationProp } from "../navigation/types";
import { logoutUser, setUser } from "../store/slices/user/index";
import { useAppDispatch } from "../store/store";

export default function AccountPage({
  navigation,
}: {
  navigation: HomePageNavigationProp;
}) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <View>
      <List.Section>
        <List.Item
          title="Logout"
          left={(props) => <List.Icon {...props} icon="logout" color={theme.colors.primary}></List.Icon>}
          onPress={logout}
        ></List.Item>
      </List.Section>
    </View>
  );
}
