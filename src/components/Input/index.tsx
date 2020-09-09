import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';
import { Feather } from 'expo-vector-icons';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ icon, name, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const inputRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Feather name={icon} color="#666360" size={24} />
      <TextInput
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        onChangeText={text => {
          inputRef.current.value = text;
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
