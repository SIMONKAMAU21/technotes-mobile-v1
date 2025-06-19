import { Theme } from '@/constants/theme';
import { ThemeContext } from '@/store/themeContext';
import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchInputProps {
  value: string;
    placeholder?: string;
    onChange: (text: string) => void;
    className?: string;
    width?: string | number;
}

const SearchInput : React.FC<SearchInputProps> = ({value,placeholder,onChange,width, className}) => {
  const { theme } = React.useContext(ThemeContext);
  const color = Theme[theme]
  return (
    <Searchbar
      placeholder={placeholder || 'Search...'}
      onChangeText={onChange}
      value={value}
      className={`rounded-lg ${className || ''}`}
        inputStyle={{ color:color.text }}
        placeholderTextColor={'#888'}
      style={{ 
        margin: 10, 
        backgroundColor: color.bg, 
        width: typeof width === 'number' || typeof width === 'undefined' || (typeof width === 'string' && (width === 'auto' || /^\d+%$/.test(width))) ? width : undefined, 
        height: 50 
      }}
    />
  );
};

export default SearchInput;
