import React, { useImperativeHandle, useState } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-paper/src/components/Icon";

export default function LikeButton({ style, isLiked, likeCount, onPress }
    : { style?: ViewStyle, isLiked?: boolean, likeCount: number, onPress?: () => void }) {

    return (
        <View style={[{
            alignItems: "center"
        }, style]}>
            <Pressable onPress={onPress}>
                <Icon source="cards-heart" size={50} color={!isLiked ? "white" : "#e02f4a"} />
            </Pressable>

            <Text style={{
                color: "white",
                fontStyle: "italic",
                fontSize: 12
            }}>
                {likeCount}
            </Text>
        </View>
    );
}