import { Camera, CameraType } from "expo-camera";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { HomePageNavigationProp, UploadType } from "../../navigation/types";
import { useCallback, useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import CaptureButton from "../../components/camera/captureButton";
import UploadButton from "../../components/camera/uploadButton";
import RecordingIndicator from "../../components/camera/recordingIndicator";
import { useFocusEffect } from "@react-navigation/native";

export default function CameraPage({
    navigation,
}: {
    navigation: HomePageNavigationProp;
}) {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [ratio, setRatio] = useState("16:9");
    const [isRecording, setIsRecording] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();

            await Camera.requestMicrophonePermissionsAsync();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const ratios = await cameraRef.current?.getSupportedRatiosAsync();

            if (ratios?.length) {
                setRatio(ratios[ratios.length - 1]);
            }
        })();
    }, [cameraRef]);

    useEffect(() => {
        const focusListenerUnsubscribe = navigation.addListener("focus", () => {
            console.log("Focus")
            setIsFocused(true);
        });

        const blurListenerUnsubscribe = navigation.addListener("blur", () => {
            console.log("Blur")
            setIsFocused(false);
        });

        return () => {
            focusListenerUnsubscribe();
            blurListenerUnsubscribe();
        }
    }, [navigation]);

    if (!permission) {
        return <></>
    }

    if (!permission.granted) {
        Alert.alert(
            "Allow Camera",
            "Allow Whisper In to access your camera?",
            [
                {
                    text: "Yes",
                    onPress: requestPermission
                },
                {
                    text: "No",
                    onPress: () => navigation.pop()
                }
            ],
            {
                cancelable: true,
                onDismiss: () => navigation.pop()
            }
        );

        return <></>
    }

    const navigateToUpload = (uri: string, uploadType: UploadType) => {
        cameraRef.current?.pausePreview();
        navigation.navigate("Upload", {
            uri,
            uploadType
        });
    }

    const takePicture = async () => {
        if (!cameraRef.current)
            return;

        const picture = await cameraRef.current?.takePictureAsync();

        if (picture?.uri) {
            navigateToUpload(picture.uri, UploadType.PHOTO);
        }
    }

    const recordVideo = async () => {
        if (!cameraRef.current)
            return;

        setIsRecording(true);
        const video = await cameraRef.current?.recordAsync();
        setIsRecording(false);

        if (video?.uri) {
            navigateToUpload(video.uri, UploadType.VIDEO);
        }
    }

    const stopVideo = () => {
        cameraRef.current?.stopRecording();
    }

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All
        });

        if (!result.canceled) {
            const media = result.assets[0];

            navigateToUpload(media.uri, media.type == "image" ? UploadType.PHOTO : UploadType.VIDEO);
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            position: "relative"
        }}>
            {
                isFocused &&
                <Camera
                    ref={cameraRef}
                    style={{ flex: 1 }}
                    type={CameraType.back}
                    ratio={ratio}
                >
                </Camera>
            }

            {
                isRecording &&
                <RecordingIndicator style={{ position: "absolute", top: 30, right: 20 }} />
            }

            <View style={{
                position: "absolute",
                bottom: 30,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <CaptureButton
                    onPress={takePicture}
                    onLongPress={recordVideo}
                    onPressOut={stopVideo}
                />

                <View style={{
                    position: "absolute",
                    right: 30,
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <UploadButton onPress={openGallery} />
                </View>
            </View>
        </View>
    );
}