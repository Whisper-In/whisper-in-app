import { View } from "react-native";
import {
  useTheme,
  ActivityIndicator as PaperActivityIndicator,
} from "react-native-paper";
import { useAppSelector } from "../../store/store";

export default function ActivityIndicator() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  if (isLoading) {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          flex: 1,
          height: "100%",
          width: "100%",
          zIndex: 9999,
          backgroundColor: "rgba(0,0,0,0.5)",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <PaperActivityIndicator size="large"/>
      </View>
    );
  } else {
    return <></>;
  }
}
