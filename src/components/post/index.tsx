import { Image, Pressable, View, ViewStyle } from "react-native";
import { IPostDto, PostType } from "../../store/dtos/content.dtos";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import ButtonGroup from "./buttonGroup";
import InfoGroup from "./infoGroup";
import { LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import React, { useRef, useState } from "react";
import TouchableWithDoubleTap from "../touchableWithDoubleTap";
import Icon from "react-native-paper/src/components/Icon";
import LikePrompt, { LikePromptComponentType } from "./likePrompt";
import PlayButton from "./playButton";
import {
    ActivityIndicator as PaperActivityIndicator,
} from "react-native-paper";

function Post({ post, style, width, height, onAvatarPress, onLikePress, hideAvatar, shouldPlay }
    : {
        post: IPostDto, style?: ViewStyle, width: string | number, height: string | number,
        onAvatarPress?: () => void, onLikePress?: () => void, hideAvatar?: boolean, shouldPlay?: boolean
    }) {

    const videoRef = useRef<Video>(null);
    const likePromptRef = useRef<LikePromptComponentType>(null);
    const [_post, setPost] = useState(post);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    const _onLikePress = () => {
        if (onLikePress)
            onLikePress();

        _post.isLiked = !_post.isLiked;
        _post.likeCount += _post.isLiked ? 1 : -1;

        setPost({ ..._post });
    }

    const onDoubleTap = () => {
        if (!_post.isLiked) {
            if (onLikePress)
                onLikePress();

            _post.isLiked = true;
            _post.likeCount += 1;

            setPost({ ..._post });
        }

        likePromptRef.current?.prompt();
    }

    const onPress = () => {
        if (_post.postType == PostType[PostType.VIDEO]) {
            if (!isVideoPlaying) {
                videoRef.current?.playAsync();
            } else {
                videoRef.current?.pauseAsync();
            }
        }
    }

    const onVideoPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            if (isVideoLoading) {
                setIsVideoLoading(false);
            }

            setIsVideoPlaying(status.isPlaying);
        }
    }

    return (
        <TouchableWithDoubleTap onDoubleTap={onDoubleTap} onPress={onPress}>
            <View style={[
                {
                    flex: 1,
                    position: "relative",
                    backgroundColor: "black"
                },
                style
            ]}>
                {
                    _post.postType == PostType[PostType.PHOTO] ?
                        <Image
                            style={{ width, height }}
                            source={{ uri: _post.postURL }} />
                        :
                        <View style={{
                            position: "relative",
                        }}>
                            <Video ref={videoRef} style={{ width, height }}
                                posterSource={{ uri: _post.thumbnailURL }}
                                shouldPlay={shouldPlay}
                                resizeMode={ResizeMode.COVER}
                                isLooping={true}
                                onLoadStart={() => setIsVideoLoading(true)}
                                onPlaybackStatusUpdate={onVideoPlaybackStatusUpdate}
                                source={{ uri: _post.postURL }} />
                            {
                                !isVideoPlaying && !isVideoLoading &&
                                <PlayButton style={{
                                    position: "absolute",
                                    width,
                                    height,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }} />
                            }
                            {
                                isVideoLoading &&
                                <View style={{
                                    position: "absolute",
                                    width,
                                    height,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <PaperActivityIndicator size={50} />
                                </View>
                            }
                        </View>
                }

                <View style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    position: "absolute",
                    flex: 1,
                    bottom: 0,
                    paddingHorizontal: 12,
                    paddingBottom: 25,
                    zIndex: 1
                }}>
                    <InfoGroup style={{
                        flex: 1
                    }} userName={_post.creator.userName}
                        description={_post.description} />

                    <ButtonGroup
                        post={_post}
                        hideAvatar={hideAvatar}
                        onAvatarPress={onAvatarPress}
                        onLikePress={_onLikePress} />

                    <Svg style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        zIndex: -1
                    }} height="100%" width={width}>
                        <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <Stop offset={0} stopColor="black" stopOpacity={0} />
                            <Stop offset={1} stopColor="black" stopOpacity={0.8} />
                        </LinearGradient>
                        <Rect width="100%" height="100%" fill={"url(#gradient)"} />
                    </Svg>
                </View>

                <View style={{
                    position: "absolute",
                    width,
                    height,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <LikePrompt ref={likePromptRef} />
                </View>
            </View>
        </TouchableWithDoubleTap>
    );
}

export default React.memo(Post, (prevProps, nextProps) => prevProps.shouldPlay == nextProps.shouldPlay);