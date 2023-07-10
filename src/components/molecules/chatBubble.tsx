import { ReactNode, memo, useEffect } from "react";
import { Platform, TouchableHighlight, View } from "react-native";
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { formatDateTimeTo12HoursTimeString } from "../../utils/dateUtil";
import { Svg, Circle } from "react-native-svg";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from 'react-native-root-toast';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function ChatBubble({
  createdAt,
  isSelf,
  children
}: {
  createdAt?: string;
  isSelf: boolean;
  children?: ReactNode;
}) {
  const theme = useTheme();
  const textColor = isSelf ? theme.colors.onPrimary : theme.colors.onSecondary;

  const dotsCount = 3;
  const dotRadius = 3;
  const dotsArray = [...Array(dotsCount).keys()];
  const dotsDistance = 10;
  const dotYArray = dotsArray.map(() => useSharedValue(7));
  const dotAnimationDuration = 500

  useEffect(() => {
    if (!children) {
      dotYArray.forEach((dotY, i) => {
        dotY.value = withDelay(
          i * dotAnimationDuration / 1.5,
          withRepeat(
            withTiming(2, {
              duration: dotAnimationDuration,
              easing: Easing.inOut(Easing.ease)
            }),
            -1,
            true
          )
        );
      });
    }
  }, []);

  const dotAnimatedPropsArray = dotYArray.map((dotY) => useAnimatedProps(() => ({ cy: dotY.value })));

  const copyToClipboard = () => {
    Clipboard.setString(children as string);

    if (Platform.OS == "ios") {
      Toast.show("Copied to clipboard.", {
        backgroundColor: theme.colors.onSecondary,
        containerStyle: {
          borderRadius: 999
        }
      });
    }
  }

  return (
    <TouchableHighlight
      style={{
        alignSelf: isSelf ? "flex-end" : "flex-start",
        maxWidth: "90%",
        margin: 10,
        borderRadius: 20,
        borderTopLeftRadius: isSelf ? undefined : 0,
        borderBottomRightRadius: isSelf ? 0 : undefined,
        backgroundColor: isSelf ? theme.colors.primary : theme.colors.secondary,
      }}
      onLongPress={(event) => copyToClipboard()}>
      <View
        style={{
          maxWidth: "90%",
          alignSelf: isSelf ? "flex-end" : "flex-start",
          padding: 15,
          borderRadius: 20,
          borderTopLeftRadius: isSelf ? undefined : 0,
          borderBottomRightRadius: isSelf ? 0 : undefined,
          backgroundColor: isSelf ? theme.colors.primary : theme.colors.secondary,
        }}
      >
        {
          children ?
            <>
              <Text
                style={{
                  color: textColor
                }}
              >
                {children}
              </Text>

              {createdAt?.length && (
                <Text
                  style={{
                    color: textColor,
                    fontSize: 12,
                    textAlign: "right",
                  }}
                >
                  {formatDateTimeTo12HoursTimeString(createdAt)}
                </Text>
              )}
            </>
            :
            <Svg width={30} height={15} viewBox="0 0 30 10">
              {
                dotsArray.map((i) =>
                  <AnimatedCircle
                    key={i}
                    animatedProps={dotAnimatedPropsArray[i]}
                    cx={i * dotsDistance + dotRadius}
                    r={dotRadius}
                    fill={textColor} />)
              }
            </Svg>
        }
      </View>
    </TouchableHighlight>
  );
}

export default memo(ChatBubble, (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.isSelf == nextProps.isSelf);
