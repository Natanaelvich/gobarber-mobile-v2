import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, TextInput, ErrorText } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: Record<string, unknown>;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { icon, name, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    inputValueRef.current.value = defaultValue;
  }, [defaultValue]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(refField: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue(refField: any) {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {!!error && (
        // <MotiView
        //   from={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   transition={{
        //     type: 'timing',
        //     duration: 500,
        //     scale: {
        //       type: 'spring',
        //       delay: 100,
        //     },
        //   }}
        // >
        <ErrorText>{error}</ErrorText>
        // </MotiView>
      )}
      <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
        <Feather
          name={icon}
          size={24}
          color={isFocused || isFilled ? '#ff9000' : '#666360'}
        />
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          defaultValue={defaultValue}
          placeholderTextColor="#666360"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value: any) => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
    </>
  );
};

export default forwardRef(Input);
