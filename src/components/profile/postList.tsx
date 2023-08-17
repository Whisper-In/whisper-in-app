import { Dimensions, FlatList, View, ViewStyle } from "react-native";
import { PostDto, PostType } from "../../store/dtos/content.dtos";
import Post from "../post";
import { Text } from "react-native-paper";
import PostListItem from "./postListItem";

export default function PostList({ style, posts, onPostListItemPress }
    : { style?: ViewStyle, posts?: PostDto[], onPostListItemPress?: (post: PostDto) => void }) {
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

    return (
        <FlatList style={style}
            data={posts}
            numColumns={numOfColumns}
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