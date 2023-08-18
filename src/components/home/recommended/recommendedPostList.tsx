import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from "react-native";
import { ICreatorProfileDto, IPostDto, PostType } from "../../../store/dtos/content.dtos";
import Post from "../../post";
import { ProfileModels } from "../../../store/dtos/profile.dtos";
import { useEffect, useRef, useState } from "react";

export default function RecommendedPostList({ posts, height, width, isHidden, onScrollEnd, onAvatarPress, onLikePress }
    : {
        posts: IPostDto[], height: number, width: number, isHidden?: boolean,
        onScrollEnd?: () => void,
        onAvatarPress: (creator: ICreatorProfileDto, isAI: boolean) => void,
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

        if (viewableItems.length) {            
            setCurrentIndex(viewableItems[0].index!);
        }
    }

    const isScrollNearBottom = (event: NativeSyntheticEvent<NativeScrollEvent>, itemHeightOffset = 1) => {
        return event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - (event.nativeEvent.layoutMeasurement.height * Math.max(0, itemHeightOffset + 1))
    }

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if(isScrollNearBottom(event)) {
            onScrollEnd && onScrollEnd();
        }
    }

    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

    const renderItem = ({ item, index }: { item: IPostDto, index: number }) =>
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
        data: Array<IPostDto> | null | undefined,
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