import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import CustomInput from "./customInput";
import { CustomButton } from "./customButton";
import { useUpdatePassword, useUpdatePicture } from "@/app/(profile)/data";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { formToJSON } from "axios";
import { useUserStore } from "@/store";
import LoadingIndicator from "./loading";
interface userDetails {
  userDetails: {
    photo: string | undefined;
    id: string | undefined;
    name: string | undefined;
  };
}
const UpdateProfile = () => {
  //   console.log("userDetails", userDetails);
  const [currentPassword, setCurrentPassword] = useState("demo123");
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
      console.log("response", response);
      router.replace("/(auth)/signIn");
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
    <View className="bg-white p-4 items-center  rounded-lg">
      {/* Cover + Profile */}

      <View style={styles.header} className="bg-primary" />

      <TouchableOpacity onPress={handleImagePick}>
        <View style={styles.avatarWrapper}>
          {uploading ? (
            <LoadingIndicator />
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
      <Text style={styles.title}>Change Password</Text>
      <CustomInput
        // placeholder="Current password"
        value={currentPassword}
        label="Current password"
        onChangeText={setCurrentPassword}
        secureTextEntry
        // style={styles.input}
      />
      <CustomInput
        // placeholder="New password"
        value={newPassword}
        label="New password"
        onChangeText={setNewPassword}
        secureTextEntry
        // style={styles.input}
      />
      <CustomInput
        // placeholder="Confirm password"
        value={confirmPassword}
        label="Confirm password"
        onChangeText={setConfirmPassword}
        secureTextEntry
        // style={styles.input}
      />

      <CustomButton onPress={handlePasswordUpdate}>
        Update Password
      </CustomButton>
      <Text className="text-gray-400 text-sm">{userData?.name}</Text>
      <Text className="text-gray-400 text-sm">{userData?.email}</Text>
      <Text className="text-gray-400 text-sm">{userData?.role}</Text>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    height: 100,
    width: "100%",
    // backgroundColor: '#1e3a8a',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  avatarWrapper: {
    marginTop: -40,
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
