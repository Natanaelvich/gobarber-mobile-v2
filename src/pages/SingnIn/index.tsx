import React, { useCallback, useRef } from 'react';

import { Feather } from 'expo-vector-icons';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import getValidationErros from '../../utils/getValidationErros';
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
import { useAuth } from '../../hooks/modules/AuthContext';

const SingnIn: React.FC = () => {
  const passwordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const hanleSignIn = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido.'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;

        await signIn({ email, password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn],
  );
  return (
    <>
      <Container>
        <FormContainer>
          <Logo source={logo} />
          <Title>Faça seu logon</Title>

          <Form ref={formRef} onSubmit={hanleSignIn}>
            <Input
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
              icon="lock"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

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
