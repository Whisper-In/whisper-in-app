import { Dimensions, View } from "react-native";
import { HomePageNavigationProp, HomeStackNavigatorParamList } from "../../navigation/types";
import Post from "../../components/post";
import { RouteProp, useRoute } from "@react-navigation/native";
import * as postService from "../../store/services/postService";
import { showToast } from "../../utils/toast";
import { useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { IPostDto } from "../../store/dtos/content.dtos";

export default function ViewPostPage({ navigation }
    : { navigation: HomePageNavigationProp }) {
    const theme = useTheme();
    const { width } = Dimensions.get("window");
    const route = useRoute<RouteProp<HomeStackNavigatorParamList, "ViewPost">>();
    const [post, setPost] = useState<IPostDto | undefined>(route.params.post);
    const { postId, showAvatar } = route.params;

    useEffect(() => {
        if (!post && postId) {
            console.log(postId)
            postService.getPostDetails(postId).then((result) => {
                setPost(result);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    const likePost = async () => {
        try {
            if (post) {
                const result = await postService.likePost(post._id);
            }
        } catch (error) {
            showToast("Please try again later.", theme);
            console.log(error);
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "black"
        }}>
            {
                post &&
                <Post post={post}
                    shouldPlay={true}
                    hideAvatar={!showAvatar}
                    width={width}
                    height="100%"
                    onLikePress={likePost} />
            }
        </View>
    )
}