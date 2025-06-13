import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { UserAdd } from "@/components/ui/userAdd";
import { Ionicons } from "@expo/vector-icons";
import { useDeleteUser, useUpdateUser } from "../../data";
import { useAppActions, useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import Loading from "@/components/ui/toasts/Loading";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function UserDetailsScreen() {
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const userData = JSON.parse(params.userdata as string);
  const { setGlobalError, setGlobalSuccess } = useAppActions();
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];

  // State for photo modal
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

  const {
    mutate: deleteUser,
    isLoading,
    isError,
  } = useDeleteUser(userData._id);
  const {
    mutate: updateUser,
    isLoading: isUpdateLoading,
    isError: updateError,
  } = useUpdateUser(userData._id);

  const handleUpdateUser = async (formData: any) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      gender: formData.gender,
      address: formData.address,
    };

    try {
      await updateUser(payload);
    } catch (error) {
      setGlobalError({
        visible: true,
        description: "Error updating user",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(userData._id);
      console.log("User deleted successfully:", response);
      router.back();
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Error", "Failed to delete user");
    }
  };

  const openPhotoModal = () => {
    setIsPhotoModalVisible(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalVisible(false);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: color.background }}
      className="flex-1 mt-[7%] gap-5"
    >
      <WPSuccess
        visible={globalSuccess?.visible}
        description={globalSuccess?.description}
      />
      <WPError
        visible={globalError?.visible}
        description={globalError?.description}
      />
      <HeaderWithIcon
        title="User Details"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />
      <ScrollView
        style={{ backgroundColor: color.background }}
        contentContainerClassName="p-2 "
      >
        <View className="mb-6">
          <Text style={{ color: color.text }} className={`text-2xl font-bold`}>
            Edit User Details
          </Text>
        </View>

        <View
          style={{ backgroundColor: color.background }}
          className={`rounded-lg p-1 shadow-sm `}
        >
          <View className="flex-row justify-between bg-primary w-full h-[20%] p-3 rounded-lg">
            <Text style={{ color: color.text }} className={`mt-1`}>
              {userData.name}
            </Text>
            <TouchableOpacity
              onPress={openPhotoModal}
              style={{ backgroundColor: color.background }}
              className="items-center bg-bg p-1 w-40 h-40  shadow-lg rounded-full "
            >
              <Image
                alt="user photo"
                className="w-full h-full rounded-full "
                source={
                  userData?.photo
                    ? { uri: userData?.photo }
                    : require("../../../../assets/images/user-placeholder.png")
                }
              />
            </TouchableOpacity>
            {isLoading ? (
              <Loading />
            ) : (
              <Ionicons
                onPress={handleDeleteUser}
                name="trash"
                size={24}
                color="white"
              />
            )}
          </View>
          <View className="mt-5">
            <UserAdd
              onSubmit={handleUpdateUser}
              initialData={userData}
              isLoading={isUpdateLoading}
              isError={updateError}
              submitButtonText="Update User Details"
            />
          </View>
        </View>
      </ScrollView>

      {/* Full Screen Photo Modal */}
      <Modal
        visible={isPhotoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closePhotoModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Close button */}
          <TouchableOpacity
            onPress={closePhotoModal}
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              zIndex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          {/* Full screen image */}
          <Image
            source={
              userData?.photo
                ? { uri: userData?.photo }
                : require("../../../../assets/images/user-placeholder.png")
            }
            style={{
              width: screenWidth * 0.9,
              height: screenHeight * 0.9,
              borderRadius: 10,
            }}
            resizeMode="contain"
          />

          {/* User name below image */}
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {userData.name}
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
