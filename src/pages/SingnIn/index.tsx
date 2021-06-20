import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
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
  LogoContainer,
} from './styles';

import logo from '../../assets/Logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/modules/AuthContext';
import api from '../../services/api';

const SingnIn: React.FC = () => {
  const offset = useSharedValue(-30);

  const passwordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [errorLogin, setErrorLogin] = useState({
    error: false,
    message: '',
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  useEffect(() => {
    offset.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [offset]);

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
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
          return;
        }
        let messageError = '';

        if (error?.response?.status === 401) {
          messageError = 'E-mail ou senha incorretos';
        }
        if (error?.response?.status === 500) {
          messageError = 'Problemas no servidor ⚠';
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
          <LogoContainer style={animatedStyles}>
            <Logo source={logo} />
          </LogoContainer>

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
