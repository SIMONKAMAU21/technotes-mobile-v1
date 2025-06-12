import { Colors } from "@/constants/Colors";

export type ThemeType = "light" | "dark";

export const Theme = {
  light: {
    background: Colors.light.background,
    text: Colors.light.text,
    // link: Colors.light.link,
    primaryButton: "#0a7ea4",
    secondaryButton: "#e0e0e0",
    icon: Colors.light.icon,
    tint: Colors.light.tint,
    tabIconDefault: Colors.light.tabIconDefault,
    tabIconSelected: Colors.light.tabIconSelected,
    bg: Colors.light.bg,
statusBar:Colors.light.statusBar
    // inputBackground: Colors.light.inputBackground,
    // flagSpaceColor: Colors.light.flagSpaceColor,
    // Add more theme properties as needed
  },
  dark: {
    background: Colors.dark.background,
    text: Colors.dark.text,
    // link: Colors.dark.link,
    primaryButton: "#1da1f2",
    secondaryButton: "#333333",
    icon: Colors.dark.icon,
    bg: Colors.dark.bg,
    tint: Colors.dark.tint,
    tabIconDefault: Colors.dark.tabIconDefault,
    tabIconSelected: Colors.dark.tabIconSelected,
    statusBar:Colors.dark.statusBar

    // inputBackground: Colors.dark.inputBackground,
    // flagSpaceColor: Colors.dark.flagSpaceColor,
    // Add more theme properties as needed
  },
};
