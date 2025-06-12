/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#E9EEF6",
    tint: tintColorLight,
    icon: "#687076",
    bg: "#fff",
    secondary: "#ed8936",
    primary: "#4299e1",
    tabIconDefault: "#687076",
    statusBar: "#4299E1",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#111827",
    bg: "#374151",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    statusBar: "#111827",

    tabIconSelected: tintColorDark,
  },
};
