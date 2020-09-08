import React from 'react';

import { TextInputProps } from 'react-native';
import { Feather } from 'expo-vector-icons';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ icon, ...rest }) => {
  return (
    <Container>
      <Feather name={icon} color="#666360" size={24} />
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default Input;
