import React, { useRef, useCallback } from 'react';

import { Feather } from 'expo-vector-icons';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput } from 'react-native';
import {
  Container,
  Logo,
  Title,
  ReturnLoginContainer,
  ReturnLoginText,
  FormContainer,
} from './styles';

import logo from '../../assets/Logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SingnUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    (data: { name: string; email: string; password: string }) => {
      console.log(data);
    },
    [],
  );
  return (
    <Container>
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <Logo source={logo} />
          <Title>Faça seu cadastro</Title>
          <Input
            autoCapitalize="words"
            placeholder="Nome"
            name="name"
            icon="user"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          <Input
            ref={emailRef}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="E-mail"
            name="email"
            icon="mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <Input
            ref={passwordRef}
            secureTextEntry
            placeholder="Senha"
            name="password"
            textContentType="newPassword"
            icon="lock"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />

          <Button
            title="Cadastrar"
            onPress={() => {
              formRef.current?.submitForm();
            }}
          />
        </Form>
      </FormContainer>

      <ReturnLoginContainer onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <ReturnLoginText>Voltar para login</ReturnLoginText>
      </ReturnLoginContainer>
    </Container>
  );
};

export default SingnUp;
