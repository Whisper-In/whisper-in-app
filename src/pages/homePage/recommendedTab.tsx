import { useEffect, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StatusBar, View } from "react-native";
import { ICreatorProfileDto, IPostDto } from "../../store/dtos/content.dtos";
import * as postService from "../../store/services/postService";
import { useTheme } from "react-native-paper";
import RecommendedTypeButtons, { RecommendedType } from "../../components/home/recommended/recommendedTypeButtons";
import { isFulfilled } from "../../utils/promise";
import { HomePageNavigationProp } from "../../navigation/types";
import { showToast } from "../../utils/toast";
import RecommendedPostList from "../../components/home/recommended/recommendedPostList";

export default function RecommendedTab({ navigation }
    : { navigation: HomePageNavigationProp }) {
    const [forYouPosts, setForYouPosts] = useState<IPostDto[]>([]);
    const [followingPosts, setFollowingPosts] = useState<IPostDto[]>([]);
    const [recommendedType, setRecommendedType] = useState<RecommendedType>(RecommendedType.FORYOU);
    const [isLoading, setIsLoading] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const theme = useTheme();

    const postsPerLoad = 15;

    let { width, height } = Dimensions.get("window");
    const statusBarHeight = (StatusBar.currentHeight ?? 0);
    const statusBarHeightOffset = 10;
    height -= Math.max(statusBarHeight - statusBarHeightOffset, 0);

    useEffect(() => {
        const getRecommendedPosts = async () => {
            try {
                const forYouQuery = postService.getRecommendedPosts(postsPerLoad);
                const followingQuery = postService.getRecommendedPosts(postsPerLoad, true);

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
            setIsLoading(true);
            const results = await postService.getRecommendedPosts(postsPerLoad, recommendedType == RecommendedType.FOLLOWING);
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