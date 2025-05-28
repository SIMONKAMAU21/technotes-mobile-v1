// components/Stack.tsx
import { ViewProps } from 'react-native';
import { View } from 'react-native';
import React from "react";

type StackProps = ViewProps & {
  className?: string;
  children: React.ReactNode;
};

// Vertical Stack
export const VStack = ({ className = '', children, ...props }: StackProps) => (
  <View className={`flex flex-col ${className}`} {...props}>
    {children}
  </View>
);

// Horizontal Stack
export const HStack = ({ className = '', children, ...props }: StackProps) => (
  <View className={`flex flex-row ${className}`} {...props}>
    {children}
  </View>
);
