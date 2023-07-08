import { Platform } from "react-native";
import { DefaultTheme, MD3Theme, configureFonts } from "react-native-paper";
import { MD3Type } from "react-native-paper/src/types";

const fontConfig:Partial<MD3Type> = {
  fontFamily: Platform.select({
    web: 'Inter-Regular',
    ios: 'Inter-Regular',
    default: 'Inter-Regular'
  })
}

export const lightTheme: MD3Theme = {
  ...DefaultTheme,
  fonts: configureFonts({config: fontConfig}),
  colors: {
    primary: "#3B96EB",
    onPrimary: "#FFF",
    primaryContainer: "rgb(0, 74, 117)",
    onPrimaryContainer: "#DDD",
    secondary: "#D5D5D5",
    onSecondary: "#555",
    secondaryContainer: "#FFF",
    onSecondaryContainer: "#666666",
    tertiary: "rgb(79, 216, 235)",
    onTertiary: "rgb(0, 54, 61)",
    tertiaryContainer: "rgb(0, 79, 88)",
    onTertiaryContainer: "rgb(151, 240, 255)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "#F4F4F4",
    onBackground: "rgb(26, 28, 30)",
    surface: "#FFF",
    onSurface: "rgb(26, 28, 30)",
    surfaceVariant: "rgb(222, 227, 235)",
    onSurfaceVariant: "rgb(66, 71, 78)",
    outline: "rgb(114, 119, 127)",
    outlineVariant: "rgb(194, 199, 207)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 48, 51)",
    inverseOnSurface: "rgb(240, 240, 244)",
    inversePrimary: "rgb(150, 204, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 244, 250)",
      level2: "rgb(232, 240, 247)",
      level3: "rgb(224, 235, 244)",
      level4: "rgb(222, 234, 243)",
      level5: "rgb(217, 231, 241)",
    },
    surfaceDisabled: "rgba(26, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
    backdrop: "rgba(44, 49, 55, 0.4)",
  },
};

export const darkTheme: MD3Theme = {
  ...DefaultTheme,
  fonts: configureFonts({config: fontConfig}),
  dark: true,
  colors: {
    primary: "#3B96EB",
    onPrimary: "#DDD",
    primaryContainer: "rgb(0, 74, 117)",
    onPrimaryContainer: "#82a2e0",
    secondary: "#1D2129",
    onSecondary: "#999999",
    secondaryContainer: "rgb(0, 79, 88)",
    onSecondaryContainer: "#666666",
    tertiary: "rgb(79, 216, 235)",
    onTertiary: "rgb(0, 54, 61)",
    tertiaryContainer: "rgb(0, 79, 88)",
    onTertiaryContainer: "rgb(151, 240, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "#0C0E11",
    onBackground: "#ffffff",
    surface: "#16191F",
    onSurface: "#bbbbbb",
    surfaceVariant: "rgb(66, 71, 78)",
    onSurfaceVariant: "rgb(194, 199, 207)",
    outline: "rgb(140, 145, 152)",
    outlineVariant: "rgb(66, 71, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(226, 226, 229)",
    inverseOnSurface: "rgb(47, 48, 51)",
    inversePrimary: "rgb(0, 99, 154)",
    elevation: {
      level0: "transparent",
      level1: "rgb(32, 37, 41)",
      level2: "rgb(36, 42, 48)",
      level3: "rgb(40, 47, 55)",
      level4: "rgb(41, 49, 57)",
      level5: "rgb(43, 53, 62)",
    },
    surfaceDisabled: "rgba(226, 226, 229, 0.12)",
    onSurfaceDisabled: "rgba(226, 226, 229, 0.38)",
    backdrop: "rgba(44, 49, 55, 0.4)",
  },
};

export const skeletonHighlight = "#888";
