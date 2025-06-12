import { Theme } from '@/constants/theme';
import { ThemeContext } from '@/store/themeContext';
import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchInputProps {
  value: string;
    placeholder?: string;
    onChange: (text: string) => void;
    className?: string;
}

const SearchInput : React.FC<SearchInputProps> = ({value,placeholder,onChange, className}) => {
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
      style={{ margin: 10, backgroundColor:color.bg,width: '90%' ,height: 50 }}
    />
  );
};

export default SearchInput;
