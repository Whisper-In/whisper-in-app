import { View, ViewStyle } from "react-native";
import CreatorAvatar from "./creatorAvatar";
import LikeButton from "./likeButton";
import ShareButton from "./shareButton";
import { PostDto } from "../../../store/dtos/content.dtos";

export default function ButtonGroup({ style, post, hideAvatar, onAvatarPress, onLikePress }
    : {
        style?: ViewStyle, post: PostDto, hideAvatar?: boolean
        onAvatarPress?: () => void, onLikePress?: () => void
    }) {

    return (
        <View style={[
            {
                alignItems: "center",
                gap: 5
            },
            style
        ]}>
            {
                !hideAvatar &&
                <CreatorAvatar
                    style={{ marginBottom: 20 }}
                    uri={post.creator.avatar ?? ""}
                    isFollowing={post.creator.isFollowing}
                    onPress={onAvatarPress} />
            }

            <LikeButton onPress={onLikePress} isLiked={post.isLiked} likeCount={post.likeCount} />

            <ShareButton />
        </View>
    );
}