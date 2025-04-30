import React from 'react';
import { Button } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained';
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const CustomButton = ({
  onPress,
  mode = 'contained',
  style,
  children,
}: CustomButtonProps) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={style}
    >
      {children}
    </Button>
  );
};
