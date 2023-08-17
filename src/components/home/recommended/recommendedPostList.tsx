import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from "react-native";
import { CreatorProfileDto, PostDto } from "../../../store/dtos/content.dtos";
import Post from "../../post";
import { ProfileModels } from "../../../store/dtos/profile.dtos";
import { useRef, useState } from "react";

export default function RecommendedPostList({ posts, height, width, isHidden, onScroll, onAvatarPress, onLikePress }
    : {
        posts: PostDto[], height: number, width: number, isHidden?: boolean,
        onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
        onAvatarPress: (creator: CreatorProfileDto, isAI: boolean) => void,
        onLikePress: (postId: string) => void
    }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const viewabilityConfig = {        
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 70
    };

    const onViewableItemsChanged = (info: {
        viewableItems: Array<ViewToken>;
        changed: Array<ViewToken>;
    }) => {
        setCurrentIndex(info.changed[0].index!)
    }

    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

    return (
        <FlatList
            style={[isHidden && {
                display: "none"
            }]}
            maxToRenderPerBatch={5}
            removeClippedSubviews={true}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={height}
            data={posts}
            viewabilityConfig={viewabilityConfig}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            renderItem={({ item, index }) =>
                <Post
                    shouldPlay={index == currentIndex}
                    key={index}
                    post={item}
                    width={width}
                    height={height}
                    onAvatarPress={() => onAvatarPress(item.creator, item.creatorModel == ProfileModels[ProfileModels.AIProfile])}
                    onLikePress={() => onLikePress(item._id)}
                />
            }
            onScroll={onScroll}
        />
    );
}