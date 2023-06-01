import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar, Avatar, useTheme } from "react-native-paper";
import CustomNavigationBarAvatar from "../atoms/customNavigationBarAvatar";

export default function CustomNavigationBar(
  props: NativeStackHeaderProps & { onAvatarPress?: () => void }
) {
  const routeParams = props.route?.params as any;
  const theme = useTheme();

  return (
    <Appbar.Header>
      {props.back && (
        <Appbar.BackAction
          onPress={props.navigation.goBack}
        />
      )}
      {routeParams?.avatar && (
        <CustomNavigationBarAvatar
          imgSrc={routeParams.avatar}
          onPress={() => {
            if (props.onAvatarPress) {
              props.onAvatarPress();
            }
          }}
        />
      )}
      <Appbar.Content
        titleStyle={{
          fontSize: 20,
        }}
        title={props.options.headerTitle!.toString()}
      />
    </Appbar.Header>
  );
}
