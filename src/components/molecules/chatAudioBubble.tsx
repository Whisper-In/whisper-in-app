import { memo, useEffect, useState } from "react";
import { View, ViewStyle } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { AVPlaybackStatusSuccess, Audio, InterruptionModeIOS } from "expo-av";
import AudioTimeline from "../atoms/audioTimeline";
import { formatDateTimeTo12HoursTimeString } from "../../utils/dateUtil";
import Icon from "react-native-paper/src/components/Icon";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setCurrentPlayingSoundURL } from "../../store/slices/app";
import SoundPlayer from "react-native-sound-player";

function ChatAudioBubble({
  audioUrl: soundUrl,
  isSelf,
  createdAt,
}: {
  audioUrl: string;
  isSelf: boolean;
  createdAt?: string;
}) {
  const currentPlayingSoundURL = useAppSelector(
    (state) => state.app.currentPlayingSoundURL
  );
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const theme = useTheme();
  const color = isSelf ? theme.colors.onPrimary : theme.colors.onSecondary;

  const dispatch = useAppDispatch();

  const toggleSound = async () => {
    if (sound) {
      if (!isSoundPlaying) {
        if (currentPlayingSoundURL == soundUrl) {
          try {
            await sound.replayAsync();
          } catch (error) {}
        } else {
          dispatch(setCurrentPlayingSoundURL(soundUrl));
        }
      } else {
        dispatch(setCurrentPlayingSoundURL(undefined));
      }
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        });
        const { sound } = await Audio.Sound.createAsync({
          uri: `file://${soundUrl}`,
        });

        sound.setOnPlaybackStatusUpdate((status: any) => {
          if (!status.error) {
            const successStatus: AVPlaybackStatusSuccess = status;

            if (successStatus.isLoaded && duration == 0) {
              setDuration((successStatus.playableDurationMillis ?? 0) / 60000);
            }

            if (successStatus.didJustFinish && !successStatus.isPlaying) {
              dispatch(setCurrentPlayingSoundURL(undefined));
              setProgress(1);
            } else if (successStatus.isPlaying) {
              if (
                successStatus.playableDurationMillis == undefined ||
                successStatus.playableDurationMillis <= 0
              ) {
                setProgress(0);
              } else {
                setProgress(
                  successStatus.positionMillis /
                    successStatus.playableDurationMillis
                );
              }
            }

            setIsSoundPlaying(successStatus.isPlaying);
          }
        });

        setSound(sound);
      } catch (error) {
        failedToLoad("Load", error);
      }
    };

    loadSound();
  }, []);

  useEffect(() => {
    return () => {
      if (sound?._loaded) {
        sound.unloadAsync().catch((error) => {
          failedToLoad("Unload", error);
        });
      }
    };
  }, [sound]);

  useEffect(() => {
    const soundUpdate = async () => {
      try {
        if (sound?._loaded) {
          if (currentPlayingSoundURL == soundUrl) {
            await sound.replayAsync();
          } else {
            await sound.stopAsync();
            //setProgress(0);
          }
        }
      } catch (error) {
        failedToLoad("Update", error);
      }
    };

    soundUpdate();
  }, [currentPlayingSoundURL]);

  const failedToLoad = (tag: string, error: any) => {
    console.log(`${tag}:`, error);
    setLoadFailed(true);
  };

  const chatBubbleStyle: ViewStyle = {
    maxWidth: "90%",
    alignSelf: isSelf ? "flex-end" : "flex-start",
    margin: 10,
    padding: 15,
    borderRadius: 20,
    borderTopLeftRadius: isSelf ? undefined : 0,
    borderBottomRightRadius: isSelf ? 0 : undefined,
    backgroundColor: isSelf ? theme.colors.primary : theme.colors.secondary,
  };

  if (loadFailed) {
    return (
      <View style={chatBubbleStyle}>
        <Text
          style={{
            color: theme.colors.error,
            fontStyle: "italic",
          }}
        >
          Failed to load audio.
        </Text>
      </View>
    );
  }

  return (
    <View style={chatBubbleStyle}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableRipple
          onPress={toggleSound}
          borderless={true}
          style={{
            borderRadius: 25,
            marginRight: 5,
          }}
        >
          <Icon
            color={color}
            source={!isSoundPlaying ? "play-circle" : "stop-circle"}
            size={50}
          />
        </TouchableRipple>

        <AudioTimeline
          color={color}
          seekerColor={theme.colors.primary}
          progress={progress}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ width: 60 }}></View>
        <Text
          style={{
            flexGrow: 1,
            color: color,
            fontSize: 12,
          }}
        >
          {isSoundPlaying
            ? (duration * progress).toFixed(2)
            : duration.toFixed(2)}
        </Text>

        {createdAt?.length && (
          <Text
            style={{
              color: color,
              fontSize: 12,
              textAlign: "right",
            }}
          >
            {formatDateTimeTo12HoursTimeString(createdAt)}
          </Text>
        )}
      </View>
    </View>
  );
}

export default memo(
  ChatAudioBubble,
  (prevProps, nextProps) => prevProps.audioUrl === nextProps.audioUrl
);
