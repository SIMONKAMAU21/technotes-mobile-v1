import React from 'react';
import { Image } from 'react-native';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo1 = ({ size = 48, className }: LogoProps) => {
  return (
    <Image
      source={require("../../assets/images/school2.png")} 
      className={className || `w-${size} h-${size}`}
    />
  );
};

export const Logo = ({ size = 48, className }: LogoProps) => {
  return (
    <Image
      source={require("../../assets/images/school1.png")} 
      className={className || `w-${size} h-${size}`}
    />
  );
};