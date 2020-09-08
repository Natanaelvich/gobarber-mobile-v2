import React from 'react';

import { Feather } from 'expo-vector-icons';

import {
  Container,
  Logo,
  Title,
  ForgotPassword,
  CreateAccountContainer,
  CreateAccountText,
  Form,
} from './styles';

import logo from '../../assets/Logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SingnIn: React.FC = () => {
  return (
    <Container>
      <Form>
        <Logo source={logo} />
        <Title>Faça seu logon</Title>
        <Input placeholder="E-mail" name="email" icon="mail" />
        <Input placeholder="Senha" name="password" icon="lock" />

        <Button title="Entrar" />

        <ForgotPassword>Esqueci minha senha</ForgotPassword>
      </Form>
      <CreateAccountContainer>
        <Feather name="log-in" size={24} color="#FF9000" />
        <CreateAccountText>Criar uma conta</CreateAccountText>
      </CreateAccountContainer>
    </Container>
  );
};

export default SingnIn;
