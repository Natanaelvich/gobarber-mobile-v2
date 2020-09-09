import React from 'react';

import { Feather } from 'expo-vector-icons';

import { useNavigation } from '@react-navigation/native';
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
  return (
    <Container>
      <FormContainer>
        <Logo source={logo} />
        <Title>Faça seu cadastro</Title>
        <Input placeholder="Nome" name="name" icon="user" />
        <Input placeholder="E-mail" name="email" icon="mail" />
        <Input placeholder="Senha" name="password" icon="lock" />

        <Button title="Cadastrar" />
      </FormContainer>

      <ReturnLoginContainer onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <ReturnLoginText>Voltar para login</ReturnLoginText>
      </ReturnLoginContainer>
    </Container>
  );
};

export default SingnUp;
