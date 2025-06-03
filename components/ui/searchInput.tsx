import * as React from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchInputProps {
  value: string;
    placeholder?: string;
    onChange: (text: string) => void;
    className?: string;
}

const SearchInput : React.FC<SearchInputProps> = ({value,placeholder,onChange, className}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder={placeholder || 'Search...'}
      onChangeText={onChange}
      value={value}
      className={`rounded-lg ${className || ''}`}
        inputStyle={{ color: '#000' }}
        placeholderTextColor={'#888'}
      style={{ margin: 10, backgroundColor: '#fff',width: '90%' ,height: 50 }}
    />
  );
};

export default SearchInput;
