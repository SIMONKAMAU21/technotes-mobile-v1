import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import CustomInput from "./customInput";
import { CustomButton } from "./customButton";
import { useUpdatePassword, useUpdatePicture } from "@/app/(profile)/data";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useUserStore } from "@/store";
import Loading from "./toasts/Loading";
import { HStack, VStack } from "./Stacks";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";
interface userDetails {
  userDetails: {
    photo: string | undefined;
    id: string | undefined;
    name: string | undefined;
  };
}
const UpdateProfile = () => {
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  //   console.log("userDetails", userDetails);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const { mutate: updatePassword, isError } = useUpdatePassword();
  const {
    mutate: updatePhoto,
    isLoading: uploading,
    isError: error,
  } = useUpdatePicture();
  const userData = useUserStore((state) => state.userData);
  const isLoading = useUserStore((state) => state.isLoading);
  const refreshUserData = useUserStore((state) => state.refreshUserData);
  const router = useRouter();
  const user_id: string | undefined = userData ? userData.id : "N/A";

  const handlePasswordUpdate = async () => {
    // Handle password update logic here
    try {
      const payload = {
        oldPassword: currentPassword,
        newPassword,
        id: userData?.id,
      };
      const response = await updatePassword(payload);
      router.replace("/(onbording)");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImagePick = async () => {
    try {
      const { status: mediaStatus } =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      if (mediaStatus !== "granted") {
        console.log("Media permission denied");
      } else {
        console.log("granted");
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
      const overSize = result.assets?.filter(
        (file) => file.fileSize > MAX_FILE_SIZE
      );
      if (overSize?.length > 0) {
        const fileNames = overSize?.map((file) => file.fileName);
        return;
      }
      if (result.canceled) {
        return;
      }
      if (!result.cancelled || overSize?.length < 0) {
        setImage(result?.assets?.[0]?.uri);
      }
      const selectedItem = result?.assets?.[0];
      const formData = new FormData();
      // formData.append("user_id", user_id);
      formData.append("photo", {
        uri: selectedItem?.uri,
        name: selectedItem?.fileName,
        type: selectedItem?.mimeType,
      });

      await updatePhoto(
        { formData, user_id },
        {
          onSuccess: async () => {
            await refreshUserData();
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: color.background }}
      className={`flex-1  text-white`}
      contentContainerClassName="p-4 gap-2"
    >
      <View className=" items-center gap-2 rounded-lg">

        <View style={styles.header} className="bg-primary " />

        <TouchableOpacity onPress={handleImagePick}>
          <View style={styles.avatarWrapper}>
            {uploading ? (
              <Loading />
            ) : (
              <>
                <Image
                  source={
                    userData?.photo
                      ? { uri: userData?.photo }
                      : image
                      ? { uri: image }
                      : require("../../assets/images/user-placeholder.png")
                  }
                  style={styles.avatar}
                />
              </>
            )}
          </View>
        </TouchableOpacity>

        {/* Change Password */}
        <View
          style={{ backgroundColor: color.bg }}
          className="w-full p-2 max-h-[30%] gap-2 rounded-lg"
        >
          <Text
            className={theme === "dark" ? "text-white" : "text-black"}
            style={styles.title}
          >
            Change Password
          </Text>
          <CustomInput
            placeholder="Current password"
            value={currentPassword}
            style={{ width: "100%", height: "10%" }}
            label="Current password"
            onChangeText={setCurrentPassword}
            secureTextEntry
            // style={styles.input}
          />
          <CustomInput
            placeholder="New password"
            value={newPassword}
            label="New password"
            style={{ width: "100%", height: "10%" }}
            onChangeText={setNewPassword}
            secureTextEntry
            // style={styles.input}
          />
          <CustomInput
            placeholder="Confirm password"
            value={confirmPassword}
            style={{ width: "100%", height: "10%" }}
            label="Confirm password"
            onChangeText={setConfirmPassword}
            secureTextEntry
            // style={styles.input}
          />

          <CustomButton onPress={handlePasswordUpdate}>
            Update Password
          </CustomButton>
        </View>
        <VStack
          style={{ backgroundColor: color.bg }}
          className="w-full p-2 bg-white   rounded-lg "
        >
          <HStack className="justify-between items-center border-b-2 border-gray-100 mb-4">
            <Text className="text-gray-400 text-lg font-bold">Fullname:</Text>
            <Text className="text-gray-400 text-sm">{userData?.name}</Text>
          </HStack>
          <HStack className="justify-between border-b-2 border-gray-100 items-center mb-4">
            <Text className="text-gray-400 text-lg font-bold">Email:</Text>
            <Text className="text-gray-400 text-sm">{userData?.email}</Text>
          </HStack>
          <HStack className="justify-between border-b-2 border-gray-100 items-center mb-4">
            <Text className="text-gray-400 text-lg font-bold">Phone:</Text>
            <Text className="text-gray-400 text-sm">
              {userData?.phone || "N/A"}
            </Text>
          </HStack>
          <HStack className="justify-between border-b-2 border-gray-100 items-center mb-4">
            <Text className="text-gray-400 text-lg font-bold">Role:</Text>
            <Text className="text-gray-400 text-sm">{userData?.role}</Text>
          </HStack>
          <HStack className="justify-between border-b-2 border-gray-100 items-center mb-4">
            <Text className="text-gray-400 text-lg font-bold">Gender:</Text>
            <Text className="text-gray-400 text-sm">
              {userData?.gender || "N/A"}
            </Text>
          </HStack>
          <HStack className="justify-between border-gray-100 items-center mb-4">
            <Text className="text-gray-400 text-lg font-bold">Address:</Text>
            <Text className="text-gray-400 text-sm">
              {userData?.address || "N/A"}
            </Text>
          </HStack>
        </VStack>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    alignItems: "center",
    overflow:"scroll"
  },
  header: {
    height: 100,
    width: "100%",
    // backgroundColor: '#1e3a8a',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  avatarWrapper: {
    marginTop: -50,
    marginBottom: 20,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#ed8936",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    // width: '100%',
    // backgroundColor: '#e5e7eb',
    // padding: 12,
    borderRadius: 8,
    // marginBottom: 10,
  },
});
