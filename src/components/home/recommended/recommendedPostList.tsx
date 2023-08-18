import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from "react-native";
import { CreatorProfileDto, PostDto, PostType } from "../../../store/dtos/content.dtos";
import Post from "../../post";
import { ProfileModels } from "../../../store/dtos/profile.dtos";
import { useEffect, useRef, useState } from "react";

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
        const { viewableItems } = info;
        if (viewableItems.length && viewableItems[0].index != currentIndex) {
            setCurrentIndex(viewableItems[0].index!);
        }
    }

    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

    const renderItem = ({ item, index }: { item: PostDto, index: number }) =>
        <Post
            shouldPlay={!isHidden && currentIndex == index}
            key={index}
            post={item}
            width={width}
            height={height}
            onAvatarPress={() => onAvatarPress(item.creator, item.creatorModel == ProfileModels[ProfileModels.AIProfile])}
            onLikePress={() => onLikePress(item._id)}
        />

    const getItemLayout = (
        data: Array<PostDto> | null | undefined,
        index: number,
    ) => ({
        length: height,
        offset: height * index,
        index
    });

    return (
        <FlatList
            style={[isHidden && {
                height: 0
            }]}
            initialScrollIndex={currentIndex}
            maxToRenderPerBatch={1}
            initialNumToRender={1}
            removeClippedSubviews={true}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={height}
            getItemLayout={getItemLayout}
            viewabilityConfig={viewabilityConfig}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            data={posts}
            renderItem={renderItem}
            onScroll={onScroll}
        />
    );
}