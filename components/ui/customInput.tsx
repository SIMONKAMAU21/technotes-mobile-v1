import { Theme } from "@/constants/theme";
import { ThemeContext } from "@/store/themeContext";
import * as React from "react";
// import { TextInput } from "react-native-paper";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
}

const CustomInput = React.forwardRef<typeof TextInput, InputProps>(
  ({ style, label, error, multiline, ...props }, ref) => {
 const { theme } = React.useContext(ThemeContext);
  const color = Theme[theme];
    return (
      <View className=" h-auto flex-1" style={{ width: "100%" }}>
        {label && <Text style={{color:color.text,marginBottom:5,fontWeight:600}}>{label}</Text>}
      <TextInput
        ref={ref}
        // mode={props.mode || "outlined"}
        label={label}
        error={!!error}
        style={[styles.input, style]}
        underlineColor="transparent"
        textColor="black"
        scrollEnabled={false}
        numberOfLines={3}
        onChangeText={props.onChangeText}
        placeholderTextColor="gray"
        // activeOutlineColor="#e2e8f0"
        cursorColor="black"
        value={props.value}
        multiline={multiline || true}
        {...props}
        helperText={error}
      />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    // height: "70%",
    textAlign: "auto",
    // borderWidth: 1,
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    borderColor: "#e2e8f0",
    padding: 10,
    // color: "black",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;
