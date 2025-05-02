"use client";

import * as React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  error?: string;
}

const CustomInput = React.forwardRef<typeof TextInput, InputProps>(
  ({ style, label, error, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        mode={props.mode || "outlined"}
        label={label}
        error={!!error}
        style={[styles.input, style]}
        underlineColor="transparent"
        textColor="black"
        onChangeText={props.onChangeText}
        placeholderTextColor="black"
        activeOutlineColor="gray"
        value={props.value}
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
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    color: 'black',
  }
});



export default CustomInput;

