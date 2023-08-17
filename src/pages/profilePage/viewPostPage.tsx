import { Dimensions, View } from "react-native";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "../../navigation/types";
import Post from "../../components/post";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function ViewPostPage({ navigation }
    : { navigation: HomePageNavigationProp }) {
    const { width } = Dimensions.get("window");
    const route = useRoute<RouteProp<HomeStackNavigatorParamList, "ViewPost">>();
    const post = route.params.post;

    return (
        <View style={{
            flex: 1
        }}>
            <Post post={post}
                shouldPlay={true}
                hideAvatar={true}
                width={width}
                height="100%" />
        </View>
    )
}