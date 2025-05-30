"use client";

import * as React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
}

const CustomInput = React.forwardRef<typeof TextInput, InputProps>(
  ({ style, label, error,multiline, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        mode={props.mode || "outlined"}
        label={label}
        error={!!error}
        style={[styles.input, style]}
        underlineColor="transparent"
        textColor="black"
        scrollEnabled={false}
        numberOfLines={3}
        onChangeText={props.onChangeText}
        placeholderTextColor="black"
        // activeOutlineColor="#E9EEF6"
        activeOutlineColor="#e2e8f0"
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
    width: '100%',
    marginVertical: 8,
    // padding: 10,
    fontSize: 16,
    backgroundColor: '#e2e8f0',
    // backgroundColor:"#E1E1E3",
    borderRadius: 20,
    color: 'black',
  }
});



export default CustomInput;

