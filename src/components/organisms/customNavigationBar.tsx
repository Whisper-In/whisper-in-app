import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar, Avatar, useTheme } from "react-native-paper";
import CustomNavigationBarAvatar from "../atoms/customNavigationBarAvatar";

export default function CustomNavigationBar(props: NativeStackHeaderProps) {
  const routeParams = props.route?.params as any;
  const theme = useTheme();

  return (
    <Appbar.Header>
      {props.back && (
        <Appbar.BackAction
          style={{
            margin: 0,
          }}
          onPress={props.navigation.goBack}
        />
      )}
      {routeParams?.avatar && (
        <CustomNavigationBarAvatar
          style={{
            marginRight: 10,
          }}
          imgSrc={routeParams.avatar}
          size={35}
        />
      )}
      <Appbar.Content        
        title={props.options.headerTitle?.toString()}
      />
    </Appbar.Header>
  );
}
