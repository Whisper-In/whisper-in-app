import { Dimensions, View } from "react-native";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "../../navigation/types";
import Post from "../../components/post";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as postService from "../../store/services/postService";
import { showToast } from "../../utils/toast";
import { useTheme } from "react-native-paper";

export default function ViewPostPage({ navigation }
    : { navigation: HomePageNavigationProp }) {
    const theme = useTheme();
    const { width } = Dimensions.get("window");
    const route = useRoute<RouteProp<HomeStackNavigatorParamList, "ViewPost">>();
    const post = route.params.post;

    const likePost = async () => {
        try {
            const result = await postService.likePost(post._id);
        } catch (error) {
            showToast("Please try again later.", theme);
            console.log(error);
        }
    }

    return (
        <View style={{
            flex: 1
        }}>
            <Post post={post}
                shouldPlay={true}
                hideAvatar={true}
                width={width}
                height="100%"
                onLikePress={likePost} />
        </View>
    )
}