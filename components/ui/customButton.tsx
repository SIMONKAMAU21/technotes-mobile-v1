import React from 'react';
import { Button, Icon } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';

interface CustomButtonProps {
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained';
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const CustomButton = ({
  onPress,
  mode = 'contained',
  style,
  children,
  disabled = false,
  className = '',
  loading = false,
}: CustomButtonProps) => {
  return (
    <Button
    className={`${className}`}
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      style={[style, {backgroundColor: '#EF8F02'}]}
    >
      {children}
    </Button>
  );
};
