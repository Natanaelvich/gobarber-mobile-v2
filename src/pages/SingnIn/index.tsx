import React, { useCallback, useRef } from 'react';

import { Feather } from 'expo-vector-icons';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Logo,
  Title,
  ForgotPassword,
  CreateAccountContainer,
  CreateAccountText,
  ForgotPasswordButton,
  FormContainer,
} from './styles';

import logo from '../../assets/Logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SingnIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);
  return (
    <>
      <Container>
        <FormContainer>
          <Logo source={logo} />
          <Title>Faça seu logon</Title>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input placeholder="E-mail" name="email" icon="mail" />
            <Input placeholder="Senha" name="password" icon="lock" />

            <Button
              title="Entrar"
              onPress={() => {
                formRef.current?.submitForm();
              }}
            />
          </Form>

          <ForgotPasswordButton>
            <ForgotPassword>Esqueci minha senha</ForgotPassword>
          </ForgotPasswordButton>
        </FormContainer>
        <CreateAccountContainer onPress={() => navigation.navigate('SingnUp')}>
          <Feather name="log-in" size={24} color="#FF9000" />
          <CreateAccountText>Criar uma conta</CreateAccountText>
        </CreateAccountContainer>
      </Container>
    </>
  );
};

export default SingnIn;
