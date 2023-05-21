import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar, Avatar, MD3Colors } from "react-native-paper";
import CustomNavigationBarAvatar from "../atoms/customNavigationBarAvatar";

export default function CustomNavigationBar(props: NativeStackHeaderProps) {
  const routeParams = props.route?.params as any;
  
  return (
    <Appbar.Header
      style={{
        backgroundColor: MD3Colors.primary50,
      }}
      elevated={true}
    >
      {props.back && (
        <Appbar.BackAction
          style={{
            margin: 0,
          }}
          color={MD3Colors.primary100}
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
        color={MD3Colors.primary100}
        title={props.options.headerTitle?.toString()}
      />
    </Appbar.Header>
  );
}
