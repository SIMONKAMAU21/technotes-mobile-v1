import * as React from "react";
// import { TextInput } from "react-native-paper";
import { StyleSheet, TextInput } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
}

const CustomInput = React.forwardRef<typeof TextInput, InputProps>(
  ({ style, label, error, multiline, ...props }, ref) => {
    return (
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
    );
  }
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    // height: "50%",
    textAlign: "auto",
    // borderWidth: 1,
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    borderColor: "#e2e8f0",
    padding: 10,
    // color: "black",
  },
});

export default CustomInput;
