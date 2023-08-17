import { RouteProp, useRoute } from "@react-navigation/native";
import { Button, Text, TextInput } from "react-native-paper";
import { HomePageNavigationProp, HomeStackNavigatorParamList, UploadType } from "../../navigation/types";
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import RoundedTextInput from "../../components/roundedTextInput";
import CustomKeyboardAvoidingView from "../../components/customKeyboardAvoidingView";

export default function UploadPage() {
    const route = useRoute<RouteProp<HomeStackNavigatorParamList, "Upload">>();
    const { uri, uploadType } = route.params;
    const videoRef = useRef<Video>(null);
    const imageRef = useRef<Image>(null);
    const [imageRatio, setImageRatio] = useState(0);
    const width = Dimensions.get("screen").width * 0.8;

    useEffect(() => {
        if (uploadType == UploadType.PHOTO) {
            Image.getSize(uri, (w, h) => {
                setImageRatio(h / w);
            });
        }
    }, []);

    return (
        <CustomKeyboardAvoidingView>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <View style={{
                    width,
                    height: imageRatio * width,
                    borderRadius: 10,
                    overflow: "hidden",
                }}>
                    {uploadType == UploadType.PHOTO ?
                        <Image ref={imageRef} source={{ uri }} style={{ flex: 1, resizeMode: "cover" }} />
                        :
                        <Video ref={videoRef} source={{ uri }} style={{ flex: 1 }} />
                    }
                </View>
            </View>

            <View>
                <RoundedTextInput style={{
                    paddingHorizontal: 20,
                    margin: 10
                }}
                    placeholder="Description"
                    multiline={true} />
            </View>
        </CustomKeyboardAvoidingView>
    );
}