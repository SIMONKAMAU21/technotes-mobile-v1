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
import { Entypo, Ionicons, MaterialIcons, Zocial } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "@/utils";
import { useUserStore } from "@/store";

const SettingsScreen = () => {
  const setUser = useUserStore((state) => state.setUserData);
  const { theme, setMode, mode, toggleTheme } = useContext(ThemeContext);
  const [selectedOption, setSelectedOption] = useState(mode);
  const isNightTime = () => {
    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();
    return currentMinutes >= 18 * 60 + 30 || currentMinutes <= 6 * 60 + 30;
  };
  const color = Theme[theme];
  const themeOptions = [
    {
      label: "Light Mode",
      value: "light",
      icon: <MaterialIcons name="light-mode" size={24} color={color.icon} />,
    },
    {
      label: "Dark Mode",
      value: "dark",
      icon: <MaterialIcons name="dark-mode" size={24} color={color.icon} />,
    },
    {
      label: "Automatic",
      value: "automatic",
      icon: <MaterialIcons name="auto-mode" size={24} color={color.icon} />,
    },
    {
      label: "System Default",
      value: "system",
      icon: (
        <MaterialIcons name="settings-suggest" size={24} color={color.icon} />
      ),
    },
  ];

  const Notification = [
    {
      label: "Push Notifications",
      icon: <Ionicons name="notifications" size={20} color={color.icon} />,
    },
    {
      label: "Vibrate on Notify",
      icon: <Ionicons name="phone-portrait" size={20} color={color.icon} />,
    },
  ];

  const Account = [
    {
      label: "Edit Profile",
      icon: <MaterialIcons name="edit" size={20} color={color.icon} />,
      path: "/(profile)/profile",
    },
    {
      label: "Change Password",
      icon: <MaterialIcons name="lock" size={20} color={color.icon} />,
      path: "/(profile)/profile",
    },
  ];
  const Support = [
    {
      label: "Help & FAQ",
      icon: <Entypo name="help-with-circle" size={20} color={color.icon} />,
    },
    {
      label: "Privacy Policy",
      icon: <MaterialIcons name="policy" size={20} color={color.icon} />,
    },
    {
      label: "Terms of Service",
      icon: <MaterialIcons name="gavel" size={20} color={color.icon} />,
    },
  ];

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
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const logout = async () => {
    setUser(null);
    await signOut();
    // await deleteUserData();
    router.replace("/(auth)/signIn");
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: color.background }}
      className="flex-1 mt-[7%]"
    >
      <HeaderWithIcon title="Settings" />
      <ScrollView
        style={{ backgroundColor: color.background }}
        className="flex-1  pt-5"
      >
        <Text
          style={{ color: color.text, fontWeight: "500" }}
          className="mx-4 mb-2"
        >
          Accessibility
        </Text>
        <View
          style={{ backgroundColor: color.bg }}
          className=" rounded-md mx-4 mb-4  p-3"
        >
          {themeOptions.map(({ label, value, icon }) => (
            <TouchableOpacity
              key={value}
              className="flex-row items-center p-3"
              onPress={() => handleSelectOption(value)}
              style={{ backgroundColor: color.bg }}
            >
              <Text className="p-2">{icon}</Text>
              <Text style={{ color: color.text }} className="flex-1">
                {label}
              </Text>
              {selectedOption === value && (
                <Ionicons name="checkmark" size={24} color={color.tint} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* === Notification Settings === */}
        <Text
          style={{ color: color.text, fontWeight: "500" }}
          className="mx-4 mb-2"
        >
          Notifications
        </Text>
        <View
          style={{ backgroundColor: color.bg }}
          className="rounded-md mx-4 mb-4 p-3"
        >
          {Notification.map(({ label, icon }) => (
            <TouchableOpacity
              key={label}
              className="flex-row items-center justify-between p-3"
            >
              <Text style={{ color: color.text }}>{label}</Text>
              <Text>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* === Account Settings === */}
        <Text
          style={{ color: color.text, fontWeight: "500" }}
          className="mx-4 mb-2"
        >
          Account
        </Text>
        <View
          style={{ backgroundColor: color.bg }}
          className="rounded-md mx-4 mb-4 p-3"
        >
          {Account.map(({ label, icon, path }) => (
            <TouchableOpacity
              key={label}
              onPress={path ? () => handleNavigate(path) : undefined}
              className="flex-row items-center justify-between p-3"
            >
              <Text style={{ color: color.text }}>{label}</Text>
              <Text>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* === Support & Legal === */}
        <Text
          style={{ color: color.text, fontWeight: "500" }}
          className="mx-4 mb-2"
        >
          Support & Legal
        </Text>
        <View
          style={{ backgroundColor: color.bg }}
          className="rounded-md mx-4 mb-4 p-3"
        >
          {Support.map(({ label, icon }) => (
            <TouchableOpacity
              key={label}
              className="flex-row items-center justify-between p-3"
            >
              <Text style={{ color: color.text }}>{label}</Text>
              <Text>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={{ color: color.text, fontWeight: "500" }}
          className="mx-4 mb-2"
        >
          Version
        </Text>
        <View
          style={{ backgroundColor: color.bg }}
          className=" rounded-md  mx-4 mb-4  flex-row items-center justify-between  p-3"
        >
          <Text style={{ color: color.text }}>version 1.0.0</Text>
          <Zocial name="android" size={18} color={color.icon} />
        </View>
        <Text
          style={{ color: color.text, fontWeight: "700" }}
          className="mx-4 mb-2"
        >
          Logout
        </Text>
        <TouchableOpacity onPress={logout} className=" rounded-md  mx-4 mb-4  flex-row items-center gap-2 p-3">
          <MaterialIcons name="logout" size={24} color={"red"} />
          <Text style={{ color: color.text }} className="font-bold">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
