import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "@/store/themeContext";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { Theme } from "@/constants/theme";

const themeOptions = [
  { label: "Light Mode", value: "light" },
  { label: "Dark Mode", value: "dark" },
  { label: "Automatic", value: "automatic" },
  { label: "System Default", value: "system" },
];

const SettingsScreen = () => {
  const { theme, setMode, mode, toggleTheme } = useContext(ThemeContext);
  const [selectedOption, setSelectedOption] = useState(mode);
  const isNightTime = () => {
    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
    return currentMinutes >= 18 * 60 + 30 || currentMinutes <= 6 * 60 + 30;
  };
  const color = Theme[theme];
  useEffect(() => {
    // Set initial option from current theme
    if (theme === "light") setSelectedOption("light");
    else if (theme === "dark") setSelectedOption("dark");
    else setSelectedOption(mode);
  }, [theme]);

  useEffect(() => {
    if (selectedOption === "automatic") {
      setMode(isNightTime() ? "dark" : "light");
    }
  }, [selectedOption]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (selectedOption === "automatic") {
      intervalId = setInterval(() => {
        setMode(isNightTime() ? "dark" : "light");
      }, 60000);
    }
    return () => clearInterval(intervalId);
  }, [selectedOption]);

  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
    if (value === "automatic") {
      setMode(isNightTime() ? "dark" : "light");
    } else if (value === "system") {
      setMode(null);
    } else {
      setMode(value); // 'light' or 'dark'
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: color.background }}
      className="flex-1 mt-[7%]"
    >
      <HeaderWithIcon title="Preferences" />
      <ScrollView
        style={{ backgroundColor: color.background }}
        className="flex-1 bg-[#F7F7F7] pt-5"
      >
        <Text
          style={{ color: color.text, fontWeight: "500" }}
          className="mx-4 mb-2"
        >
          Accessibility
        </Text>
        <View
          style={{ backgroundColor: color.bg }}
          className=" rounded-md mx-4 mb-4 max-h-[80%] p-3"
        >
          {themeOptions.map(({ label, value }) => (
            <TouchableOpacity
              key={value}
              className="flex-row items-center py-4"
              onPress={() => handleSelectOption(value)}
              style={{ backgroundColor: color.bg }}
            >
              <Text style={{ color: color.text }} className="flex-1">
                {label}
              </Text>
              {selectedOption === value && (
                <Image
                  // source={require('@/assets/images/preferences-check.png')}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
