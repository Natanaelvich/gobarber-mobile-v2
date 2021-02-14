import React, { useCallback, useRef, useState } from 'react';

import { View as MotiView } from 'moti';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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
  ErrorLogin,
  ErrorLoginText,
} from './styles';

import logo from '../../assets/Logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/modules/AuthContext';

const SingnIn: React.FC = () => {
  const passwordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [errorLogin, setErrorLogin] = useState({
    error: false,
    message: '',
  });

  const { signIn } = useAuth();

  const hanleSignIn = useCallback(
    async (data: { email: string; password: string }) => {
      setErrorLogin({
        error: false,
        message: '',
      });

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

        const response = await api.post('sessions', {
          email,
          password,
        });

        await signIn(response.data);
      } catch (error) {
        console.log(error);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }

        let messageError = '';

        if (error.status === 401) {
          messageError = 'Sua sessão expirou';
        }
        if (error.status === 500) {
          messageError = 'Erro ao buscar macros, problemas no servidor ⚠';
        }
        if (error.message === 'Network Error') {
          messageError =
            'Falha de conexão, verifique sua internet e tente novamente';
        }

        setErrorLogin({
          error: true,
          message: messageError,
        });
      }
    },
    [signIn],
  );
  return (
    <>
      <Container>
        <FormContainer>
          <MotiView
            from={{ top: -44 }}
            animate={{ top: 1 }}
            transition={{
              type: 'timing',
              duration: 1000,
              scale: {
                type: 'spring',
                delay: 100,
              },
            }}
            style={{ alignItems: 'center' }}
          >
            <Logo source={logo} />
          </MotiView>
          <Title>Faça seu logon</Title>

          {errorLogin.error && (
            <ErrorLogin>
              <MaterialCommunityIcons
                name="alert-circle"
                size={32}
                color="#E04848"
              />
              <ErrorLoginText>
                {errorLogin.message ||
                  'Falha no login, verifique suas credenciais e tente novamente!'}
              </ErrorLoginText>
            </ErrorLogin>
          )}

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
