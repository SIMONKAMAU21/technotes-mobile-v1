import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useMemo, useState } from "react";
import { useEvents } from "./data/data";
import { formatDate } from "@/utils/constants/stringUtils";
import LoadingIndicator from "@/components/ui/loading";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { Picker } from "@react-native-picker/picker"; // install this if not yet installed
import { HStack } from "@/components/ui/Stacks";
import SearchInput from "@/components/ui/searchInput";
import { Menu } from "react-native-paper";

const EventList = () => {
  const { data: events, isLoading, isError } = useEvents();
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  const [visible, setVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openMenu = () => {
    if (visible) return; // Prevent multiple calls
    searchQuery && setSearchQuery(""); // Reset selected role when opening menu

    setVisible(true);
  };

  const closeMenu = () => setVisible(false);
  if (isLoading) return <LoadingIndicator />;
  if (isError) return <Text>Error loading events.</Text>;
  if (!events?.length) return <Text>No events available.</Text>;


  const filteredEvents = useMemo(() => {
    if (!events || !searchQuery.trim()) {
      return events || [];
    }
    const query = searchQuery.toLowerCase().trim();
    return events.filter((event: any) => {
      return (
        event.createdBy?.role?.includes(query) ||
        event.title.toLowerCase().includes(query)
      );
    });
  }, [events, searchQuery]);

  return (
    <SafeAreaView
      style={{ backgroundColor: color.background }}
      className="flex-1 mt-[7%]"
    >
      <HeaderWithIcon title="Events" />
      <HStack
        style={{
          backgroundColor: theme === "dark" ? color.background : color.bg,
        }}
        className="items-center    mb-2"
      >
        <View className="px-4 mb-2 h-50  w-[30%] rounded-lg">
          <Text
          className="text-sm"
            style={{ color: color.text, marginBottom: 2 }}
          >
            Filter by Role:
          </Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{backgroundColor: color.bg}}
            anchor={
              <TouchableOpacity
                onPress={openMenu}
                className="w-[100%] h-10"
                style={{
                  backgroundColor: color.bg,
                  borderRadius: 10,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: color.text }}>
                  {searchQuery || "Select Role"}
                </Text>
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() =>{
                 setSearchQuery("");
                 closeMenu()
                }}
              
              title="All"
              titleStyle={{ color: color.text }}
            />
            <Menu.Item
              onPress={() => {setSearchQuery("admin");closeMenu()}}
              title="Admin"
              titleStyle={{ color: color.text }}
            />
            <Menu.Item
              onPress={() => {setSearchQuery("teacher");closeMenu()}}
              title="Teacher"
              titleStyle={{ color: color.text }}
            />
          </Menu>
          {/* <Picker
            selectedValue={selectedRole}
            style={{ backgroundColor: color.bg, color: color.text }}
            onValueChange={(value) => setSelectedRole(value)}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Teacher" value="teacher" />
            <Picker.Item label="Parent" value="parent" />
          </Picker> */}
        </View>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          width={"65%"}
        />
      </HStack>

      <FlatList
        data={filteredEvents}
        contentContainerStyle={{ padding: 10, gap: 12 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: color.bg,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: color.text }}
            >
              {item.title}
            </Text>
            <Text style={{ color: color.text }}>
              From: {formatDate(new Date(item.start))}
            </Text>
            <Text style={{ color: color.text }}>
              To: {formatDate(new Date(item.end))}
            </Text>
            <Text className="text-sm" style={{ color: color.text }}>
              Created by: {item.createdBy?.name || "Unknown"} (
              {item.createdBy?.role})
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default EventList;
