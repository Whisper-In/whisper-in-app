import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, View, ViewStyle } from "react-native";
import { IPostDto, PostType } from "../../store/dtos/content.dtos";
import Post from "../post";
import { Text } from "react-native-paper";
import PostListItem from "./postListItem";

export default function PostList({ style, posts, onPostListItemPress, onScrollEnd }
    : { style?: ViewStyle, posts?: IPostDto[], onPostListItemPress?: (post: IPostDto) => void, onScrollEnd?: () => void }) {
    const { width, height } = Dimensions.get("window");
    const numOfColumns = 3;
    const heightToWidthRatio = 1.33;
    const postWidth = width / 3;
    const postHeight = postWidth * heightToWidthRatio;

    if (!posts?.length) {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text>No posts yet.</Text>
            </View>
        );
    }

    const isScrollNearBottom = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        return postHeight * posts.length/numOfColumns - event.nativeEvent.contentOffset.y < event.nativeEvent.layoutMeasurement.height
    }

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isScrollNearBottom(event)) {            
            onScrollEnd && onScrollEnd();
        }
    }


    return (
        <FlatList style={style}
            data={posts}
            numColumns={numOfColumns}
            onScroll={onScroll}
            renderItem={({ item, index }) =>
                <PostListItem key={index}
                    style={{
                        margin: 1
                    }}
                    onPress={() => onPostListItemPress && onPostListItemPress(item)}
                    uri={item.postType == PostType[PostType.PHOTO] ? item.postURL : item.thumbnailURL!}
                    width={postWidth}
                    height={postHeight} />
            } />
    );
}