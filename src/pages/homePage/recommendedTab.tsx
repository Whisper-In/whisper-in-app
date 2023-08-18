import { useEffect, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Platform, StatusBar, View } from "react-native";
import { ICreatorProfileDto, IPostDto } from "../../store/dtos/content.dtos";
import * as postService from "../../store/services/postService";
import { useTheme } from "react-native-paper";
import RecommendedTypeButtons, { RecommendedType } from "../../components/home/recommended/recommendedTypeButtons";
import { isFulfilled } from "../../utils/promise";
import { HomePageNavigationProp } from "../../navigation/types";
import { showToast } from "../../utils/toast";
import RecommendedPostList from "../../components/home/recommended/recommendedPostList";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function RecommendedTab({ navigation }
    : { navigation: HomePageNavigationProp }) {
    const [forYouPosts, setForYouPosts] = useState<IPostDto[]>([]);
    const [followingPosts, setFollowingPosts] = useState<IPostDto[]>([]);
    const [recommendedType, setRecommendedType] = useState<RecommendedType>(RecommendedType.FORYOU);
    const [isLoading, setIsLoading] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const theme = useTheme();
    const bottomBarHeight = useBottomTabBarHeight();

    const postsPerLoad = 15;
    const maxFilterPostIDs = 100;

    let { width, height } = Dimensions.get("window");
    const statusBarHeight = (StatusBar.currentHeight ?? 0);
    const statusBarHeightOffset = 10;
    height -= Math.max(statusBarHeight - statusBarHeightOffset, 0) + (Platform.OS == "ios" ? bottomBarHeight : 0);

    useEffect(() => {
        const getRecommendedPosts = async () => {
            try {
                const forYouQuery = postService.getRecommendedPosts(postsPerLoad);
                const followingQuery = postService.getRecommendedPosts(postsPerLoad, undefined, true);

                const results = await Promise.allSettled([
                    forYouQuery,
                    followingQuery
                ]);

                if (isFulfilled(results[0])) {
                    setForYouPosts(results[0].value);
                }

                if (isFulfilled(results[1])) {
                    setFollowingPosts(results[1].value);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getRecommendedPosts();
    }, []);

    useEffect(() => {
        const focusCallback = () => {
            setIsBlur(false);
        };

        navigation.addListener("focus", focusCallback);

        const blurCallback = () => {
            setIsBlur(true);
        }

        navigation.addListener("blur", blurCallback);

        return () => {
            navigation.removeListener("focus", focusCallback);
            navigation.removeListener("blur", blurCallback);
        }
    }, [navigation]);

    const loadMore = async (recommendedType: RecommendedType) => {
        if (isLoading) {
            return;
        }

        try {
            const showFollowingOnly = recommendedType == RecommendedType.FOLLOWING;
            let filterPostIds = showFollowingOnly ? followingPosts.map(p => p._id) : forYouPosts.map(p => p._id);
            filterPostIds.splice(0, filterPostIds.length - maxFilterPostIDs);

            setIsLoading(true);
            const results = await postService.getRecommendedPosts(postsPerLoad, filterPostIds, showFollowingOnly);
            setIsLoading(false);

            if (recommendedType == RecommendedType.FORYOU) {
                const newForYouPosts = forYouPosts.concat(results);
                setForYouPosts(newForYouPosts);
            } else if (recommendedType == RecommendedType.FOLLOWING) {
                const newFollowingPosts = followingPosts.concat(results);
                setFollowingPosts(newFollowingPosts);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const navigateToProfile = (creator: ICreatorProfileDto, isAI: boolean) => {
        navigation.navigate("Profile", {
            isAI,
            profileId: creator._id
        });
    };

    const likePost = async (postId: string) => {
        try {
            const result = await postService.likePost(postId);
        } catch (error) {
            showToast("Please try again later.", theme);
            console.log(error);
        }
    }

    return (
        <View style={{
            position: "relative",
            flex: 1
        }}>
            <RecommendedPostList posts={forYouPosts}
                height={height}
                width={width}
                isHidden={recommendedType != RecommendedType.FORYOU || isBlur}
                onScrollEnd={() => loadMore(recommendedType)}
                onAvatarPress={navigateToProfile}
                onLikePress={likePost} />

            <RecommendedPostList posts={followingPosts}
                height={height}
                width={width}
                isHidden={recommendedType != RecommendedType.FOLLOWING || isBlur}
                onScrollEnd={() => loadMore(recommendedType)}
                onAvatarPress={navigateToProfile}
                onLikePress={likePost} />

            <View style={{
                position: "absolute",
                alignItems: "center",
                width: "100%",
                top: 70
            }} >
                <RecommendedTypeButtons
                    recommendedType={recommendedType}
                    onUpdate={(recommendedType) => {
                        setRecommendedType(recommendedType);
                    }} />
            </View>
        </View>
    );
}