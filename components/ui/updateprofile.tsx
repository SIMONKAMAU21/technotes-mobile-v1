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
import { useUpdatePassword } from "@/app/(profile)/data";
import { useRouter } from "expo-router";
// import * as ImagePicker from 'expo-image-picker';

const UpdateProfile = ({ userDetails }: { photo: string }) => {
//   console.log("userDetails", userDetails);
  const [currentPassword, setCurrentPassword] = useState("demo123");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [image, setImage] = useState(userDetails?.photo);
  const { mutate: updatePassword } = useUpdatePassword();
  const router = useRouter();
  const handlePasswordUpdate = async () => {
    // Handle password update logic here
    try {
      const payload = {
        oldPassword: currentPassword,
        newPassword,
        id: userDetails?.id,
      };
      const response = await updatePassword(payload);
      console.log("response", response);
      router.replace("/(auth)/signIn");
    } catch (error) {
      console.log("error", error);
    }
  };

  //   const handleImagePick = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       quality: 1,
  //     });

  //     if (!result.cancelled) {
  //       setImage(result.uri);
  //     }
  //   };

  const handleImageUpload = () => {
    // Handle image upload logic here
  };

  return (
    <View className="bg-white p-4 items-center  rounded-lg">
      {/* Cover + Profile */}
      <View style={styles.header} className="bg-primary" />
      <View style={styles.avatarWrapper}>
        <Image
          source={
            userDetails?.photo
              ? { uri: userDetails?.photo }
              : require("../../assets/images/user-placeholder.png")
          }
          style={styles.avatar}
        />
      </View>

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

      {/* Update Profile Picture */}
      <Text style={styles.title}>Update Profile Picture</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={() => {}}>
        <Text style={styles.pickText}>Upload a new profile picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.uploadText}>Upload Picture</Text>
      </TouchableOpacity>
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
  updateButton: {
    backgroundColor: "#a7f3d0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  updateText: {
    color: "#064e3b",
    fontWeight: "600",
  },
  imagePicker: {
    backgroundColor: "#e5e7eb",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  pickText: {
    color: "#1e293b",
  },
  uploadButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  uploadText: {
    color: "white",
    fontWeight: "600",
  },
});
