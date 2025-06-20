import { Theme } from '@/constants/theme';
import { ThemeContext } from '@/store/themeContext';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface RadioInputsProps {
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const RadioInputs = ({
  label,
  options,
  value,
  onValueChange,
  className = ''
}: RadioInputsProps) => {
    const { theme } = useContext(ThemeContext);
    const color = Theme[theme];
  return (
    <View className={`mb-4 ${className}`}>
      <Text style={{color:color.text}} className=" mb-2 font-bold">{label}</Text>
      <RadioButton.Group
        onValueChange={onValueChange}
        value={value}
        
      >
        <View className="flex-row items-center gap-4">
          {options.map((option) => (
            <RadioButton.Item
              key={option}
              label={option}
              value={option}
              color="#4299e1"
              labelStyle={{color:color.text, fontSize: 16}}
            />
          ))}
        </View>
      </RadioButton.Group>
    </View>
  );
};
